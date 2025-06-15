import AnimatedWaveBackground from "@/components/ui/animated-wave-background";
import DashboardNav from "@/components/Dashboard/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <AnimatedWaveBackground />
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-10">
        <span className="text-white font-bold text-lg">AI Content Team</span>
        <DashboardNav />
      </header>
      <main className="flex-grow flex items-center justify-center w-full pt-24">
        {children}
      </main>
    </div>
  );
}
