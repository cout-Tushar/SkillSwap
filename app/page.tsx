"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Menu, X, ArrowRight, Zap, Users, Target, Star } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import SignedIN_header from "./components/SignedIN_header";
export default function Home() {
    const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black text-white overflow-hidden">
      
      {/* NAVBAR */}
      <header>
       {session? <SignedIN_header /> : <Header/>}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-700/20 blur-3xl rounded-full animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-700/15 blur-3xl rounded-full animate-float delay-2" />
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-red-600/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-4xl">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-red-900/30 border border-red-700/50 text-red-400 text-sm font-semibold mb-6">
              ✨ The Future of Learning
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mt-4 animate-fade-in-up delay-1">
            Trade Skills.
            <br />
            <span className="gradient-text block">Build Your Future.</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-2">
            Connect with passionate students worldwide. Exchange knowledge in real-time. 
            Learn faster, grow stronger—without spending a dime.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap animate-fade-in-up delay-3">
            <Link
              href="/signup"
              className="btn-primary px-8 py-4 rounded-2xl text-white font-semibold shadow-xl shadow-red-900/30 flex items-center gap-2 hover:gap-3 transition-all"
            >
              Start Swapping
              <ArrowRight size={20} />
            </Link>
            <a
              href="#how"
              className="px-8 py-4 rounded-2xl border border-red-900/40 text-gray-300 hover:bg-red-900/20 transition duration-300 font-semibold"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-4">
            {[
              { value: "2.5K+", label: "Active Users" },
              { value: "10K+", label: "Skills Listed" },
              { value: "5K+", label: "Swaps Made" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="gradient-text text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-32 px-6 relative">
        <div className="absolute left-20 top-10 w-80 h-80 bg-red-700/20 blur-3xl rounded-full" />
        <div className="absolute right-20 bottom-10 w-80 h-80 bg-red-700/15 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
              Get started in 3 simple steps and join our thriving learning community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Create Profile",
                desc: "List the skills you offer and the ones you want to learn. Showcase your expertise.",
              },
              {
                icon: Users,
                title: "Match & Connect",
                desc: "Our smart algorithm pairs you with compatible students. Build meaningful connections.",
              },
              {
                icon: Zap,
                title: "Start Swapping",
                desc: "Schedule sessions, collaborate, and grow together. Learn in real-time.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="feature-card glass-effect p-8 rounded-3xl group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 flex items-center text-red-400 group-hover:text-red-300 transition">
                    <span className="text-sm font-semibold">Learn more</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 px-6 relative">
        <div className="absolute right-20 top-20 w-80 h-80 bg-red-700/20 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold">
              Why Choose <span className="gradient-text">SkillSwap?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🤝", title: "Smart Matching", desc: "AI-powered pairing with compatible partners" },
              { icon: "💬", title: "Secure Chat", desc: "Built-in messaging and video calls" },
              { icon: "⭐", title: "Verified Skills", desc: "Community-verified expertise badges" },
              { icon: "🏆", title: "Ratings & Reviews", desc: "Build your reputation in the community" },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-effect p-6 rounded-2xl text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 relative">
        <div className="absolute left-20 bottom-10 w-80 h-80 bg-red-700/20 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold">
              What <span className="gradient-text">Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Computer Science, MIT",
                text: "I traded Python for design skills and built my entire portfolio in 2 months. SkillSwap is a game-changer!",
                avatar: "SC",
              },
              {
                name: "Marcus Rodriguez",
                role: "Design, Stanford",
                text: "Got paired with talented developers who helped me build real projects. My skills went from zero to hero.",
                avatar: "MR",
              },
              {
                name: "Priya Sharma",
                role: "Business, UC Berkeley",
                text: "Learned video editing and started creating content for local businesses while still in college. Best investment ever!",
                avatar: "PS",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card glass-effect p-8 rounded-3xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-red-900/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-700/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-700/30 blur-3xl rounded-full animate-float" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Ready to Exchange
            <br />
            <span className="gradient-text">Your Skills?</span>
          </h2>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who are learning, growing, and achieving their goals through skill exchange.
          </p>
          <Link
            href="/signup"
            className="btn-primary mt-10 px-10 py-4 rounded-2xl text-white font-semibold shadow-2xl shadow-red-900/40 inline-flex items-center gap-3 text-lg"
          >
            Join SkillSwap Now
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
     
    </main>
  );
}