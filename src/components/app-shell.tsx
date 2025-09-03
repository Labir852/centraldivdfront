'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Home, Landmark, Users, ShieldCheck, PiggyBank, LogOut, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { logout } from '@/lib/auth';
import { useAuth } from './auth-provider';
import { json } from 'stream/consumers';

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  roles: string[];
};

const allNavItems: NavItem[] = [
  { href: '/', icon: Home, label: 'Welcome', roles: ['issuer', 'investor', 'regulator', 'cmsf', 'admin'] },
  { href: '/issuers', icon: Landmark, label: 'Issuers', roles: ['issuer', 'admin'] },
  { href: '/investors', icon: Users, label: 'Investors', roles: ['investor', 'admin'] },
  { href: '/regulators', icon: ShieldCheck, label: 'Regulators', roles: ['regulator', 'admin'] },
  { href: '/cmsf', icon: PiggyBank, label: 'CMSF', roles: ['cmsf', 'admin'] },
];

export function AppShell({ children }: { children: React.ReactNode;}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const userName = user?.username || 'Guest';
  const userRole = user?.role || '';
  const navItems = React.useMemo(() => {
    if(!userRole) return [];
    return allNavItems.filter(item => item.roles.includes(userRole) || item.href === '/');
  }, [userRole]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  }

  if (loading) return null;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <PiggyBank className="h-6 w-6 text-accent-foreground" />
              </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <h2 className="font-headline font-semibold text-lg text-sidebar-foreground">Dividend Hub</h2>
                <p className="text-xs text-sidebar-foreground/70">Capital Market</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt="Admin User" data-ai-hint="profile person" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold text-sidebar-foreground">{userName}</span>
              <span className="text-xs text-sidebar-foreground/70">{userRole}</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
                <SidebarTrigger>
                <Menu />
                </SidebarTrigger>
                <div className="w-full flex-1">
                    {/* Can add breadcrumbs or page title here later */}
                </div>
                <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Admin User" data-ai-hint="profile person" />
                <AvatarFallback>AU</AvatarFallback>
                </Avatar>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
            <footer className="p-4 text-center text-sm text-muted-foreground border-t">
                Developed with ❤️ by ICT Department , Capital Market Stabilization Fund
            </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
