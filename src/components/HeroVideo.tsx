import React from 'react';
import { Play, Pause, VolumeX, Volume2, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComparisonMode } from '../types';

interface HeroVideoProps {
  onShopNew: () => void;
  comparisonMode: ComparisonMode;
}

const CAPTIONS = [
  { time: 0, text: 'Welcome to Google Merch. Redesigned.' },
  { time: 3, text: 'Sustainable organic cotton fabrics crafted for everyday comfort.' },
  { time: 6, text: 'Double-walled matte insulation keeping your hydration crisp.' },
  { time: 10, text: 'Eco-friendly lay-flat hardcover notebooks for creatives.' },
  { time: 14, text: 'Engineered for quality. Crafted for your life. Shop now.' }
];

export default function HeroVideo({ onShopNew, comparisonMode }: HeroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [activeCaptionIndex, setActiveCaptionIndex] = React.useState(0);
  const [currentCaption, setCurrentCaption] = React.useState(CAPTIONS[0].text);
  const [showCaptions, setShowCaptions] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);

  // Sync captions on a timer because HTML5 timeupdate can be slightly delayed or blocked
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      let activeIndex = 0;
      interval = setInterval(() => {
        activeIndex = (activeIndex + 1) % CAPTIONS.length;
        setActiveCaptionIndex(activeIndex);
        setCurrentCaption(CAPTIONS[activeIndex].text);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] bg-[#0a0a0c] overflow-hidden font-sans border-b border-slate-800" id="hero-video-section">
      {/* Absolute Video Elements / Fallback with Cinematic Pan & Scale */}
      {!loadError ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover opacity-70 scale-105 transition-transform duration-1000 ease-out"
            src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-wearing-a-yellow-beanie-sitting-outdoors-40893-large.mp4"
          />
        </div>
      ) : (
        /* Fallback beautiful styled sliding/fading CSS canvas gradient when CDN is slow or blocked */
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0c] via-slate-900 to-[#0a0a0c] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e10600_1px,transparent_1px)] [background-size:24px_24px]"></div>
          {/* Animated colorful bokeh spheres */}
          <div className="absolute -top-12 -left-12 w-80 h-80 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
        </div>
      )}

      {/* Ferrari Cinematic Vignette & Speed Shimmer Grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-[#0a0a0c]/80 z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(225,6,0,0.12)_0%,transparent_50%)] z-10 pointer-events-none"></div>

      {/* Top Telemetry Line (Ferrari Engineering Aesthetic) */}
      <div className="absolute top-4 left-6 right-6 z-20 hidden sm:flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-slate-400 font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e10600] animate-ping"></span>
          <span>EST. 2026 // PERFORMANCE CRAFT // LAT 37.4220° N</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>AERODYNAMIC DESIGN</span>
          <span className="text-[#e10600]">/</span>
          <span>SUSTAINABLE MATERIALS</span>
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 border border-red-500/30 shadow-[0_0_15px_rgba(225,6,0,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse"></span>
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Redesigned UX Lab Release</span>
          </motion.div>

          {/* Staggered Kinematic Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 sm:mb-5 font-display">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Designed for
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-red-300"
              >
                Modern Living.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-normal leading-relaxed max-w-lg"
          >
            Experience premium apparel, bespoke insulated drinkware, and sustainable office goods curated with absolute craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onShopNew}
              className="relative overflow-hidden bg-white text-slate-950 text-xs sm:text-sm font-bold tracking-wider uppercase px-7 py-4 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center gap-2.5 group border border-white hover:border-red-500 hover:shadow-[0_12px_30px_rgba(225,6,0,0.25)] hover:-translate-y-0.5 focus:outline-hidden"
              id="shop-new-cta-btn"
            >
              {/* Ferrari red speed accent hairline inside button */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#e10600] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></span>
              <span>Shop New Arrivals</span>
              <ChevronRight className="w-4 h-4 text-[#e10600] group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>

            {comparisonMode === 'optimized' && (
              <button
                onClick={() => {
                  const target = document.getElementById('promo-tiles-row');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-black/40 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wider uppercase px-6 py-4 rounded-xl hover:bg-white/10 hover:border-red-500/60 transition-all duration-300 border border-white/20 hover:-translate-y-0.5 focus:outline-hidden"
              >
                View Promo Collaborations
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Ferrari Tachometer & Captions Bar (Only in Optimized Mode) */}
      {comparisonMode === 'optimized' && showCaptions && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-xl text-center" id="hero-captions-container">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-2">
            {/* Tachometer / Telemetry Shift Lights Indicator */}
            <div className="flex items-center gap-1.5 w-full justify-center">
              {CAPTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeCaptionIndex === i
                      ? 'w-10 bg-[#e10600] shadow-[0_0_8px_#e10600]'
                      : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-200 font-medium tracking-wide">
              <MessageSquare className="w-3.5 h-3.5 text-[#e10600] shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentCaption}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="select-none"
                >
                  &ldquo;{currentCaption}&rdquo;
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Video Media Controls (Only in Optimized Mode) */}
      {comparisonMode === 'optimized' && (
        <div className="absolute bottom-5 right-5 sm:right-8 z-20 flex items-center gap-2" id="hero-controls-container">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              showCaptions
                ? 'bg-black/70 border-red-500/50 text-white shadow-[0_0_10px_rgba(225,6,0,0.3)]'
                : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
            }`}
            title="Toggle Captions"
            id="toggle-captions-btn"
          >
            CC
          </button>
          
          <button
            onClick={togglePlay}
            className="p-2.5 bg-black/60 hover:bg-black/80 rounded-xl text-white transition-all duration-300 border border-white/10 hover:border-red-500/40 hover:shadow-[0_0_12px_rgba(225,6,0,0.25)] focus:outline-hidden"
            title={isPlaying ? 'Pause Loop' : 'Play Loop'}
            id="play-pause-btn"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-2.5 bg-black/60 hover:bg-black/80 rounded-xl text-white transition-all duration-300 border border-white/10 hover:border-red-500/40 hover:shadow-[0_0_12px_rgba(225,6,0,0.25)] focus:outline-hidden"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            id="mute-unmute-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
    </section>
  );
}
