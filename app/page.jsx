'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MotivatedMinds() {
  const router = useRouter();
  const [logoDrawn, setLogoDrawn] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax values
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const subheadY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setTimeout(() => setLogoDrawn(true), 200);
  }, []);

  return (
    <div className="bg-white text-black ">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Spectral:wght@200;300;400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Spectral', serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        ::selection {
          background: black;
          color: white;
        }

        .snap-y {
          scroll-snap-type: y proximity;
        }

        .snap-section {
          scroll-snap-align: start;
        }

        @keyframes drawLogo {
          from { stroke-dashoffset: 560; }
          to { stroke-dashoffset: 0; }
        }

        .logo-path {
          stroke-dasharray: 560;
          stroke-dashoffset: 560;
        }

        .logo-path.drawn {
          animation: drawLogo 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10"
      >
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-8 flex justify-between items-center">
          <div className="flex flex-col items-start gap-2">
            <svg width="72" height="56" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                className={`logo-path ${logoDrawn ? 'drawn' : ''}`}
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
          </div>
          <button 
            onClick={() => router.push('/apply')}
            className="text-xs tracking-[0.25em] uppercase px-8 py-4 border border-black hover-lift hover:bg-black hover:text-white transition-colors duration-300"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Apply
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-8 lg:px-16 pt-40 pb-32 snap-section">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h1 
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="text-7xl md:text-8xl lg:text-[140px] xl:text-[160px] leading-[0.9] tracking-[-0.02em] mb-16"
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              You are the
              <br />
              company you keep.
            </span>
          </motion.h1>
          
          <motion.div 
            style={{ y: subheadY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="max-w-[700px] space-y-12"
          >
            <p 
              className="text-2xl md:text-3xl leading-[1.6]"
              style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.85 }}
            >
              <span style={{ fontWeight: 500 }}>Motivated Minds</span> is a private community for people committed to excelling in their careers, investing in their health, cultivating meaningful relationships, and building what comes next. Surround yourself with people as ambitious as you are.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/apply')}
              className="bg-black text-white px-12 py-5 text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
            >
              Apply for Membership
            </motion.button>

            <p className="text-sm opacity-50" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
              Membership is curated and reviewed individually.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Motivated Minds */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-40 px-8 lg:px-16 snap-section">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-20 lg:gap-32">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-4"
            >
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                What is
                <br />
                Motivated
                <br />
                Minds
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-8 space-y-10"
            >
              <p 
                className="text-2xl md:text-3xl leading-[1.6]"
                style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.9 }}
              >
                Meeting people who match your ambition, values, and pace is harder than it should be.
              </p>
              <p 
                className="text-xl md:text-2xl leading-[1.7]"
                style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.75 }}
              >
                We curate exceptional experiences that bring together high-agency individuals who want to build meaningful relationships, learn from one another, and turn ideas into action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Philosophy */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-40 px-8 lg:px-16 bg-black text-white snap-section">
        <div className="max-w-[900px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-6xl mb-20 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Philosophy
          </motion.h2>
          
          <div className="space-y-16 text-xl md:text-2xl leading-[1.8]" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
            {[
              "You are someone who moves and builds. You've accomplished things others dream about, yet you remain hungry—not for validation, but for growth.",
              "Standing out does not always mean feeling connected. This is a room of people who understand your pace, your pressure, your pursuit.",
              "One rule: leave ego outside. Come open, generous, and ready to build real relationships."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-40 px-8 lg:px-16 snap-section">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl mb-24 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Our Pillars
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-24">
            {[
              { title: 'Health', description: 'Build the energy and resilience required for an ambitious life.' },
              { title: 'Financial Growth', description: 'Create real wealth through disciplined decisions and shared insight.' },
              { title: 'Ideas', description: 'Expand how you think. Learn from people who challenge your perspective.' },
              { title: 'Fitness', description: 'Train with intention alongside others who push your edge.' },
              { title: 'Give Back', description: 'Contribute to communities and causes that create lasting impact.' }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 
                  className="text-2xl md:text-3xl mb-6 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {pillar.title}
                </h3>
                <p 
                  className="text-lg leading-[1.7]"
                  style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.7 }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programming */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-40 px-8 lg:px-16 bg-black text-white snap-section">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl mb-24 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Programming
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-20">
            {[
              {
                title: 'Signature Experiences',
                description: 'Intimate dinners, weekend escapes, and offsite retreats that create space for deeper conversation and real momentum.'
              },
              {
                title: 'City Socials',
                description: 'We begin in New York. As the community grows, new chapters will launch around the world.'
              },
              {
                title: 'Fitness Sessions',
                description: 'Train together. Build strength in body and mind alongside peers who take it seriously.'
              }
            ].map((program, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className="border-t border-white/20 pt-8"
              >
                <h3 
                  className="text-2xl md:text-3xl mb-5 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                >
                  {program.title}
                </h3>
                <p 
                  className="text-lg md:text-xl leading-[1.7]"
                  style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.75 }}
                >
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NYC + Global */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-48 px-8 lg:px-16 snap-section">
        <div className="max-w-[1000px] mx-auto text-center w-full">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Born in New York.
            <br />
            Connected everywhere.
          </motion.h2>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-screen flex items-center border-t border-black/10 py-40 px-8 lg:px-16 bg-black text-white snap-section">
        <div className="max-w-[800px] mx-auto text-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl mb-12 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Ready to apply?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl mb-16 leading-[1.6]"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
          >
            Membership is curated. Applications are reviewed individually.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/apply')}
            className="bg-white text-black px-12 py-5 text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Apply
          </motion.button>
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
