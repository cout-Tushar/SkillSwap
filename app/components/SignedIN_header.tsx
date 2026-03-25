"use client"
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { LogOut, Mail, Lock, Github, ArrowRight } from "lucide-react"
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

const SignedIN_header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-red-900/30"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          Skill<span className="gradient-text">Swap</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#explore" className="hover:text-white transition duration-300">
            Explore
          </a>
          <a href="#how" className="hover:text-white transition duration-300">
            How It Works
          </a>
          <Link href="/dashboard" className="hover:text-white transition duration-300">
            Dashboard
          </Link>
          <button className="btn-primary px-6 py-2 rounded-xl text-white font-semibold shadow-lg shadow-red-900/30" onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-red-900/30">
          <nav className="flex flex-col gap-4 px-6 py-6 text-gray-300">
            <a href="#explore" className="hover:text-white transition">
              Explore
            </a>
            <a href="#how" className="hover:text-white transition">
              How It Works
            </a>
            <Link href="#" className="hover:text-white transition">
              Signin
            </Link>
            <button
              className="btn-primary px-6 py-2 rounded-xl text-white font-semibold shadow-lg shadow-red-900/30"
              onClick={() => signOut({callbackUrl: "/"})}>
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default SignedIN_header
