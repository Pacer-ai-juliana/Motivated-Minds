'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MotivatedMinds() {
  const router = useRouter();
  const [logoDrawn, setLogoDrawn] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState(null);
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const subheadY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setTimeout(() => setLogoDrawn(true), 200);
  }, []);

  const pillars = [
    { 
      title: 'Health', 
      description: 'Build the energy, resilience, and longevity required for an ambitious life. When your body and mind are strong, everything else moves further and faster.' 
    },
    { 
      title: 'Financial Growth', 
      description: 'Create real wealth through disciplined decisions, smarter strategy, and shared insight from people who are building alongside you.' 
    },
    { 
      title: 'Ideas', 
      description: 'Expand how you think. Test perspectives. Learn from builders, operators, and creators who challenge and elevate your view of what is possible.' 
    },
    { 
      title: 'Fitness', 
      description: 'Train with intention and with others who push your edge. Shared effort builds trust, confidence, and momentum that carries into the rest of life.' 
    },
    { 
      title: 'Give Back', 
      description: 'Success means more when it improves lives beyond your own. Contribute to communities and causes that create lasting impact.' 
    }
  ];

  return (
    <div className="bg-white text-black">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Spectral:wght@200;300;400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Spectral', serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        ::selection { background: black; color: white; }

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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <div className="flex flex-col items-start gap-1.5">
            <svg width="52" height="40" viewBox="0 0 180 140" fill="none">
              <path 
                className={`logo-path ${logoDrawn ? 'drawn' : ''}`}
                d="M15 125 L15 15 L50 85 L85 15 L85 125 M85 15 L120 85 L155 15 L155 125"
                stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none"
              />
            </svg>
            <div className="text-[7px] tracking-[0.2em] uppercase opacity-60 ml-[1px]" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
              Motivated Minds.
            </div>
          </div>
          <button 
            onClick={() => router.push('/apply')}
            className="text-[10px] md:text-xs tracking-[0.25em] uppercase px-6 md:px-8 py-3 border border-black hover-lift hover:bg-black hover:text-white transition-colors duration-300"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Apply
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center px-6 md:px-12 pt-28 md:pt-32 pb-12 md:pb-16 snap-section">
        <div className="max-w-[1100px] mx-auto w-full">
          <motion.h1 
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] leading-[0.92] tracking-[-0.02em] mb-10 md:mb-12"
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
            className="max-w-[650px] space-y-8"
          >
            <p 
              className="text-lg sm:text-xl md:text-2xl leading-[1.6]"
              style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.85 }}
            >
              <span style={{ fontWeight: 500 }}>Motivated Minds</span> is a private community for people committed to excelling in their careers, investing in their health, cultivating meaningful relationships, and building what comes next.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/apply')}
              className="bg-black text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
            >
              Apply for Membership
            </motion.button>

            <p className="text-xs opacity-40 pt-2" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
              Membership is curated and reviewed individually.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NYC + Global - MOVED UP */}
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12 snap-section">
        <div className="max-w-[900px] mx-auto text-center w-full">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Born in New York.
            <br />
            Connected everywhere.
          </motion.h2>
        </div>
      </section>

      {/* What is Motivated Minds */}
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12 bg-gray-50/30 snap-section">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5"
            >
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
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
              className="lg:col-span-7 space-y-6"
            >
              <p 
                className="text-xl md:text-2xl lg:text-3xl leading-[1.5]"
                style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.9 }}
              >
                Meeting people who match your ambition, values, and pace is harder than it should be.
              </p>
              <p 
                className="text-base md:text-lg lg:text-xl leading-[1.65]"
                style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.75 }}
              >
                We curate exceptional experiences that bring together high-agency individuals who want to build meaningful relationships, learn from one another, and turn ideas into action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Philosophy */}
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12 bg-black text-white snap-section">
        <div className="max-w-[900px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-14 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Philosophy
          </motion.h2>
          
          <div className="space-y-8 md:space-y-10 text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.7]" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
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
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12 snap-section">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-14 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Our Pillars
          </motion.h2>
          
          {/* Mobile: Accordion */}
          <div className="md:hidden space-y-3">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-black/10 pb-3"
              >
                <button
                  onClick={() => setExpandedPillar(expandedPillar === idx ? null : idx)}
                  className="w-full text-left"
                >
                  <h3 
                    className="text-xl mb-2 tracking-tight flex justify-between items-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {pillar.title}
                    <span className="text-sm">{expandedPillar === idx ? '−' : '+'}</span>
                  </h3>
                </button>
                {expandedPillar === idx && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="text-sm leading-[1.6] mt-3"
                    style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.7 }}
                  >
                    {pillar.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-14 gap-y-12">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 
                  className="text-xl md:text-2xl lg:text-3xl mb-4 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {pillar.title}
                </h3>
                <p 
                  className="text-sm md:text-base leading-[1.65]"
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
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12 bg-black text-white snap-section">
        <div className="max-w-[1100px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 md:mb-14 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Programming
          </motion.h2>
          
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-12 lg:gap-14">
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
                className="border-t border-white/20 pt-6"
              >
                <h3 
                  className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                >
                  {program.title}
                </h3>
                <p 
                  className="text-sm md:text-base lg:text-lg leading-[1.65]"
                  style={{ fontFamily: "'Spectral', serif", fontWeight: 300, opacity: 0.75 }}
                >
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-black/10 py-20 md:py-24 px-6 md:px-12 bg-black text-white snap-section">
        <div className="max-w-[700px] mx-auto text-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Ready to apply?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl mb-10 leading-[1.6]"
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
            className="bg-white text-black px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Apply
          </motion.button>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="border-t border-black/10 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl mb-10 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Connect With Us
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4" style={{ fontFamily: "'Spectral', serif" }}>
                Email
              </h3>
              <a 
                href="mailto:hello@meetmotivatedminds.com"
                className="text-lg md:text-xl opacity-70 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
              >
                hello@meetmotivatedminds.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4" style={{ fontFamily: "'Spectral', serif" }}>
                Follow
              </h3>
              <div className="flex gap-6">
                <a 
                  href="https://instagram.com/motivatedminds" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
                >
                  Instagram
                </a>
                <a 
                  href="https://linkedin.com/company/motivatedminds" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs opacity-30" style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}>
            © 2025 Motivated Minds
          </p>
        </div>
      </footer>
    </div>
  );
}
