import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Landmark, Users, ShieldCheck, PiggyBank } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center bg-grid-slate-100">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <main className="container mx-auto px-4 py-16 animate-fade-in-up">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-primary animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Centralized Dividend Distribution Hub
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          Your comprehensive platform for tracking, monitoring, and managing capital market funds with efficiency and transparency.
        </p>
        <h1 className="font-headline font-bold tracking-tighter mb-4 text-green-600 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
         Powered By Capital Market Stabilization Fund 
        </h1>
        <div className="flex justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Button asChild size="lg" className="font-headline shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/issuers">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-headline bg-card/80 backdrop-blur-sm">
            <Link href="/issuers">Learn More</Link>
          </Button>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <FeatureCard
            title="For Issuers"
            description="Manage investor data, track total holdings, and handle tax obligations seamlessly."
            icon={<Landmark className="h-8 w-8 text-primary" />}
          />
          <FeatureCard
            title="For Investors"
            description="View your portfolio summary and detailed investment information in one place."
            icon={<Users className="h-8 w-8 text-primary" />}
          />
          <FeatureCard
            title="For Regulators"
            description="Access comprehensive metrics and details for oversight and compliance."
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
          />
          <FeatureCard
            title="CMSF"
            description="Monitor fund performance and specifics with our detailed reporting tools."
            icon={<PiggyBank className="h-8 w-8 text-primary" />}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <Card className="text-left bg-card/80 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
