import Link from "next/link";
import AnimatedWaveBackground from "@/components/ui/animated-wave-background";
import GeneratorCard from "@/components/ui/generator-card";


export default function DashboardPage() {
  const generators = [
    {
      tag: "Content",
      title: "Blog Generator",
      description: "Generate full-length blog content tailored to your Content DNA.",
      href: "/dashboard/generate/blog",
      imageUrl: "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      hoverTheme: 'blog' as const,
    },
    {
      tag: "Social",
      title: "LinkedIn Post Generator",
      description: "Create short, scroll-stopping posts for LinkedIn.",
      href: "/dashboard/generate/linkedin",
      imageUrl: "https://images.unsplash.com/photo-1611944212129-29955ae40351?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      hoverTheme: 'linkedin' as const,
    },
    {
      tag: "Media",
      title: "Video Generator",
      description: "Create scripts for Instagram Reels and YouTube Shorts.",
      href: "/dashboard/generate/video",
      imageUrl: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      hoverTheme: 'video' as const,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <AnimatedWaveBackground />
      <header className="w-full max-w-5xl flex justify-end p-4 absolute top-0 right-0">
        <Link href="dashboard/settings" className="text-indigo-400 hover:text-indigo-300 transition text-sm font-medium glass px-4 py-2 rounded-lg border border-indigo-400/30">
            Profile & Settings
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center w-full gap-8">
        {generators.map((generator, index) => (
          <Link href={generator.href} key={index}>
              <GeneratorCard
                tag={generator.tag}
                title={generator.title}
                description={generator.description}
                imageUrl={generator.imageUrl}
                hoverTheme={generator.hoverTheme}
              />
          </Link>
        ))}
      </main>
    </div>
  );
}
