import Link from "next/link";
import GeneratorCard from "@/components/Dashboard/generator-card";


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
    <div className="flex items-center justify-center w-full gap-12">
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
    </div>
  );
}
