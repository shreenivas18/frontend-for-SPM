"use client"

import { Star, Users, TrendingUp, Zap } from "lucide-react"

export const SocialProof = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "10K+",
      label: "Content Creators",
      color: "text-cyan-400",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "2M+",
      label: "Posts Generated",
      color: "text-purple-400",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: "4.9/5",
      label: "User Rating",
      color: "text-green-400",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: "95%",
      label: "Time Saved",
      color: "text-orange-400",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow",
      content:
        "This AI team transformed our content strategy. We're now publishing 10x more content with better engagement.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Marcus Johnson",
      role: "Founder",
      company: "StartupHub",
      content: "From zero to 100K followers in 6 months. The AI agents understand our voice perfectly.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      company: "CreativeCo",
      content: "I went from spending 20 hours a week on content to just 2 hours. Game changer!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`${stat.color} mb-2 flex justify-center`}>{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Top Creators
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of creators who've transformed their content strategy with AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
