'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from './auth-provider';

export function UnauthorizedPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleReturnToDashboard = () => {
    if (user) {
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
    } else {
      router.replace('/login');
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 text-destructive p-3 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <CardTitle className="mt-4 text-2xl">Not Authorized</CardTitle>
          <CardDescription>
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleReturnToDashboard}>
            Return to Your Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
