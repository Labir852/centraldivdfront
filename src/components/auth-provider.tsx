'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession as getSessionFromStorage } from '@/lib/auth';
import { AppShell } from './app-shell';
import { UnauthorizedPage } from './unauthorized-page';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

const protectedRoutes = ['/issuers', '/investors', '/regulators', '/cmsf'];
const publicRoutes = ['/login', '/'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkedPath, setCheckedPath] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = getSessionFromStorage();
    setUser(session);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    // We only want to re-evaluate authorization when the path changes.
    if (pathname === checkedPath) return;

    let authorized = true;
    const pathIsPublic = publicRoutes.includes(pathname);
    const pathIsProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (!user) {
      if (!pathIsPublic) {
        router.replace('/login');
        return; // Early return to prevent further processing
      }
    } else { // User is authenticated
      if (pathname === '/login') {
        let destination = '/';
        switch (user.role) {
          case 'issuer':
            destination = '/issuers';
            break;
          case 'investor':
            destination = '/investors';
            break;
          case 'regulator':
            destination = '/regulators';
            break;
          case 'cmsf':
            destination = '/cmsf';
            break;
          case 'admin':
            destination = '/';
            break;
        }
        router.replace(destination);
        return;
      }
      
      if (pathIsProtectedRoute) {
        const userRole = user.role.toLowerCase();
        let allowedPath = `/${userRole}s`;
        if (userRole === 'cmsf') {
          allowedPath = '/cmsf';
        }
        if (!(pathname.startsWith(allowedPath) || user.role === 'admin')) {
          authorized = false;
        }
      }
    }
    
    setIsAuthorized(authorized);
    setCheckedPath(pathname);

  }, [user, loading, pathname, router, checkedPath]);

  if (loading || (pathname !== checkedPath && !loading)) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  const isPublic = publicRoutes.includes(pathname);
  const showShell = !isPublic || (pathname === '/' && !!user);

  let content = children;
  if(showShell && !isAuthorized) {
    content = <UnauthorizedPage />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
        {showShell ? <AppShell>{content}</AppShell> : children}
    </AuthContext.Provider>
  );
}
