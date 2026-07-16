import React from 'react';
import { Play, Pause, VolumeX, Volume2, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';
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
    <section className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] bg-slate-900 overflow-hidden font-sans" id="hero-video-section">
      {/* Absolute Video Elements / Fallback */}
      {!loadError ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onError={() => setLoadError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-wearing-a-yellow-beanie-sitting-outdoors-40893-large.mp4"
        />
      ) : (
        /* Fallback beautiful styled sliding/fading CSS canvas gradient when CDN is slow or blocked */
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          {/* Animated colorful bokeh spheres */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      )}

      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/45 z-10"></div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full text-white">
        <div className="max-w-2xl text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-blue-600/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full mb-4 sm:mb-5 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Redesigned UX Lab Release</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-3 sm:mb-4">
            Designed for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
              Modern Living.
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-medium leading-relaxed max-w-lg">
            Experience premium apparel, bespoke insulated drinkware, and sustainable office goods curated with absolute craftsmanship.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onShopNew}
              className="bg-white text-slate-950 text-xs sm:text-sm font-bold tracking-wide uppercase px-6 py-3.5 rounded-xl hover:bg-blue-50 hover:scale-103 transition-all duration-300 shadow-lg flex items-center gap-2 group border border-transparent focus:outline-hidden"
              id="shop-new-cta-btn"
            >
              <span>Shop New Arrivals</span>
              <ChevronRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
            </button>

            {comparisonMode === 'optimized' && (
              <button
                onClick={() => {
                  const target = document.getElementById('promo-tiles-row');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-transparent text-white text-xs sm:text-sm font-bold tracking-wide uppercase px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all border border-white/20 hover:border-white focus:outline-hidden"
              >
                View Promo Collaborations
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Captions Bar (Only in Optimized Mode) */}
      {comparisonMode === 'optimized' && showCaptions && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-lg text-center" id="hero-captions-container">
          <div className="bg-black/75 backdrop-blur-xs border border-white/10 rounded-xl px-4 py-2 text-xs md:text-sm text-gray-200 font-medium tracking-wide shadow-2xl flex items-center justify-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="animate-in fade-in duration-300 select-none">
              &ldquo;{currentCaption}&rdquo;
            </span>
          </div>
        </div>
      )}

      {/* Video Media Controls (Only in Optimized Mode) */}
      {comparisonMode === 'optimized' && (
        <div className="absolute bottom-5 right-5 sm:right-8 z-20 flex items-center gap-2.5" id="hero-controls-container">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
              showCaptions
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-black/40 border-transparent text-gray-400 hover:text-white'
            }`}
            title="Toggle Captions"
            id="toggle-captions-btn"
          >
            CC
          </button>
          
          <button
            onClick={togglePlay}
            className="p-2.5 bg-black/40 hover:bg-black/60 rounded-xl text-white transition-all border border-white/10 hover:border-white/30 focus:outline-hidden"
            title={isPlaying ? 'Pause Loop' : 'Play Loop'}
            id="play-pause-btn"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-2.5 bg-black/40 hover:bg-black/60 rounded-xl text-white transition-all border border-white/10 hover:border-white/30 focus:outline-hidden"
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
