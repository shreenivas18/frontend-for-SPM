"use client"

import { Brain, Pen, Video, Share2, Clock, Target } from "lucide-react"

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Blog Writer",
      description: "Generate comprehensive, SEO-optimized blog posts that establish your thought leadership",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "LinkedIn Post Creator",
      description: "Craft engaging LinkedIn posts that drive engagement and build your professional network",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Script Generator",
      description: "Create compelling scripts for Instagram Reels and YouTube Shorts that go viral",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Content DNA Profiling",
      description: "AI learns your unique voice, style, and audience to create perfectly aligned content",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "10x Faster Creation",
      description: "Reduce content creation time from hours to minutes while maintaining quality",
      color: "from-teal-400 to-cyan-500",
    },
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Multi-Platform Publishing",
      description: "Seamlessly publish across all platforms with optimized formatting for each channel",
      color: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Content Team
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Four specialized AI agents working in perfect harmony to transform your ideas into high-performing content
            across every platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon with gradient background */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
              >
                {benefit.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                {benefit.title}
              </h3>

              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {benefit.description}
              </p>

              {/* Animated border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(45deg, transparent, transparent, rgba(255,255,255,0.1), transparent, transparent)`,
                  backgroundSize: "200% 200%",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
            Start Creating Content →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>
    </section>
  )
}
