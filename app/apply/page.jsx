'use client';

import React from 'react';
import ApplicationForm from '@/components/ApplicationForm';

export default function ApplyPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Spectral:wght@200;300;400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Spectral', serif;
          -webkit-font-smoothing: antialiased;
        }
        
        ::selection {
          background: black;
          color: white;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-8 flex justify-between items-center">
          <a href="/" className="flex flex-col items-start gap-2">
            <svg width="48" height="48" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M15 125 L15 15 L50 85 L85 15 L85 125 M85 15 L120 85 L155 15 L155 125"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
              />
            </svg>
            <div className="text-[8px] tracking-[0.2em] uppercase opacity-60 ml-[2px]" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
              Motivated Minds.
            </div>
          </a>
          <a 
            href="/"
            className="text-xs tracking-[0.25em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Back
          </a>
        </div>
      </nav>

      {/* Application Form */}
      <section className="min-h-screen px-8 lg:px-16 pt-40 pb-32">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-20">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              Apply for Membership
            </h1>
            <p 
              className="text-xl md:text-2xl leading-relaxed max-w-[600px] mx-auto"
              style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.7 }}
            >
              Tell us about yourself. We review every application individually.
            </p>
          </div>

          <ApplicationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-16 px-8 lg:px-16">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-xs opacity-30" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
            © 2025 Motivated Minds
          </p>
        </div>
      </footer>
    </div>
  );
}
