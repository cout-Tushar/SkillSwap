"use client";

export default function AnimatedRedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-700/20 blur-3xl rounded-full animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-700/15 blur-3xl rounded-full animate-float delay-2" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-red-600/10 blur-3xl rounded-full" />
    </div>
  );
}


