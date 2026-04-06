import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Particles from './components/Particles';
import ScrollFloat from './components/ScrollFloat';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Wrench, 
  Headphones, 
  Flower2, 
  Layers, 
  Info,
  ArrowRight,
  Github,
  Twitter,
  Instagram,
  Compass,
  Leaf,
  Gem,
  ArrowLeft,
  Eye,
  EyeOff,
  MessageCircle,
  Zap,
  Search,
  Heart,
  RotateCcw,
  Star
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-wenwan-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 40, 
        y: (e.clientY / window.innerHeight - 0.5) * 40 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-wenwan-ink">
      <Particles
        particleColors={['#D4AF37', '#8B5A2B', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
      <motion.div 
        className="absolute inset-[-10%] opacity-20 pointer-events-none"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-[24rem] h-[24rem] bg-wenwan-gold/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[31.25rem] h-[31.25rem] bg-wenwan-brown/30 blur-[150px] rounded-full" />
      </motion.div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 mix-blend-overlay pointer-events-none" />
    </div>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string, key?: any }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 35;
    const rotateY = (centerX - x) / 35;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---


const ExpandableSection = ({ title, items }: { title: string, items: { title: string, desc: string, img: string }[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="py-24">
      <h2 className="text-4xl font-bold mb-16 font-serif text-center tracking-widest text-wenwan-paper">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            layout
            className="bg-wenwan-ink/50 border border-white/10 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-4 left-6 text-white font-serif text-xl font-bold tracking-widest drop-shadow-md">
                {item.title}
              </div>
            </div>
            <AnimatePresence>
              {expandedIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-8 bg-white/5"
                >
                  <p className="text-wenwan-paper/70 leading-loose font-serif text-sm">
                    {item.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-wenwan-gold text-xs font-bold tracking-widest">了解更多细节</span>
                    <ArrowRight size={16} className="text-wenwan-gold" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const logoRef = React.useRef<HTMLDivElement>(null);
  const [actualLogoWidth, setActualLogoWidth] = useState(200);
  
  React.useLayoutEffect(() => {
    if (logoRef.current) {
      setActualLogoWidth(logoRef.current.offsetWidth);
    }
  }, [windowSize.width]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 10-step equivalent fluid easing (easeInOutCubic) for maximum smoothness
  // Sync the animation to complete exactly when the hero section (100vh) is fully covered
  const progress = useTransform(scrollY, (y) => {
    const p = Math.min(Math.max(y / windowSize.height, 0), 1);
    // Use a smoother easeInOutSine or easeInOutQuad for a more natural scroll-sync feel
    return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  });

  // Calculate X translation to move from right to center
  // Initial position is right-12 (48px from right)
  const xOffset = useTransform(progress, (p) => p * -(windowSize.width / 2 - 48 - actualLogoWidth / 2));
  const logoScale = useTransform(progress, (p) => 1 - 0.2 * p); 
  const logoColor = useTransform(scrollY, [0, 100], [isHome ? "#ffffff" : "#2A241F", "#D4AF37"]);

  // Light effect tracking the 10-step progression
  const lightOffset = useTransform(progress, (p) => {
    const maxOffset = Math.max(0, windowSize.width / 2 - actualLogoWidth / 2 - 150);
    return p * maxOffset;
  });
  const rightLightOffset = useTransform(lightOffset, (v: any) => -v);
  const lightOpacity = useTransform(progress, (p) => {
    if (p === 0) return 0;
    if (p < 0.5) return p * 2; // Fade in
    return 1 - (p - 0.5) * 1.2; // Fade down slightly to 0.4
  });

  return (
    <>
      {!isOpen && (
        <nav className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-700",
          scrolled ? "bg-wenwan-ink/90 backdrop-blur-md py-2 shadow-2xl" : "bg-transparent py-8"
        )}>
          {/* Converging Light Effects */}
          <motion.div 
            className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-wenwan-gold/50 to-wenwan-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            style={{ left: 0, width: '9.375rem', x: lightOffset, opacity: lightOpacity }}
          />
          <motion.div 
            className="absolute bottom-0 h-[2px] bg-gradient-to-l from-transparent via-wenwan-gold/50 to-wenwan-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            style={{ right: 0, width: '9.375rem', x: rightLightOffset, opacity: lightOpacity }}
          />

          <div className="w-full px-12 flex justify-between items-center relative h-full">
            {/* Dynamic Left Action Button */}
            <button 
              onClick={() => {
                if (!scrolled) {
                  if (!isHome) navigate('/');
                } else {
                  const startPosition = window.scrollY;
                  const startTime = performance.now();
                  const duration = 1500; // 1.5s

                  const animateScroll = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // easeInOutCubic
                    const ease = progress < 0.5 
                      ? 4 * progress * progress * progress 
                      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                  window.scrollTo(0, startPosition * (1 - ease));

                    if (progress < 1) {
                      requestAnimationFrame(animateScroll);
                    }
                  };

                  requestAnimationFrame(animateScroll);
                }
              }}
              className={cn(
                "hover:text-wenwan-gold transition-all duration-700 z-10 flex items-center relative",
                scrolled ? "text-white" : (isHome ? "text-white" : "text-wenwan-ink"),
                isHome && !scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <ArrowLeft 
                size={32} 
                className={cn(
                  "transition-transform duration-700", 
                  scrolled ? "rotate-90" : "rotate-0"
                )} 
              />
              <span className={cn(
                "absolute left-10 text-lg font-serif tracking-widest hidden md:block whitespace-nowrap transition-all duration-700",
                !scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              )}>
                返回首页
              </span>
            </button>
            
            {/* Animated Logo & Name */}
            <motion.div 
              ref={logoRef}
              style={{ x: scrolled ? 0 : (isHome ? xOffset : 0), scale: logoScale }}
              className={cn(
                "flex items-center space-x-4 cursor-pointer group relative z-10",
                isOpen && "invisible",
                scrolled ? "absolute left-1/2 -translate-x-1/2" : "ml-auto"
              )}
              onClick={() => navigate('/')}
            >
              <motion.div 
                style={{ borderColor: logoColor, color: logoColor }}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  !scrolled && isHome && "border-white text-white",
                  "group-hover:border-wenwan-gold group-hover:text-wenwan-gold"
                )}
              >
                <Flower2 size={24} />
              </motion.div>
              <motion.span 
                style={{ color: logoColor }}
                className={cn(
                  "text-2xl font-bold tracking-[0.4em] transition-all duration-500 font-serif whitespace-nowrap",
                  !scrolled && isHome && "text-white",
                  "group-hover:text-wenwan-gold"
                )}
              >
                文玩馆
              </motion.span>
            </motion.div>

            {/* Mobile Toggle - Inside Nav */}
            <div className="relative z-10">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "hover:text-wenwan-gold transition-colors",
                  scrolled ? "text-white" : (isHome ? "text-white" : "text-wenwan-ink")
                )}
              >
                <Menu size={32} />
              </button>
            </div>
          </div>
        </nav>
      )}
      
      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-gradient-to-b from-wenwan-ink/90 to-wenwan-ink/95 backdrop-blur-3xl z-[60] flex flex-col"
          >
            {/* Backdrop for closing */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
            
            <div className="absolute top-10 left-12 right-12 flex justify-between items-center text-white z-10">
              <button onClick={() => setIsOpen(false)}><ArrowLeft size={48} /></button>
            </div>
            <div className="flex flex-col items-center space-y-12 mt-24 overflow-y-auto w-full pb-20 z-10">
              <span className="font-serif text-4xl tracking-widest text-white mb-8">文玩馆</span>
              <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">文玩首页</Link>
              <Link to="/mall" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">官方商城</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">雅集登录</Link>
              <Link to="/maintenance" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">养护说明</Link>
              <Link to="/support" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">售后保障</Link>
              <Link to="/categories" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">菩提类</Link>
              <Link to="/categories" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">玉石类</Link>
              <Link to="/categories" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">木质类</Link>
              <Link to="/support" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white tracking-widest">关于我们</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-wenwan-ink text-wenwan-paper pt-24 pb-12 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        {/* Brand & Intro */}
        <div className="space-y-6 md:col-span-1">
          <h3 className="text-2xl font-serif font-bold text-wenwan-gold tracking-widest">文玩馆</h3>
          <p className="text-wenwan-paper/60 text-sm leading-loose font-serif">
            致力于传承东方雅致生活，为您甄选顶级木质、玉石、菩提等文玩珍品。每一件藏品，皆是岁月与匠心的结晶。
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-widest text-white">探索发现</h4>
          <ul className="space-y-4 text-sm text-wenwan-paper/60 font-serif">
            <li><Link to="/products" className="hover:text-wenwan-gold transition-colors">文玩品鉴</Link></li>
            <li><Link to="/categories" className="hover:text-wenwan-gold transition-colors">材质大全</Link></li>
            <li><Link to="/mall" className="hover:text-wenwan-gold transition-colors">官方商城</Link></li>
            <li><Link to="/maintenance" className="hover:text-wenwan-gold transition-colors">养护指南</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-widest text-white">客户服务</h4>
          <ul className="space-y-4 text-sm text-wenwan-paper/60 font-serif">
            <li><Link to="/support" className="hover:text-wenwan-gold transition-colors">关于我们</Link></li>
            <li><Link to="/support" className="hover:text-wenwan-gold transition-colors">售后保障</Link></li>
            <li><Link to="/support" className="hover:text-wenwan-gold transition-colors">常见问题</Link></li>
            <li><Link to="/support" className="hover:text-wenwan-gold transition-colors">联系我们</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-widest text-white">联系方式</h4>
          <ul className="space-y-4 text-sm text-wenwan-paper/60 font-serif">
            <li className="flex items-center gap-3">
              <span className="text-wenwan-gold">微信：</span>
              <span className="select-all text-white font-medium">orange_nomore</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-wenwan-gold">电话：</span>
              <span className="select-all">1433223</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-wenwan-gold">邮箱：</span>
              <span className="select-all">ThursdayV50RNB@FKC</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-wenwan-gold whitespace-nowrap">地址：</span>
              <span>广东技术师范大学东校区</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-wenwan-paper/40 tracking-widest font-serif">
        <p>© 2026 文玩馆 版权所有 · 用心传承文玩文化</p>
        <div className="flex gap-6">
          <Link to="/support" className="hover:text-wenwan-gold transition-colors">隐私政策</Link>
          <Link to="/support" className="hover:text-wenwan-gold transition-colors">服务条款</Link>
          <Link to="/support" className="hover:text-wenwan-gold transition-colors">营业执照</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --- Specific Layout Components ---

const AppreciationLayout = ({ section }: { section: any }) => {
  return (
    <div className="bg-[#F9F6F0] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        <div className="text-center space-y-6">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            {section.title + ' · 珍品大赏'}
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold">左图右文，细细品味每一处细节</p>
        </div>
        
        {section.gallery.map((item: any, idx: number) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
          >
            <div className="flex-1 w-full overflow-hidden rounded-sm shadow-2xl group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={item.img} 
                alt={item.title} 
                className="w-full h-[31.25rem] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-8">
              <div className="w-12 h-1 bg-wenwan-gold" />
              <p className="text-[#3D3229]/60 leading-loose">
                此件藏品历经岁月沉淀，包浆醇厚，纹理细腻。每一道刻痕都诉说着匠人的心血与专注。无论是作为投资收藏，还是日常把玩，皆为上品。其独特的材质与精湛的工艺，使其在众多文玩中脱颖而出。
              </p>
              <Link to={section.link} className="inline-block text-wenwan-gold font-bold tracking-widest border-b border-wenwan-gold pb-1 hover:text-wenwan-ink hover:border-wenwan-ink transition-colors">
                了解详情 →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MaterialLayout = ({ section }: { section: any }) => {
  const categoryProducts = globalProducts.filter(p => p.category === section.title);

  return (
    <div className="bg-[#F9F6F0] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            {section.title + ' · 探寻自然'}
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold">{section.detailTitle}</p>
          <p className="max-w-3xl mx-auto text-[#3D3229]/70 leading-loose font-serif text-lg">
            {section.detailDesc}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {section.features.map((feature: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-10 rounded-sm shadow-xl text-center space-y-6 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-20 h-20 mx-auto bg-wenwan-gold/10 rounded-full flex items-center justify-center text-wenwan-gold group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#3D3229]">{feature.title}</h3>
              <p className="text-[#3D3229]/70 leading-relaxed">{feature.desc}</p>
              <Link to={feature.link} className="inline-block text-wenwan-gold font-bold tracking-widest border-b border-wenwan-gold pb-1 hover:text-wenwan-ink hover:border-wenwan-ink transition-colors">
                {feature.label} →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Products Grid (图文显示) */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <ScrollFloat as="h3" containerClassName="text-4xl font-bold font-serif text-[#3D3229]">
              {'精选' + section.title}
            </ScrollFloat>
            <div className="w-16 h-1 bg-wenwan-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-sm overflow-hidden shadow-lg group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link to="/products" className="bg-white/90 text-wenwan-ink px-6 py-2 rounded-sm font-bold tracking-widest hover:bg-wenwan-gold hover:text-white transition-colors btn-neumorphic">
                      查看详情
                    </Link>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold font-serif text-[#3D3229]">{product.title}</h4>
                    <span className="text-wenwan-gold font-bold">{product.price}</span>
                  </div>
                  <p className="text-[#3D3229]/60 text-sm leading-relaxed">{product.desc}</p>
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {product.specs.map((spec, i) => (
                      <span key={i} className="text-xs text-wenwan-gray bg-gray-50 px-2 py-1 rounded-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CraftsmanshipLayout = ({ section }: { section: any }) => {
  return (
    <div className="bg-white py-32">
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <ScrollFloat as="h2" containerClassName="text-6xl font-bold font-serif text-[#3D3229]">
            {section.title}
          </ScrollFloat>
          <p className="text-2xl text-wenwan-gold font-serif italic">"千锤百炼，方得始终"</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-[#3D3229]/80 leading-loose font-serif text-lg">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-wenwan-gold first-letter:mr-3 first-letter:float-left">
              在文玩的世界里，材质固然重要，但赋予其灵魂的，往往是匠人那双布满老茧的手。从原石的切割、木料的打磨，到最终的抛光、穿线，每一道工序都容不得半点马虎。
            </p>
            <p>
              我们坚持采用最传统的纯手工技艺，拒绝机器的冰冷与千篇一律。因为我们相信，只有带有温度的手工，才能打造出真正能够传世的雅物。
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p>
              一件好的文玩，需要经过选材、开料、成型、精雕、打磨、抛光等数十道工序。其中，仅打磨一项，就需要用到从粗到细十几种不同目数的砂纸，耗时数天甚至数周。
            </p>
            <div className="p-8 bg-[#F9F6F0] border-l-4 border-wenwan-gold italic">
              "不急不躁，顺应木性，方能呈现出最自然的美感。" —— 首席匠人
            </div>
          </motion.div>
        </div>

        {/* Timeline Layout */}
        <div className="relative pt-16">
          <div className="absolute left-1/2 top-16 bottom-0 w-px bg-wenwan-gold/30 -translate-x-1/2 hidden md:block" />
          {section.features.map((feature: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full text-center md:text-left" style={{ textAlign: idx % 2 === 0 ? 'left' : 'right' }}>
                <h3 className="text-2xl font-bold font-serif text-[#3D3229] mb-4">{feature.title}</h3>
                <p className="text-[#3D3229]/60">{feature.desc}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-wenwan-ink text-wenwan-gold flex items-center justify-center z-10 shadow-lg shrink-0">
                {feature.icon}
              </div>
              <div className="flex-1 w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomizationLayout = ({ section }: { section: any }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['选择材质', '确定规格', '挑选配饰', '提交定制'];

  return (
    <div className="bg-[#F9F6F0] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mb-24">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            {section.title + ' · 专属体验'}
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold">功能展示：打造独一无二的专属雅物</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Configurator UI */}
          <div className="flex-1 bg-white p-8 rounded-sm shadow-xl border border-wenwan-gold/10">
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10" />
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center gap-4 cursor-pointer ${activeStep === idx ? 'text-wenwan-gold' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold bg-white border-2 transition-colors ${activeStep === idx ? 'border-wenwan-gold text-wenwan-gold' : 'border-gray-200'}`}>
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold tracking-widest hidden sm:block">{step}</span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-[18.75rem] flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-32 h-32 rounded-full bg-[#F9F6F0] flex items-center justify-center text-wenwan-gold">
                  {section.features[activeStep % section.features.length]?.icon || <Star size={48} />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#3D3229] mb-4">
                    {section.features[activeStep % section.features.length]?.title || steps[activeStep]}
                  </h3>
                  <p className="text-[#3D3229]/60 max-w-md mx-auto">
                    {section.features[activeStep % section.features.length]?.desc || '在此步骤中，您可以根据个人喜好进行详细配置。'}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
                  className="bg-wenwan-ink text-white px-12 py-4 rounded-sm hover:bg-wenwan-gold transition-colors tracking-widest btn-neumorphic-dark"
                >
                  {activeStep === steps.length - 1 ? '完成定制' : '下一步'}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview Panel */}
          <div className="w-full lg:w-[25rem] bg-wenwan-ink text-white p-8 rounded-sm shadow-2xl flex flex-col">
            <h3 className="text-2xl font-serif text-wenwan-gold mb-8 border-b border-wenwan-gold/30 pb-4">定制预览</h3>
            <div className="flex-1 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full border-4 border-dashed border-wenwan-gold/30 flex items-center justify-center"
              >
                <span className="text-wenwan-gold/50 font-serif tracking-widest">实时预览区</span>
              </motion.div>
            </div>
            <div className="mt-8 space-y-4 text-sm text-white/70">
              <div className="flex justify-between"><span className="text-white">当前材质:</span> <span>待选择</span></div>
              <div className="flex justify-between"><span className="text-white">当前规格:</span> <span>待选择</span></div>
              <div className="flex justify-between"><span className="text-white">预计工期:</span> <span className="text-wenwan-gold">15-20个工作日</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceLayout = ({ section }: { section: any }) => {
  return (
    <div className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mb-24">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            {section.title}
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold">混合排版：网格优势与折叠问答</p>
        </div>

        {/* Bento Grid for Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {section.advantages.map((adv: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl bg-[#F9F6F0] border border-wenwan-gold/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} flex flex-col justify-center`}
            >
              <div className="text-wenwan-gold mb-6">{adv.icon}</div>
              <h3 className={`font-bold font-serif text-[#3D3229] mb-4 ${idx === 0 ? 'text-4xl' : 'text-2xl'}`}>{adv.title}</h3>
              <p className="text-[#3D3229]/70 leading-relaxed">{adv.content}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8">
          <ScrollFloat as="h3" containerClassName="text-3xl font-bold font-serif text-center text-[#3D3229] mb-12">
            常见问题解答
          </ScrollFloat>
          {section.knowledge.articles.map((article: string, idx: number) => (
            <details key={idx} className="group bg-[#F9F6F0] rounded-sm border border-wenwan-gold/20 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#3D3229] font-serif">
                {article}
                <span className="transition group-open:rotate-180 text-wenwan-gold">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-[#3D3229]/70 leading-loose">
                我们提供完善的售后服务体系。针对您的问题，我们的专业团队会在24小时内给予响应。所有售出藏品均附带权威鉴定证书，并享受终身免费基础保养服务。具体流程请联系您的专属雅管家。
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoginLayout = ({ section }: { section: any }) => {
  return (
    <div className="bg-wenwan-ink py-32 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row gap-16 items-center">
        {/* Community Highlights */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-white space-y-12"
        >
          <ScrollFloat as="h2" containerClassName="text-6xl font-bold font-serif text-wenwan-gold">
            {section.title}
          </ScrollFloat>
          <p className="text-2xl font-serif italic text-white/80">{section.subtitle}</p>
          <p className="text-white/60 leading-loose max-w-md">
            {section.desc}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl font-bold text-wenwan-gold mb-2">10W+</div>
              <div className="text-sm text-white/50 tracking-widest">活跃雅友</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-wenwan-gold mb-2">500+</div>
              <div className="text-sm text-white/50 tracking-widest">线下雅集</div>
            </div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-md bg-white p-10 rounded-sm shadow-2xl"
        >
          <div className="text-center mb-10">
            <Flower2 size={48} className="text-wenwan-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#3D3229] font-serif">欢迎归来</h3>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-[#3D3229] mb-2 tracking-widest">手机号 / 账号</label>
              <input type="text" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold transition-colors bg-transparent" placeholder="请输入您的账号" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D3229] mb-2 tracking-widest">密码</label>
              <input type="password" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold transition-colors bg-transparent" placeholder="请输入密码" />
            </div>
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="accent-wenwan-gold" /> 记住我
              </label>
              <a href="#" className="text-wenwan-gold hover:underline">忘记密码？</a>
            </div>
            <button className="w-full bg-wenwan-ink text-white py-4 rounded-sm font-bold tracking-widest hover:bg-wenwan-gold transition-colors mt-8 btn-neumorphic-dark">
              {section.cta}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const MallPage = () => {
  const [material, setMaterial] = useState('');
  const [spec, setSpec] = useState('');
  const [accessory, setAccessory] = useState('');

  return (
    <div className="min-h-screen bg-wenwan-paper py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-wenwan-ink mb-16 text-center">雅集商城</h1>
        
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {['竹木类', '宝玉石类', '菩提与籽核类', '其他材质'].map((cat) => (
            <motion.div 
              key={cat}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-sm shadow-lg border border-wenwan-gold/20 text-center cursor-pointer hover:border-wenwan-gold transition-all"
            >
              <h3 className="text-xl font-serif font-bold text-wenwan-ink">{cat}</h3>
            </motion.div>
          ))}
        </div>

        {/* Customization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-12 rounded-sm shadow-2xl">
          <div className="bg-[#F9F6F0] rounded-sm flex items-center justify-center h-[31.25rem] border-2 border-dashed border-wenwan-gold/30">
            <p className="text-wenwan-gold/50 font-serif tracking-widest">预留3D模型展示区域</p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-wenwan-ink border-b border-wenwan-gold/20 pb-4">专属定制</h2>
            <div>
              <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">材质选择</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent">
                <option value="">请选择材质</option>
                <option value="m1">小叶紫檀</option>
                <option value="m2">黄花梨</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">规格大小</label>
              <select value={spec} onChange={(e) => setSpec(e.target.value)} className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent">
                <option value="">请选择规格</option>
                <option value="s1">圆珠</option>
                <option value="s2">桶珠</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">配饰样式</label>
              <select value={accessory} onChange={(e) => setAccessory(e.target.value)} className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent">
                <option value="">请选择配饰</option>
                <option value="a1">佛头</option>
                <option value="a2">顶珠</option>
              </select>
            </div>
            <button className="w-full bg-wenwan-ink text-white py-4 rounded-sm font-bold tracking-[0.3em] hover:bg-wenwan-gold transition-all">立即定制</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultHomeLayout = ({ section }: { section: any }) => {
  return (
    <>
      {/* Section 2: Dynamic Detail Content (Story/Intro) */}
      <section className="py-40 px-6 bg-[#F9F6F0] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <TiltCard className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-[16px] overflow-hidden shadow-2xl relative group"
              style={{ translateZ: 50 }}
            >
              <img 
                src={section.detailImage} 
                alt={section.detailTitle} 
                className="w-full h-[37.5rem] object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Spotlight Effect Overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 0%, rgba(0,0,0,0.4) 100%)`
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }}
              />
            </motion.div>
          </TiltCard>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-10"
          >
            <h2 className="text-wenwan-gold font-bold tracking-[0.4em] text-sm uppercase border-b-2 border-wenwan-gold pb-2 inline-block">
              {section.subtitle} · 深度解读
            </h2>
            <ScrollFloat as="h3" containerClassName="text-5xl font-bold font-serif text-[#3D3229] leading-tight">
              {section.detailTitle}
            </ScrollFloat>
            <p className="text-[#3D3229]/80 text-xl leading-loose font-serif italic">
              {section.detailDesc}
            </p>
            
            <div className="pt-8">
              <Link to={section.link} className="text-wenwan-gold font-bold tracking-widest flex items-center group text-lg">
                立即进入{section.title}详情 <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Dynamic Features/Services */}
      <section className="py-40 px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center space-y-6 mb-24"
      >
        <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
          {section.title + ' · 为你提供'}
        </ScrollFloat>
        <p className="text-wenwan-gold tracking-[0.4em] font-bold">不只是交易，更是知识与审美的同行者</p>
      </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {section.features.map((item: any, idx: number) => (
            <TiltCard key={idx}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
                className="bg-[#F9F6F0] p-12 rounded-sm border border-wenwan-gold/10 text-center space-y-8 h-full hover:border-wenwan-gold transition-colors"
                style={{ translateZ: 30 }}
              >
                <div className="w-20 h-20 bg-wenwan-ink text-wenwan-gold rounded-full flex items-center justify-center mx-auto shadow-xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#3D3229]">{item.title}</h3>
                <p className="text-[#3D3229]/60 leading-loose font-serif text-sm">{item.desc}</p>
                <Link to={item.link} className="inline-block text-wenwan-gold font-bold border-b border-wenwan-gold pb-1 hover:text-wenwan-ink hover:border-wenwan-ink transition-colors tracking-widest text-sm">
                  {item.label} →
                </Link>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Section 4: Dynamic Gallery/Showcase */}
      <section className="py-40 px-6 bg-[#F9F6F0]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center space-y-6 mb-24"
      >
        <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
          {section.title + '之美 · 不止于物'}
        </ScrollFloat>
        <p className="text-wenwan-gold tracking-[0.4em] font-bold">精选藏品，每一件都值得静观</p>
      </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {section.gallery.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
              className="group relative h-[25rem] overflow-hidden rounded-sm shadow-lg"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to={section.link} className="bg-wenwan-ink text-wenwan-paper px-16 py-6 rounded-sm font-bold tracking-[0.3em] hover:bg-wenwan-gold hover:text-wenwan-ink transition-all btn-neumorphic-dark">
            深入了解 →
          </Link>
        </div>
      </section>

      {/* Section 5: Dynamic Advantages */}
      <section className="py-40 px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center space-y-6 mb-24"
      >
        <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
          {'为什么选择' + section.title}
        </ScrollFloat>
        <p className="text-wenwan-gold tracking-[0.4em] font-bold">专业、真实、有保障</p>
      </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {section.advantages.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
              className="p-10 bg-[#F9F6F0] rounded-sm border border-wenwan-gold/5 text-center space-y-6"
            >
              <div className="text-wenwan-gold flex justify-center">{item.icon}</div>
              <h4 className="text-xl font-bold font-serif text-[#3D3229]">{item.title}</h4>
              <p className="text-[#3D3229]/60 text-sm font-serif leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 6: Dynamic Knowledge Inheritance */}
      <section className="py-40 px-6 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto text-center space-y-6 mb-24">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            不止于买 · 更在于传
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold">养护知识 + 材质科普，让文玩陪伴更长久</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="flex items-center gap-4 text-wenwan-ink">
              <Flower2 size={32} />
              <ScrollFloat as="h3" containerClassName="text-3xl font-bold font-serif">
                📖 养护指南
              </ScrollFloat>
            </div>
            <div className="space-y-8">
              {section.knowledge.articles.map((text: string, idx: number) => (
                <div key={idx} className="flex justify-between items-center group cursor-pointer border-b border-wenwan-gold/10 pb-4">
                  <span className="text-[#3D3229] font-serif group-hover:text-wenwan-gold transition-colors">{text}</span>
                  <span className="text-wenwan-gold text-sm font-bold tracking-widest">阅读 →</span>
                </div>
              ))}
            </div>
            <Link to="/maintenance" className="inline-block text-wenwan-gold font-bold tracking-widest border-b border-wenwan-gold pb-1">
              查看更多养护文章 →
            </Link>
          </div>
          <div className="space-y-12">
            <div className="flex items-center gap-4 text-wenwan-ink">
              <Leaf size={32} />
              <ScrollFloat as="h3" containerClassName="text-3xl font-bold font-serif">
                🌳 材质百科
              </ScrollFloat>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {section.knowledge.categories.map((item: any, idx: number) => (
                <div key={idx} className="p-6 bg-white rounded-sm border border-wenwan-gold/10 space-y-2">
                  <div className="font-bold font-serif text-[#3D3229]">{item.name}</div>
                  <div className="text-wenwan-gold text-xs tracking-widest">{item.tag}</div>
                </div>
              ))}
            </div>
            <Link to="/categories" className="inline-block text-wenwan-gold font-bold tracking-widest border-b border-wenwan-gold pb-1">
              查看全部材质分类 →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Dynamic Join Us */}
      <section className="py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <ScrollFloat as="h2" containerClassName="text-5xl font-bold font-serif text-[#3D3229]">
            {'与' + section.title + '一起，感受岁月之美'}
          </ScrollFloat>
          <p className="text-wenwan-gold tracking-[0.4em] font-bold uppercase">关注公众号，获取每日文玩知识</p>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-48 h-48 bg-[#F9F6F0] p-4 rounded-sm border border-wenwan-gold/20 shadow-inner">
              <img src="https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg" alt="QR Code" className="w-full h-full mix-blend-multiply opacity-80" />
            </div>
            <p className="text-[#3D3229]/60 font-serif">微信扫一扫，关注{section.title}</p>
          </div>
        </div>
      </section>
    </>
  );
};

// --- Pages ---

const RotatingShouchuan = ({ activeIndex, beads, onBeadClick, onHoverChange }: { activeIndex: number, beads: any[], onBeadClick: (index: number) => void, onHoverChange: (isHovered: boolean) => void }) => {
  // 7 fixed positions to fill the vertical space better
  // Angles: -90 (top), -60, -30, 0 (center), 30, 60, 90 (bottom)
  const positions = [-90, -60, -30, 0, 30, 60, 90];

  return (
    <div className="absolute left-0 top-0 w-[43.75rem] h-screen pointer-events-none hidden lg:block z-20">
      <div className="relative w-full h-full">
        {positions.map((angle, posIndex) => {
          // Calculate which bead is at this position
          // Center is at posIndex 3 (angle 0)
          const beadIndex = (activeIndex + (posIndex - 3) + beads.length) % beads.length;
          const bead = beads[beadIndex];
          
          // Vertical elliptical path: even longer vertically to minimize top/bottom space
          const radiusX = 320;
          const radiusY = 540; // Further increased to push beads closer to the screen edges
          const x = radiusX * Math.cos((angle * Math.PI) / 180);
          const y = radiusY * Math.sin((angle * Math.PI) / 180);

          const isCenter = angle === 0;

          return (
            <motion.div 
              key={beadIndex}
              layoutId={`bead-${beadIndex}`}
              initial={false}
              animate={{ 
                left: isCenter ? x + 150 : x + 30, 
                top: `calc(50% + ${y}px)`,
                scale: isCenter ? 1.6 : 0.9,
                filter: isCenter ? 'brightness(1.2)' : 'brightness(0.3)',
                opacity: 1
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => onHoverChange(true)}
              onMouseLeave={() => onHoverChange(false)}
              onClick={() => onBeadClick(beadIndex)}
              className="absolute w-40 h-40 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden border-2 border-white/10 cursor-pointer pointer-events-auto group/bead"
              style={{
                transform: `translate(-50%, -50%)`,
              }}
            >
              <img 
                src={bead.image} 
                alt={bead.title}
                className="w-full h-full object-cover scale-110 transition-transform duration-500 group-hover/bead:scale-125"
                referrerPolicy="no-referrer"
              />
              
              {/* 3D Sphere Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/70 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_-15px_-15px_40px_rgba(0,0,0,0.9),inset_10px_10px_25px_rgba(255,255,255,0.25)] pointer-events-none" />
              
              {/* Top Highlight Spot */}
              <div className="absolute top-[12%] left-[12%] w-12 h-12 bg-white/40 rounded-full blur-xl" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Hero scaling and overlay transformations
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20, 
        y: (e.clientY / window.innerHeight - 0.5) * 20 
      });
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const sections = [
    { 
      title: '文玩馆', 
      subtitle: '静心·雅趣·传承',
      desc: '我们相信，每一件文玩都有它的生命与故事。从选材到盘玩，从养护到传承，文玩馆陪伴每一位爱物之人，感受岁月包浆的温度。',
      cta: '探索文玩世界',
      link: '/products',
      material: '品牌核心',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%96%87%E7%8E%A9%E9%A6%96%E9%A1%B5.jpg',
      detailTitle: '始于热爱，忠于匠心',
      detailDesc: '文玩馆创立于2018年，源于一群文玩爱好者对传统文化的痴迷。我们深知，真正的文玩不是冰冷的商品，而是承载了岁月、情感与审美的雅物。平台集品鉴展示、材质科普、养护指导、正品商城于一体，致力于打造一个专业、有温度的文玩文化社区。',
      features: [
        { icon: <Compass size={40} />, title: '品鉴·发现美', desc: '高清图集 + 专业解读，从形制、工艺到文化寓意，带你读懂每一件文玩的独特之美。', link: '/products', label: '浏览品鉴馆' },
        { icon: <Leaf size={40} />, title: '材质·懂真伪', desc: '小叶紫檀、海南黄花梨、和田玉、金刚菩提…系统科普产地、特征、鉴别方法，买前先懂料。', link: '/categories', label: '查看材质大全' },
        { icon: <Wrench size={40} />, title: '养护·传久远', desc: '盘玩技巧、保养禁忌、修复指南。让心爱之物越养越润，代代相传。', link: '/maintenance', label: '学习养护知识' }
      ],
      gallery: [
        { title: '紫檀·帝王木', sub: '油性十足，百年成材', img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E7%B4%AB%E6%AA%80%C2%B7%E5%B8%9D%E7%8E%8B%E6%9C%A8.jpg' },
        { title: '和田玉·君子之器', sub: '温润内敛，德玉相配', img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%92%8C%E7%94%B0%E7%8E%89%C2%B7%E5%90%9B%E5%AD%90%E4%B9%8B%E5%99%A8.jpg' },
        { title: '金刚菩提·磨砺见性', sub: '盘的是棱角，磨的是心性', img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E9%87%91%E5%88%9A%E8%8F%A9%E6%8F%90%C2%B7%E7%A3%A8%E7%A0%BA%E8%A7%81%E6%80%A7.jpg' },
        { title: '檀香·静气凝神', sub: '一炉真香，万念俱息', img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%AA%80%E9%A6%99%C2%B7%E9%9D%99%E6%B0%94%E5%87%9D%E7%A5%9E.jpg' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '严选正品', content: '每一件文玩均经过专业鉴定，支持复检，假一赔三' },
        { icon: <Compass size={32} />, title: '实物拍摄', content: '一物一拍，自然光细节图，所见即所得' },
        { icon: <Wrench size={32} />, title: '养护无忧', content: '终身免费咨询养护问题，盘玩路上有人陪' },
        { icon: <ArrowLeft size={32} />, title: '七天退换', content: '不满意可退换，运费由我们承担' }
      ],
      knowledge: {
        articles: ['夏季木质文玩保养三大禁忌', '金刚菩提反碱了怎么办？', '手串多久盘一次最好？'],
        categories: [
          { name: '小叶紫檀', tag: '密度高·油性好' },
          { name: '海南黄花梨', tag: '鬼脸纹·降香味' },
          { name: '和田玉', tag: '温润如脂·德玉之选' },
          { name: '金刚菩提', tag: '红润包浆·越盘越美' }
        ]
      },
      detailImage: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%96%87%E7%8E%A9%E9%A6%86.jpg'
    },
    { 
      title: '木质类', 
      subtitle: '草木金石 · 探寻自然',
      desc: '小叶紫檀、海南黄花梨、老山檀香。木质温润，香气袭人，是文玩收藏的不二之选。',
      cta: '查看木质百科',
      link: '/categories',
      material: '小叶紫檀',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%9C%A8%E8%B4%A8%E7%B1%BB.jpg',
      detailTitle: '木中之王 · 岁月留香',
      detailDesc: '名贵木材历经百年甚至千年方能成材。我们深入印度南部、海南黎母山等产地，为您甄选油性、密度、纹理俱佳的顶级木料。',
      features: [
        { icon: <Leaf size={40} />, title: '材质鉴别', desc: '教你如何通过棕眼、金星、纹理判断木料等级。', link: '/categories', label: '学习鉴别' },
        { icon: <Compass size={40} />, title: '产地溯源', desc: '直击原材料产地，确保每一块木料来源正宗。', link: '/categories', label: '了解产地' },
        { icon: <Wrench size={40} />, title: '盘玩技巧', desc: '木质文玩最忌汗水，教你如何盘出玻璃底。', link: '/maintenance', label: '学习盘玩' }
      ],
      gallery: [
        { title: '满金星紫檀', sub: '金星璀璨，如星空般深邃', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop' },
        { title: '海黄蜘蛛纹', sub: '纹理奇特，如梦如幻', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop' },
        { title: '老山檀香', sub: '醇厚奶香，经久不散', img: 'https://images.unsplash.com/photo-1588444839799-eb6bd27e386a?q=80&w=800&auto=format&fit=crop' },
        { title: '金丝楠水波', sub: '流光溢彩，如水波荡漾', img: 'https://images.unsplash.com/photo-1599707334091-3d22b1f3b274?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '老料保证', content: '坚持使用干透老料，稳定性高，不易开裂' },
        { icon: <Compass size={32} />, title: '手工打磨', content: '拒绝化学上蜡，纯手工高目数打磨至自然光泽' },
        { icon: <Wrench size={32} />, title: '专业养护', content: '针对北方干燥、南方潮湿提供不同养护方案' },
        { icon: <ArrowLeft size={32} />, title: '正品溯源', content: '每一件木质藏品均可追溯原材来源' }
      ],
      knowledge: {
        articles: ['如何区分海黄与越黄', '小叶紫檀金星的形成原理', '木质手串防裂全攻略'],
        categories: [
          { name: '小叶紫檀', tag: '印度·高密' },
          { name: '海南黄花梨', tag: '降香·鬼脸' },
          { name: '老山檀香', tag: '印度·肉质' },
          { name: '金丝楠', tag: '川料·水波' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '菩提类', 
      subtitle: '磨砺见性 · 禅意人生',
      desc: '金刚、星月、凤眼。在盘玩中见证色彩与质地的蜕变，感悟禅意。',
      cta: '探索菩提世界',
      link: '/categories',
      material: '金刚菩提',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E8%8F%A9%E6%8F%90%E7%B1%BB.jpg',
      detailTitle: '万物皆有灵 · 菩提本无树',
      detailDesc: '菩提子是自然的馈赠，更是修行的见证。从尼泊尔的深山到您的掌心，每一颗菩提都承载着岁月的洗礼与盘玩的温润。',
      features: [
        { icon: <Flower2 size={40} />, title: '品种百科', desc: '系统讲解金刚、星月、凤眼等主流菩提特征。', link: '/categories', label: '查看百科' },
        { icon: <Layers size={40} />, title: '清理技巧', desc: '教你如何深度清理原籽，不伤皮质。', link: '/maintenance', label: '学习清理' },
        { icon: <Compass size={40} />, title: '包浆历程', desc: '记录从干涩到红润透亮的每一个阶段。', link: '/products', label: '查看案例' }
      ],
      gallery: [
        { title: '大金刚手持', sub: '肉质饱满，桩型端正', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop' },
        { title: '星月菩提', sub: '正月顺白，瓷感十足', img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800&auto=format&fit=crop' },
        { title: '凤眼菩提', sub: '眼正皮厚，包浆红润', img: 'https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800&auto=format&fit=crop' },
        { title: '菩提根', sub: '温润如玉，开片之美', img: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '原产地直供', content: '尼泊尔、印尼等产地一手货源，价格公道' },
        { icon: <Compass size={32} />, title: '精选皮质', content: '严选高密度、无阴皮、无坏籽的优质原籽' },
        { icon: <Wrench size={32} />, title: '专业清理', content: '提供超声波深度清理服务，到手即玩' },
        { icon: <ArrowLeft size={32} />, title: '搭配建议', content: '提供南红、绿松石等多种高端配饰方案' }
      ],
      knowledge: {
        articles: ['金刚菩提如何刷出红润感', '星月菩提的评判标准', '凤眼菩提的尺寸与价值'],
        categories: [
          { name: '金刚菩提', tag: '尼泊尔·肉纹' },
          { name: '星月菩提', tag: '海南·顺白' },
          { name: '凤眼菩提', tag: '尼泊尔·眼正' },
          { name: '菩提根', tag: '温润·开片' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '玉石类', 
      subtitle: '温润如玉 · 君子之德',
      desc: '和田玉、翡翠、南红。石之美者，温润如玉，点缀指尖的灵动。',
      cta: '鉴赏玉石之美',
      link: '/categories',
      material: '和田玉',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E7%8E%89%E7%9F%B3%E7%B1%BB.jpg',
      detailTitle: '谦谦君子 · 温润如玉',
      detailDesc: '玉文化贯穿中华文明。我们为您呈现羊脂白玉的细腻、帝王绿翡翠的深邃、南红玛瑙的艳丽，每一块玉石都经过国检认证。',
      features: [
        { icon: <Gem size={40} />, title: '玉石百科', desc: '系统讲解和田玉、翡翠、南红等主流玉石特征。', link: '/categories', label: '查看百科' },
        { icon: <ShieldCheck size={40} />, title: '权威鉴定', desc: '每一件玉石均附带国家级鉴定证书。', link: '/support', label: '查看证书' },
        { icon: <Layers size={40} />, title: '雕刻工艺', desc: '展示海派、苏派等不同流派的雕刻艺术。', link: '/products', label: '欣赏雕工' }
      ],
      gallery: [
        { title: '羊脂白玉', sub: '温润如脂，洁白无瑕', img: 'https://images.unsplash.com/photo-1615485240384-552e40079c44?q=80&w=800&auto=format&fit=crop' },
        { title: '南红柿子红', sub: '色泽艳丽，满肉满色', img: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=800&auto=format&fit=crop' },
        { title: '高瓷绿松石', sub: '瓷感十足，色泽纯正', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop' },
        { title: '翡翠挂件', sub: '种水十足，灵动通透', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '国检认证', content: '所有玉石均支持全国任何权威机构复检' },
        { icon: <Compass size={32} />, title: '名家雕刻', content: '与多位省级以上工艺美术大师深度合作' },
        { icon: <Wrench size={32} />, title: '终身维护', content: '提供免费的超声波清洗与重新穿绳服务' },
        { icon: <ArrowLeft size={32} />, title: '实物视频', content: '提供自然光实拍视频，全方位展示种水' }
      ],
      knowledge: {
        articles: ['和田玉籽料与山料的区别', '如何判断翡翠的种水', '南红玛瑙的收藏价值'],
        categories: [
          { name: '和田玉', tag: '新疆·羊脂' },
          { name: '翡翠', tag: '缅甸·老坑' },
          { name: '南红', tag: '凉山·保山' },
          { name: '绿松石', tag: '十堰·高瓷' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1615485240384-552e40079c44?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '官方商城', 
      subtitle: '正品保障 · 假一赔三',
      desc: '精选好物，一物一拍，自然光细节图，所见即所得。',
      cta: '立即选购',
      link: '/mall',
      material: '商城精选',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%AE%98%E6%96%B9%E5%95%86%E5%9F%8E.jpg',
      detailTitle: '严选好物 · 雅致生活',
      detailDesc: '商城坚持“一物一拍”原则，拒绝过度修图。我们与多位非遗传承人及知名匠人深度合作，确保每一件商品都具备收藏价值。',
      features: [
        { icon: <ShoppingBag size={40} />, title: '精选商城', desc: '汇集各类高品质文玩，支持在线下单。', link: '/mall', label: '进入商城' },
        { icon: <ShieldCheck size={40} />, title: '正品溯源', desc: '每一件商品都有唯一的溯源码，确保正品。', link: '/mall', label: '查看证书' },
        { icon: <Headphones size={40} />, title: '专属客服', desc: '专业客服一对一服务，解答选购疑问。', link: '/mall', label: '咨询客服' }
      ],
      gallery: [
        { title: '新品上架', sub: '本周精选好物推荐', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop' },
        { title: '限时特惠', sub: '超值文玩，不容错过', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop' },
        { title: '匠人作品', sub: '名家手作，极具潜力', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop' },
        { title: '礼盒套装', sub: '精美包装，送礼佳选', img: 'https://images.unsplash.com/photo-1588444839799-eb6bd27e386a?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '权威鉴定', content: '所有商品均附带权威机构鉴定证书' },
        { icon: <Compass size={32} />, title: '一物一拍', content: '实物拍摄，确保您收到的就是您看到的' },
        { icon: <Wrench size={32} />, title: '终身维护', content: '在商城购买的商品均可享受终身维护' },
        { icon: <ArrowLeft size={32} />, title: '极速发货', content: '顺丰包邮，确保商品安全快速送达' }
      ],
      knowledge: {
        articles: ['文玩选购的避坑指南', '如何判断文玩的收藏价值', '网购文玩需要注意什么'],
        categories: [
          { name: '手串类', tag: '单圈·108颗' },
          { name: '挂件类', tag: '牌子·雕件' },
          { name: '摆件类', tag: '山水·人物' },
          { name: '配饰类', tag: '顶珠·三通' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '关于我们', 
      subtitle: '匠心传承 · 始于热爱',
      desc: '始于热爱，忠于匠心。致力于打造一个专业、有温度的文玩文化社区。',
      cta: '了解我们的故事',
      link: '/support',
      material: '品牌故事',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC.jpg',
      detailTitle: '传承东方美学 · 弘扬匠人精神',
      detailDesc: '文玩馆不仅是一个交易平台，更是一个文化传播阵地。我们通过纪录片、雅集活动等形式，记录匠人故事，让更多年轻人爱上传统文化。',
      features: [
        { icon: <Info size={40} />, title: '品牌故事', desc: '了解文玩馆的起源与发展历程。', link: '/support', label: '阅读故事' },
        { icon: <Compass size={40} />, title: '愿景使命', desc: '我们的追求：让文玩文化走向世界。', link: '/support', label: '了解愿景' },
        { icon: <Github size={40} />, title: '社会责任', desc: '参与公益，回馈社会，传承文明。', link: '/support', label: '查看公益' }
      ],
      gallery: [
        { title: '品牌历程', sub: '一步一个脚印，见证成长', img: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=800&auto=format&fit=crop' },
        { title: '团队风采', sub: '专业团队，为您保驾护航', img: 'https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800&auto=format&fit=crop' },
        { title: '匠人合作', sub: '携手匠人，共创辉煌', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?q=80&w=800&auto=format&fit=crop' },
        { title: '荣誉奖项', sub: '行业认可，品质保证', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '专业团队', content: '拥有多位行业资深专家与鉴定师' },
        { icon: <Compass size={32} />, title: '广泛合作', content: '与全国数百位非遗匠人深度合作' },
        { icon: <Wrench size={32} />, title: '文化底蕴', content: '深厚的文化积淀，让品牌更有内涵' },
        { icon: <ArrowLeft size={32} />, title: '创新驱动', content: '不断探索新技术在文玩领域的应用' }
      ],
      knowledge: {
        articles: ['文玩馆的品牌愿景', '我们如何筛选合作匠人', '文玩文化在当代的意义'],
        categories: [
          { name: '品牌动态', tag: '最新资讯' },
          { name: '媒体报道', tag: '权威声音' },
          { name: '社会公益', tag: '爱心传递' },
          { name: '人才招聘', tag: '加入我们' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '养护说明', 
      subtitle: '盘玩之道 · 岁月包浆',
      desc: '每一件文玩都有其独特的脾性。正确的养护，能让藏品在岁月的洗礼中焕发迷人光彩。',
      cta: '学习养护技巧',
      link: '/maintenance',
      material: '养护秘籍',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%85%BB%E6%8A%A4%E8%AF%B4%E6%98%8E.jpg',
      detailTitle: '盘的是棱角 · 磨的是心性',
      detailDesc: '文玩的魅力在于“变”。从最初的干涩到最终的红润透亮，每一个阶段都记录着您的耐心与情感。我们为您提供最专业的分类养护指导。',
      features: [
        { icon: <Wrench size={40} />, title: '日常保养', desc: '针对不同材质，提供温湿度控制、清洁除尘等基础建议。', link: '/maintenance', label: '查看指南' },
        { icon: <Layers size={40} />, title: '盘玩进阶', desc: '教你如何刷出红润感，如何避免阴皮、开裂等常见问题。', link: '/maintenance', label: '进阶学习' },
        { icon: <MessageCircle size={40} />, title: '专家咨询', desc: '遇到养护难题？资深藏家在线为您答疑解惑。', link: '/support', label: '立即咨询' }
      ],
      gallery: [
        { title: '包浆对比', sub: '见证岁月的华丽蜕变', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop' },
        { title: '养护工具', sub: '工欲善其事，必先利其器', img: 'https://images.unsplash.com/photo-1588444839799-eb6bd27e386a?q=80&w=800&auto=format&fit=crop' },
        { title: '清理细节', sub: '慢工出细活，细节见真章', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop' },
        { title: '存放环境', sub: '给藏品一个舒适的“家”', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '科学养护', content: '结合传统经验与现代科学，提供最稳妥的方案' },
        { icon: <Compass size={32} />, title: '分类指导', content: '针对木质、菩提、玉石提供差异化养护建议' },
        { icon: <Wrench size={32} />, title: '工具推荐', content: '严选高品质刷子、保养油、密封袋等周边' },
        { icon: <ArrowLeft size={32} />, title: '避坑指南', content: '总结千万藏友血泪教训，让你少走弯路' }
      ],
      knowledge: {
        articles: ['夏季盘玩金刚的注意事项', '小叶紫檀如何盘出玻璃底', '玉石佩戴的禁忌有哪些'],
        categories: [
          { name: '木质养护', tag: '防裂·防汗' },
          { name: '菩提养护', tag: '多刷·少盘' },
          { name: '玉石养护', tag: '常戴·温润' },
          { name: '杂项养护', tag: '避光·防潮' }
        ]
      },
      detailImage: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E8%80%81%E5%B1%B1%E6%AA%80%E9%A6%99%E6%89%8B%E4%B8%B2.jpg'
    },
    { 
      title: '售后保障', 
      subtitle: '雅物传世 · 售后无忧',
      desc: '我们承诺，每一件从文玩馆走出的藏品，都拥有终身的品质守护与专业服务。',
      cta: '查看保障计划',
      link: '/support',
      material: '服务承诺',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%94%AE%E5%90%8E%E4%BF%9D%E9%9A%9C.jpg',
      detailTitle: '诚信为本 · 尊享服务',
      detailDesc: '文玩馆建立了一套完善的售后服务体系，包括权威鉴定、终身维护、极速退换等，让您的每一次收藏都安心无忧。',
      features: [
        { icon: <ShieldCheck size={40} />, title: '正品保障', desc: '国家级鉴定证书，支持复检，假一赔十。', link: '/support', label: '了解保障' },
        { icon: <Wrench size={40} />, title: '终身维护', desc: '免费换绳、抛光、除尘，您的藏品我们管到底。', link: '/support', label: '查看服务' },
        { icon: <RotateCcw size={40} />, title: '无忧退换', desc: '七天无理由退换货，顺丰包邮，购物无忧。', link: '/support', label: '退换流程' }
      ],
      gallery: [
        { title: '鉴定证书', sub: '权威背书，真实可信', img: 'https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800&auto=format&fit=crop' },
        { title: '维护中心', sub: '专业设备，匠心修复', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?q=80&w=800&auto=format&fit=crop' },
        { title: '顺丰快递', sub: '极速送达，安全保障', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop' },
        { title: '雅友评价', sub: '口碑相传，值得信赖', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '权威认证', content: '与多家国家级鉴定机构达成长期战略合作' },
        { icon: <Compass size={32} />, title: '透明流程', content: '售后进度实时可查，每一个环节都清晰透明' },
        { icon: <Wrench size={32} />, title: '专业团队', content: '资深养护师团队，拥有十年以上行业经验' },
        { icon: <ArrowLeft size={32} />, title: '极速响应', content: '24小时在线客服，第一时间为您解决问题' }
      ],
      knowledge: {
        articles: ['如何在线查询鉴定证书', '售后退换货的具体流程', '终身维护包含哪些内容'],
        categories: [
          { name: '鉴定服务', tag: '权威·实时' },
          { name: '维护服务', tag: '专业·终身' },
          { name: '物流保障', tag: '顺丰·保价' },
          { name: '客户关怀', tag: '贴心·高效' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=1200&auto=format&fit=crop'
    },
    { 
      title: '雅集登录', 
      subtitle: '雅物待人 · 静候知音',
      desc: '加入文玩馆，开启您的雅致生活。在这里，每一件藏品都有故事，每一位雅友都是知音。',
      cta: '立即登录',
      link: '/login',
      material: '会员专属',
      image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E9%9B%85%E9%9B%86%E7%99%BB%E5%BD%95.jpg',
      detailTitle: '雅集登录 · 开启收藏之旅',
      detailDesc: '登录后，您可以享受专属会员折扣、一键查询鉴定证书、预约大师养护服务，并参与线下雅集沙龙。',
      features: [
        { icon: <ShieldCheck size={40} />, title: '专属权益', desc: '会员尊享折扣，新品优先选购权。', link: '/login', label: '了解权益' },
        { icon: <MessageCircle size={40} />, title: '雅友社区', desc: '与千万藏友在线交流，分享盘玩心得。', link: '/login', label: '进入社区' },
        { icon: <Zap size={40} />, title: '极速服务', desc: '一键报修，实时查看物流与维护进度。', link: '/login', label: '查看服务' }
      ],
      gallery: [
        { title: '会员活动', sub: '线下雅集，共赏雅物', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop' },
        { title: '专属礼遇', sub: '精美包装，会员专享', img: 'https://images.unsplash.com/photo-1588444839799-eb6bd27e386a?q=80&w=800&auto=format&fit=crop' },
        { title: '积分商城', sub: '好礼兑换，惊喜不断', img: 'https://images.unsplash.com/photo-1610505466023-90695034638d?q=80&w=800&auto=format&fit=crop' },
        { title: '等级特权', sub: '步步进阶，尊享不凡', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop' }
      ],
      advantages: [
        { icon: <ShieldCheck size={32} />, title: '安全保障', content: '多重加密技术，保障您的个人信息与交易安全' },
        { icon: <Compass size={32} />, title: '个性推荐', content: '根据您的喜好，为您精准推荐心仪藏品' },
        { icon: <Wrench size={32} />, title: '贴心管家', content: '专属雅管家，为您提供全方位的收藏建议' },
        { icon: <ArrowLeft size={32} />, title: '便捷操作', content: '简洁优雅的界面设计，让操作变得轻松愉悦' }
      ],
      knowledge: {
        articles: ['如何提升会员等级', '积分获取与使用规则', '雅集活动的参与方式'],
        categories: [
          { name: '账号安全', tag: '实名认证' },
          { name: '会员等级', tag: '成长体系' },
          { name: '积分系统', tag: '超值兑换' },
          { name: '雅集活动', tag: '线下聚会' }
        ]
      },
      detailImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?q=80&w=1200&auto=format&fit=crop'
    },
  ];


  useEffect(() => {
    // Pause rotation when scrolled
    if (isScrolled) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, isHovered ? 2000 : 10000);
    return () => clearInterval(interval);
  }, [sections.length, isHovered, isScrolled]);

  const activeSection = sections[activeIndex];

  return (
    <div className="relative min-h-screen bg-wenwan-ink overflow-x-hidden pt-24 md:pt-0">
      <InteractiveBackground />
      <CustomCursor />

      {/* Hero Section */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0 z-10"
      >
        {/* Dark Overlay on Scroll */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-[5] pointer-events-none"
        />
        {/* Background Section Title - Parallax */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={activeIndex + '-bg'}
              initial={{ opacity: 0, scale: 1.2, y: 100 }}
              animate={{ opacity: 0.05, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[25vw] font-serif font-black text-white whitespace-nowrap select-none"
              style={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
            >
              {activeSection.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        <RotatingShouchuan 
          activeIndex={activeIndex} 
          beads={sections} 
          onBeadClick={(index) => {
            setActiveIndex(index);
            // Scroll down slightly to indicate the content below has changed, or just let them see the hero change
            // window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          onHoverChange={(hovered) => setIsHovered(hovered)}
        />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center px-12 lg:pl-[28.125rem]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-7xl text-center lg:text-left space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-block border border-wenwan-gold/40 px-8 py-3 text-wenwan-gold tracking-[0.6em] text-base mb-6 bg-wenwan-gold/5 backdrop-blur-sm"
              >
                {activeSection.subtitle}
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] font-serif leading-tight text-white drop-shadow-2xl">
                {activeIndex === 0 ? "文玩馆 —— 静心·雅趣·传承" : activeSection.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto lg:mx-0 font-serif italic leading-relaxed">
                “{activeSection.desc}”
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-10 pt-16"
              >
                <Link to={activeSection.link} className="group relative overflow-hidden bg-wenwan-gold text-wenwan-ink px-16 py-6 rounded-sm font-bold transition-all tracking-[0.3em] text-lg btn-neumorphic hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                  <span className="relative z-10">{activeSection.cta} →</span>
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ opacity: 0.3 }}
                  />
                </Link>
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="bg-transparent border border-white/30 px-16 py-6 rounded-sm font-bold text-white hover:bg-white/10 hover:border-white/60 transition-all tracking-[0.3em] text-lg"
                >
                  向下探索
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] text-white/30 font-serif tracking-[0.5em] uppercase">向下滚动探索</span>
          <div className="w-px h-12 bg-gradient-to-b from-wenwan-gold to-transparent" />
        </motion.div>
      </motion.section>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Dynamic Content Based on Active Index */}
          {activeIndex === 0 && <DefaultHomeLayout section={activeSection} />}
          {activeIndex === 1 && <MaterialLayout section={activeSection} />}
          {activeIndex === 2 && <MaterialLayout section={activeSection} />}
          {activeIndex === 3 && <MaterialLayout section={activeSection} />}
          {activeIndex === 4 && <CustomizationLayout section={activeSection} />}
          {activeIndex === 5 && <CraftsmanshipLayout section={activeSection} />}
          {activeIndex === 6 && <ServiceLayout section={activeSection} />}
          {activeIndex === 7 && <ServiceLayout section={activeSection} />}
          {activeIndex === 8 && <LoginLayout section={activeSection} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const globalProducts = [
  { id: 1, title: '满金星小叶紫檀', category: '木质类', price: '¥2,980', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%BB%A1%E9%87%91%E6%98%9F%E5%B0%8F%E5%8F%B6%E7%B4%AB%E6%AA%80.jpg', desc: '选自印度南部老料，油性十足，金星璀璨。', specs: ['材质：小叶紫檀', '规格：20mm*12颗', '产地：印度'] },
  { id: 2, title: '和田羊脂玉挂件', category: '玉石类', price: '¥12,800', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%92%8C%E7%94%B0%E7%BE%8A%E8%84%82%E7%8E%89%E6%8C%82%E4%BB%B6.jpg', desc: '温润如脂，洁白无瑕，苏工名家雕刻。', specs: ['材质：和田玉', '重量：35g', '产地：新疆'] },
  { id: 3, title: '五瓣金刚菩提', category: '菩提类', price: '¥880', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E4%BA%94%E7%93%A3%E9%87%91%E5%88%9A%E8%8F%A9%E6%8F%90.jpg', desc: '尼泊尔高山原籽，肉质饱满，桩型端正。', specs: ['材质：金刚菩提', '规格：22mm*13颗', '产地：尼泊尔'] },
  { id: 4, title: '海黄蜘蛛纹手串', category: '木质类', price: '¥8,500', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%B5%B7%E9%BB%84%E8%9C%98%E8%9B%9B%E7%BA%B9%E6%89%8B%E4%B8%B2.jpg', desc: '海南黄花梨油梨老料，纹理奇特，如梦如幻。', specs: ['材质：海南黄花梨', '规格：18mm*13颗', '产地：海南'] },
  { id: 5, title: '南红玛瑙手镯', category: '玉石类', price: '¥5,600', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%8D%97%E7%BA%A2%E7%8E%9B%E7%91%99%E6%89%8B%E9%95%AF.jpg', desc: '凉山南红，满肉满色，柿子红润。', specs: ['材质：南红玛瑙', '内径：56mm', '产地：四川'] },
  { id: 6, title: '星月菩提108颗', category: '菩提类', price: '¥1,280', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%98%9F%E6%9C%88%E8%8F%A9%E6%8F%90108%E9%A2%97.jpg', desc: '海南毛感料，正月顺白，瓷感十足。', specs: ['材质：星月菩提', '规格：8*7mm', '产地：海南'] },
  { id: 7, title: '老山檀香手串', category: '木质类', price: '¥1,580', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E8%80%81%E5%B1%B1%E6%AA%80%E9%A6%99%E6%89%8B%E4%B8%B2.jpg', desc: '印度迈索尔老料，奶香醇厚，油脂丰富。', specs: ['材质：老山檀香', '规格：15mm*15颗', '产地：印度'] },
  { id: 8, title: '绿松石三通套装', category: '玉石类', price: '¥3,200', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E7%BB%BF%E6%9D%BE%E7%9F%B3%E4%B8%89%E9%80%9A%E5%A5%97%E8%A3%85.jpg', desc: '湖北十堰高瓷蓝，无优化，瓷感极佳。', specs: ['材质：绿松石', '规格：20mm', '产地：湖北'] },
  { id: 9, title: '凤眼菩提手持', category: '菩提类', price: '¥2,100', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%87%A4%E7%9C%BC%E8%8F%A9%E6%8F%90%E6%89%8B%E6%8C%81.jpg', desc: '尼泊尔原籽，眼正皮厚，包浆红润。', specs: ['材质：凤眼菩提', '规格：14mm*18颗', '产地：尼泊尔'] },
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filter, setFilter] = useState('全部');

  const categories = ['全部', '木质类', '玉石类', '菩提类', '杂项类'];
  
  const filteredProducts = filter === '全部' ? globalProducts : globalProducts.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 bg-wenwan-paper min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 font-serif tracking-widest text-wenwan-ink"
          >
            文玩品鉴
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-wenwan-gray max-w-2xl mx-auto font-serif"
          >
            高清图集 + 专业解读，带你读懂每一件文玩的独特之美
          </motion.p>
        </div>

        {/* Master Art Section */}
        <TiltCard className="mb-24">
          <div className="p-12 bg-wenwan-ink text-white rounded-sm relative overflow-hidden shadow-2xl border border-white/10 group">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8" style={{ translateZ: 50 }}>
                <span className="text-wenwan-gold font-bold tracking-[0.4em] text-sm uppercase">匠心之作 · 名家品鉴</span>
                <h2 className="text-4xl font-bold font-serif leading-tight">苏工名家：林海<br />《瑞兽纳福》和田玉雕</h2>
                <p className="text-white/60 font-serif text-lg leading-loose italic">
                  “玉不琢，不成器”。此件作品选自新疆和田籽料，质地温润如脂。林海大师采用苏工传统圆雕技法，瑞兽神态威严而不失灵动，线条流畅，寓意吉祥。
                </p>
                <button className="group relative overflow-hidden bg-wenwan-gold text-white px-10 py-3 rounded-sm font-bold transition-all tracking-widest btn-neumorphic hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="relative z-10">了解更多名家作品</span>
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{ opacity: 0.2 }}
                  />
                </button>
              </div>
              <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl" style={{ translateZ: 100 }}>
                <img 
                  src="https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E3%80%8A%E7%91%9E%E5%85%BD%E7%BA%B3%E7%A6%8F%E3%80%8B%E5%92%8C%E7%94%B0%E7%8E%89%E9%9B%95.jpg" 
                  alt="Masterpiece" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </TiltCard>

        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-8 py-2 rounded-full border transition-all whitespace-nowrap font-serif",
                filter === cat 
                  ? "bg-wenwan-gold border-wenwan-gold text-white shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                  : "border-wenwan-gray/20 text-wenwan-gray hover:border-wenwan-gold hover:text-wenwan-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={product.id}
                className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all border border-wenwan-paper-dark"
                onClick={() => setSelectedProduct(product)}
              >
                <TiltCard>
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-wenwan-ink px-6 py-2 rounded-sm font-serif tracking-widest btn-neumorphic">查看详情</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold font-serif text-wenwan-ink">{product.title}</h3>
                      <span className="text-wenwan-gold font-bold">{product.price}</span>
                    </div>
                    <p className="text-wenwan-gray text-sm font-serif line-clamp-2">{product.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-wenwan-ink/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-wenwan-paper max-w-5xl w-full max-h-[90vh] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 aspect-square md:aspect-auto shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-12 relative flex flex-col overflow-y-auto">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-wenwan-gray hover:text-wenwan-ink transition-colors z-10 bg-white/50 md:bg-transparent rounded-full p-1 backdrop-blur-sm md:backdrop-blur-none"
                >
                  <X size={32} />
                </button>
                <div className="flex-grow mt-8 md:mt-0">
                  <span className="text-wenwan-gold font-bold tracking-widest text-sm mb-4 block uppercase">{selectedProduct.category}</span>
                  <h2 className="text-4xl font-bold mb-6 font-serif text-wenwan-ink">{selectedProduct.title}</h2>
                  <p className="text-wenwan-gray text-lg mb-8 font-serif leading-relaxed">{selectedProduct.desc}</p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-wenwan-ink font-serif tracking-widest border-b border-wenwan-gold/20 pb-2">参数详情</h4>
                    <ul className="grid grid-cols-2 gap-4">
                      {selectedProduct.specs.map((spec: string, i: number) => (
                        <li key={i} className="text-wenwan-gray font-serif text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-wenwan-gold" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-wenwan-ink font-serif tracking-widest border-b border-wenwan-gold/20 pb-2">文化内涵</h4>
                    <p className="text-wenwan-gray font-serif text-sm leading-relaxed italic">
                      “石之美者，温润如玉”。此件藏品不仅是自然的馈赠，更承载着深厚的东方美学与禅意。盘玩之间，感受岁月的包浆与心境的沉淀。
                    </p>
                  </div>

                  <div className="p-4 bg-wenwan-gold/5 rounded-sm border border-wenwan-gold/10 mb-8">
                    <h4 className="text-wenwan-gold font-bold font-serif text-xs tracking-widest mb-2 uppercase">专家点评</h4>
                    <p className="text-wenwan-ink font-serif text-sm italic leading-relaxed">
                      “该品相极佳，油性密度均属上乘。特别是其纹理自然流畅，具备极高的收藏与升值空间。” —— 资深鉴藏家 · 王老师
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-grow bg-wenwan-gold text-white py-4 rounded-sm font-bold hover:bg-wenwan-gold-dark transition-all tracking-widest btn-neumorphic">
                    立即咨询
                  </button>
                  <button className="px-6 border border-wenwan-gold text-wenwan-gold py-4 rounded-sm font-bold hover:bg-wenwan-gold hover:text-white transition-all">
                    <ShoppingBag size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Categories = () => {
  const [activeTab, setActiveTab] = useState('木质类');

  const categories = [
    {
      id: '木质类',
      title: '名木系列',
      desc: '紫檀、黄花梨、沉香。木质温润，香气袭人，是文玩收藏的不二之选。',
      materials: [
        { name: '小叶紫檀', origin: '印度', feature: '牛毛纹、金星', value: '木中之王' },
        { name: '黄花梨', origin: '海南', feature: '鬼脸纹、行云流水', value: '木中皇后' },
        { name: '沉香', origin: '东南亚', feature: '油脂丰富、香韵持久', value: '众香之首' },
        { name: '老山檀香', origin: '印度', feature: '香气醇厚、细腻', value: '香中之王' }
      ],
      img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%90%8D%E6%9C%A8%E7%B3%BB%E5%88%97.jpg'
    },
    {
      id: '玉石类',
      title: '玉石系列',
      desc: '和田玉、南红、绿松石。石之美者，温润如玉，点缀指尖的灵动。',
      materials: [
        { name: '和田玉', origin: '新疆', feature: '温润细腻、油脂感强', value: '国玉之魂' },
        { name: '南红', origin: '四川/云南', feature: '色泽艳丽、质地坚韧', value: '赤玉之精' },
        { name: '绿松石', origin: '湖北', feature: '瓷感十足、颜色纯正', value: '东方神石' },
        { name: '翡翠', origin: '缅甸', feature: '翠性明显、种水通透', value: '玉中之王' }
      ],
      img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E7%8E%89%E7%9F%B3%E7%B3%BB%E5%88%97.jpg'
    },
    {
      id: '菩提类',
      title: '菩提系列',
      desc: '星月、金刚、凤眼。在盘玩中见证色彩与质地的蜕变，感悟禅意。',
      materials: [
        { name: '金刚菩提', origin: '尼泊尔', feature: '纹路深邃、桩型端正', value: '力量象征' },
        { name: '星月菩提', origin: '海南', feature: '正月顺白、瓷感极佳', value: '禅意之选' },
        { name: '凤眼菩提', origin: '尼泊尔', feature: '眼型端正、皮质红润', value: '修行必备' },
        { name: '莲花菩提', origin: '尼泊尔', feature: '纹理如莲、稀有珍贵', value: '菩提之冠' }
      ],
      img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E8%8F%A9%E6%8F%90%E7%B3%BB%E5%88%97.jpg'
    },
    {
      id: '杂项类',
      title: '奇珍系列',
      desc: '琥珀、蜜蜡、绿松石。大自然的鬼斧神工，历经千万年的沉淀。',
      materials: [
        { name: '蜜蜡', origin: '波罗的海', feature: '质地温润、色泽金黄', value: '中医五宝' },
        { name: '绿松石', origin: '湖北', feature: '瓷感十足、颜色纯正', value: '东方神石' },
        { name: '南红玛瑙', origin: '四川', feature: '满肉满色、质地坚韧', value: '赤玉瑰宝' },
        { name: '琥珀', origin: '波罗的海', feature: '质地轻盈、色泽通透', value: '时光凝结' }
      ],
      img: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%A5%87%E7%8F%8D%E7%B3%BB%E5%88%97.jpg'
    }
  ];

  const comparisonData = [
    { name: '小叶紫檀', density: '1.05-1.26', oil: '极高', hardness: '高', feature: '牛毛纹、金星' },
    { name: '海南黄花梨', density: '0.82-0.94', oil: '高', hardness: '中', feature: '鬼脸纹、降香味' },
    { name: '和田玉', density: '2.95-3.17', oil: '温润', hardness: '6.0-6.5', feature: '油脂光泽' },
    { name: '翡翠', density: '3.30-3.36', oil: '玻璃光泽', hardness: '6.5-7.0', feature: '翠性、种水' },
    { name: '金刚菩提', density: '沉水级', oil: '中', hardness: '高', feature: '肉纹、桩型' },
    { name: '蜜蜡', density: '1.05-1.10', oil: '中', hardness: '低', feature: '质地温润、色泽金黄' },
  ];

  const currentCat = categories.find(c => c.id === activeTab)!;

  return (
    <div className="pt-32 pb-20 px-6 bg-wenwan-paper min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 font-serif tracking-widest text-wenwan-ink"
          >
            材质分类
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-wenwan-gray max-w-2xl mx-auto font-serif"
          >
            深入了解各类材质的起源、特征与收藏价值
          </motion.p>
        </div>

        <div className="flex justify-center gap-8 mb-16 border-b border-wenwan-gold/20">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "pb-4 px-4 text-xl font-serif tracking-widest transition-all relative",
                activeTab === cat.id ? "text-wenwan-gold font-bold" : "text-wenwan-gray hover:text-wenwan-ink"
              )}
            >
              {cat.id}
              {activeTab === cat.id && (
                <motion.div layoutId="cat-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-wenwan-gold" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          >
            <TiltCard>
              <div className="rounded-sm overflow-hidden shadow-2xl aspect-[4/3] border border-wenwan-paper-dark group">
                <img 
                  src={currentCat.img} 
                  alt={currentCat.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wenwan-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </TiltCard>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold font-serif text-wenwan-ink mb-4">{currentCat.title}</h2>
                <p className="text-wenwan-gray text-lg font-serif leading-relaxed italic">{currentCat.desc}</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold font-serif text-wenwan-ink border-l-4 border-wenwan-gold pl-4">核心品类</h4>
                <div className="grid grid-cols-1 gap-4">
                  {currentCat.materials.map((m, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-sm border border-wenwan-paper-dark hover:border-wenwan-gold transition-colors group shadow-sm hover:shadow-md"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xl font-bold font-serif text-wenwan-ink group-hover:text-wenwan-gold transition-colors">{m.name}</span>
                        <span className="text-xs bg-wenwan-gold/10 text-wenwan-gold px-3 py-1 rounded-full font-serif">{m.value}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm font-serif">
                        <p className="text-wenwan-gray"><span className="text-wenwan-ink font-bold">产地：</span>{m.origin}</p>
                        <p className="text-wenwan-gray"><span className="text-wenwan-ink font-bold">特征：</span>{m.feature}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button className="group relative overflow-hidden w-full py-4 bg-wenwan-ink text-white rounded-sm font-bold font-serif tracking-[0.5em] transition-all hover:shadow-xl btn-neumorphic-dark">
                <span className="relative z-10">查看完整图鉴</span>
                <motion.div 
                  className="absolute inset-0 bg-wenwan-gold"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ opacity: 0.9 }}
                />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-32"
        >
          <h3 className="text-3xl font-bold font-serif text-wenwan-ink mb-12 text-center tracking-widest">材质参数对比</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-serif">
              <thead>
                <tr className="bg-wenwan-ink text-white">
                  <th className="p-4 text-left border border-white/10">材质名称</th>
                  <th className="p-4 text-left border border-white/10">密度 (g/cm³)</th>
                  <th className="p-4 text-left border border-white/10">油性/光泽</th>
                  <th className="p-4 text-left border border-white/10">硬度 (莫氏)</th>
                  <th className="p-4 text-left border border-white/10">核心特征</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-wenwan-gold/5 transition-colors">
                    <td className="p-4 border border-wenwan-paper-dark font-bold text-wenwan-ink">{row.name}</td>
                    <td className="p-4 border border-wenwan-paper-dark text-wenwan-gray">{row.density}</td>
                    <td className="p-4 border border-wenwan-paper-dark text-wenwan-gray">{row.oil}</td>
                    <td className="p-4 border border-wenwan-paper-dark text-wenwan-gray">{row.hardness}</td>
                    <td className="p-4 border border-wenwan-paper-dark text-wenwan-gray">{row.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Mall = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [cart, setCart] = useState<{id: number, name: string, price: number, image: string, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = ['全部', '手串', '把件', '配饰', '香道', '礼盒'];
  
  const products = [
    { id: 1, name: '小叶紫檀金星手串', price: 1980, category: '手串', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%B0%8F%E5%8F%B6%E7%B4%AB%E6%AA%80%E9%87%91%E6%98%9F%E6%89%8B%E4%B8%B2.jpg', isSale: true, oldPrice: 2580, desc: '印度老料，金星璀璨。' },
    { id: 2, name: '和田玉瑞兽把件', price: 8800, category: '把件', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%92%8C%E7%94%B0%E7%8E%89%E7%91%9E%E5%85%BD%E6%8A%8A%E4%BB%B6.jpg', desc: '温润如脂，名家雕刻。' },
    { id: 3, name: '绿松石顶珠', price: 560, category: '配饰', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E7%BB%BF%E6%9D%BE%E7%9F%B3%E9%A1%B6%E7%8F%A0.jpg', desc: '高瓷蓝，无优化。' },
    { id: 4, name: '沉香线香礼盒', price: 320, category: '香道', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%B2%89%E9%A6%99%E7%BA%BF%E9%A6%99%E7%A4%BC%E7%9B%92.jpg', isSale: true, oldPrice: 450, desc: '天然沉香，静气凝神。' },
    { id: 5, name: '金刚菩提六瓣', price: 1200, category: '手串', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E9%87%91%E5%88%9A%E8%8F%A9%E6%8F%90%E5%85%AD%E7%93%A3.jpg', desc: '尼泊尔原籽，肉质饱满。' },
    { id: 6, name: '文房四宝套装', price: 1580, category: '礼盒', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%96%87%E6%88%BF%E5%9B%9B%E5%AE%9D%E5%A5%97%E8%A3%85.jpg', desc: '宣纸徽墨，书画必备。' },
    { id: 7, name: '南红玛瑙背云', price: 450, category: '配饰', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E5%8D%97%E7%BA%A2%E7%8E%9B%E7%91%99%E8%83%8C%E4%BA%91.jpg', desc: '柿子红，满肉满色。' },
    { id: 8, name: '老山檀香卧香', price: 280, category: '香道', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E8%80%81%E5%B1%B1%E6%AA%80%E9%A6%99%E5%8D%A7%E9%A6%99.jpg', desc: '迈索尔老料，奶香浓郁。' },
    { id: 9, name: '星月菩提正月', price: 980, category: '手串', image: 'https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/main/%E6%98%9F%E6%9C%88%E8%8F%A9%E6%8F%90%E6%AD%A3%E6%9C%88.jpg', isSale: true, oldPrice: 1280, desc: '海南毛感料，顺白正月。' },
  ];

  const filteredProducts = products.filter(p => 
    (activeCategory === '全部' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity: 1}];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-32 pb-20 px-6 bg-wenwan-paper min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Search & Filter Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="flex w-full lg:w-auto items-center gap-4">
            <div className="relative flex-1 lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-wenwan-gray group-focus-within:text-wenwan-gold transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜索心仪藏品..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif transition-all bg-white/50 backdrop-blur-sm focus:bg-white focus:shadow-lg"
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-wenwan-ink text-white rounded-full hover:bg-wenwan-gold transition-all shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] btn-neumorphic-dark shrink-0 lg:hidden"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-wenwan-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </motion.span>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-8 w-full lg:w-auto overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4 w-full lg:w-auto justify-start [&::-webkit-scrollbar]:hidden snap-x">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full border transition-all whitespace-nowrap font-serif text-sm snap-start",
                    activeCategory === cat 
                      ? "bg-wenwan-ink border-wenwan-ink text-white shadow-lg" 
                      : "border-wenwan-paper-dark text-wenwan-gray hover:border-wenwan-gold hover:text-wenwan-gold"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-wenwan-ink text-white rounded-full hover:bg-wenwan-gold transition-all shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] btn-neumorphic-dark shrink-0 hidden lg:block"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-wenwan-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Promotional Banner */}
        <TiltCard className="mb-16">
          <div className="relative h-64 rounded-sm overflow-hidden group shadow-2xl border border-wenwan-paper-dark">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?q=80&w=1200&auto=format&fit=crop" 
              alt="Promotion" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-wenwan-ink/80 to-transparent flex flex-col justify-center px-12">
              <span className="text-wenwan-gold font-bold tracking-[0.3em] mb-2 uppercase">春季雅集 · 限时特惠</span>
              <h2 className="text-4xl font-bold text-white font-serif mb-4">满 ¥2000 赠精美配饰</h2>
              <button className="bg-white text-wenwan-ink px-8 py-2 rounded-sm font-bold w-fit hover:bg-wenwan-gold hover:text-white transition-all shadow-lg btn-neumorphic">
                立即选购
              </button>
            </div>
          </div>
        </TiltCard>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={product.id}
                className="bg-white rounded-sm overflow-hidden border border-wenwan-paper-dark hover:shadow-2xl transition-all group"
              >
                <TiltCard>
                  <div className="aspect-square relative overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.isSale && (
                      <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-wenwan-red text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm shadow-md">特惠</span>
                    )}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 translate-y-12 group-hover:translate-y-0 transition-transform flex gap-1 sm:gap-2">
                      <button className="p-2 sm:p-3 bg-white text-wenwan-ink rounded-full shadow-lg hover:bg-wenwan-gold hover:text-white transition-all btn-neumorphic">
                        <Heart size={16} className="sm:w-5 sm:h-5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="p-2 sm:p-3 bg-wenwan-gold text-white rounded-full shadow-lg hover:bg-wenwan-ink transition-all btn-neumorphic"
                      >
                        <ShoppingBag size={16} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-6 bg-white relative z-10">
                    <span className="text-[10px] sm:text-xs text-wenwan-gray font-serif mb-1 block">{product.category}</span>
                    <h3 className="text-sm sm:text-xl font-bold font-serif text-wenwan-ink mb-1 sm:mb-3 group-hover:text-wenwan-gold transition-colors truncate">{product.name}</h3>
                    <div className="flex items-center gap-1 sm:gap-3 flex-wrap">
                      <span className="text-base sm:text-2xl font-bold text-wenwan-gold">¥{product.price}</span>
                      {product.isSale && (
                        <span className="text-[10px] sm:text-sm text-wenwan-gray line-through">¥{product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-wenwan-gray font-serif text-xl">未找到相关藏品，换个关键词试试吧</p>
          </motion.div>
        )}
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-wenwan-paper z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-wenwan-paper-dark flex justify-between items-center">
                <h3 className="text-2xl font-bold font-serif text-wenwan-ink">我的雅集</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-wenwan-gray hover:text-wenwan-ink">
                  <X size={32} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-wenwan-gray space-y-4">
                    <ShoppingBag size={64} className="opacity-20" />
                    <p className="font-serif">雅集空空如也，快去选购吧</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-sm overflow-hidden border border-wenwan-paper-dark">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold font-serif text-wenwan-ink">{item.name}</h4>
                        <p className="text-wenwan-gold font-bold">¥{item.price} x {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-wenwan-red hover:bg-wenwan-red/10 p-2 rounded-full transition-all">
                        <X size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-8 border-t border-wenwan-paper-dark space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-wenwan-gray font-serif">合计金额</span>
                    <span className="text-3xl font-bold text-wenwan-gold">¥{totalAmount}</span>
                  </div>
                  <button className="w-full py-4 bg-wenwan-ink text-white rounded-sm font-bold font-serif tracking-[0.5em] hover:bg-wenwan-gold transition-all shadow-xl btn-neumorphic-dark">
                    去结算
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-wenwan-ink/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-wenwan-paper max-w-4xl w-full max-h-[90vh] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 aspect-square md:aspect-auto shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-6 md:p-12 relative flex flex-col overflow-y-auto">
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-wenwan-gray hover:text-wenwan-ink transition-colors z-10 bg-white/50 md:bg-transparent rounded-full p-1 backdrop-blur-sm md:backdrop-blur-none"
                >
                  <X size={32} />
                </button>
                <div className="flex-grow space-y-6 mt-8 md:mt-0">
                  <span className="text-wenwan-gold font-bold tracking-widest text-sm uppercase">{selectedProduct.category}</span>
                  <h2 className="text-4xl font-bold font-serif text-wenwan-ink">{selectedProduct.name}</h2>
                  <p className="text-wenwan-gray text-lg font-serif leading-relaxed italic">{selectedProduct.desc}</p>
                  <div className="text-3xl font-bold text-wenwan-gold">¥{selectedProduct.price}</div>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-4 bg-wenwan-ink text-white rounded-sm font-bold font-serif tracking-[0.5em] hover:bg-wenwan-gold transition-all btn-neumorphic-dark"
                >
                  加入雅集
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Maintenance = () => {
  const [activeCategory, setActiveCategory] = useState('木质类');

  const maintenanceData = [
    {
      category: '木质类',
      tips: [
        { title: '忌水忌汗', content: '木质手串最忌水分和汗液。水分会导致木材膨胀变形，汗液中的酸碱成分会腐蚀木质，使其失去光泽。' },
        { title: '净手盘玩', content: '盘玩前务必洗净双手并擦干。建议佩戴纯棉手套盘玩，直到珠体表面形成一层薄薄的包浆。' },
        { title: '防风防晒', content: '避免阳光直射和强风吹袭，防止木材失水开裂。不佩戴时应放入密封袋保存。' },
        { title: '定期上油', content: '对于较干的木质，可少量涂抹核桃油，但切忌过量，以免堵塞毛孔。' }
      ]
    },
    {
      category: '菩提类',
      tips: [
        { title: '多盘多刷', content: '菩提类藏品需要经常盘玩和刷拭。刷拭可以清理缝隙污垢，同时起到抛光作用。' },
        { title: '防潮防霉', content: '菩提子是植物种子，环境潮湿易发霉。若不慎受潮，应及时用干布擦干并自然阴干。' },
        { title: '避免温差', content: '剧烈的温度变化会导致菩提子开裂。冬季进入暖气房时需格外注意。' },
        { title: '忌油腻', content: '菩提子多为天然植物，忌接触油脂，否则易变色不均或发黑。' }
      ]
    },
    {
      category: '玉石类',
      tips: [
        { title: '常佩常戴', content: '“人养玉，玉养人”。长期佩戴可以让玉石吸收人体油脂，变得更加温润。' },
        { title: '忌碰忌撞', content: '玉石虽然硬度高，但脆性大。剧烈碰撞可能产生内裂，影响价值。' },
        { title: '远离化学品', content: '香水、洗洁精等化学品会损伤玉石表面的光泽。' },
        { title: '定期清洗', content: '可用软毛刷蘸清水轻轻刷洗，去除表面灰尘，保持光泽。' }
      ]
    },
    {
      category: '琥珀蜜蜡',
      tips: [
        { title: '避免高温', content: '琥珀蜜蜡熔点低，切忌靠近热源，否则会导致变形或熔化。' },
        { title: '防划伤', content: '硬度较低，易被硬物划伤，佩戴时应避免与金属饰品摩擦。' },
        { title: '温水清洗', content: '可用温水加少量中性洗涤剂清洗，随后用软布擦干。' }
      ]
    }
  ];

  const currentTips = maintenanceData.find(d => d.category === activeCategory)?.tips || [];

  return (
    <div className="pt-32 pb-20 px-6 bg-wenwan-paper min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 font-serif tracking-widest text-wenwan-ink"
          >
            养护指南
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-wenwan-gray max-w-2xl mx-auto font-serif italic"
          >
            “三分选，七分养”，正确的养护是文玩升值的关键
          </motion.p>
        </div>

        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {maintenanceData.map(d => (
            <button
              key={d.category}
              onClick={() => setActiveCategory(d.category)}
              className={cn(
                "px-8 py-2 rounded-sm border transition-all font-serif whitespace-nowrap",
                activeCategory === d.category 
                  ? "bg-wenwan-ink border-wenwan-ink text-white shadow-lg" 
                  : "border-wenwan-paper-dark text-wenwan-gray hover:border-wenwan-gold hover:text-wenwan-gold"
              )}
            >
              {d.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {currentTips.map((tip, i) => (
              <TiltCard key={i}>
                <div className="bg-white p-8 rounded-sm border border-wenwan-paper-dark shadow-sm hover:shadow-xl transition-all h-full group">
                  <div className="w-12 h-12 bg-wenwan-gold/10 rounded-full flex items-center justify-center text-wenwan-gold mb-6 group-hover:bg-wenwan-gold group-hover:text-white transition-all">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-wenwan-ink mb-4 group-hover:text-wenwan-gold transition-colors">{tip.title}</h3>
                  <p className="text-wenwan-gray font-serif leading-relaxed text-sm italic">{tip.content}</p>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>

        <TiltCard>
          <div className="bg-wenwan-ink text-white p-12 rounded-sm relative overflow-hidden shadow-2xl border border-white/10 group">
            <div className="relative z-10 max-w-2xl" style={{ translateZ: 50 }}>
              <h2 className="text-3xl font-bold font-serif mb-6 tracking-widest">专家在线咨询</h2>
              <p className="text-white/60 font-serif mb-8 leading-relaxed">
                您的藏品出现了开裂、发黑或失去光泽？别担心，我们的专业养护师在线为您提供一对一的指导建议。
              </p>
              <button className="group relative overflow-hidden bg-wenwan-gold text-white px-10 py-3 rounded-sm font-bold transition-all tracking-widest btn-neumorphic hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <span className="relative z-10">立即咨询</span>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  style={{ opacity: 0.2 }}
                />
              </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] opacity-10 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12">
              <Flower2 size={300} />
            </div>
          </div>
        </TiltCard>

        <div className="mt-20">
          <h3 className="text-2xl font-bold font-serif text-wenwan-ink mb-8 text-center">养护月历</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { month: '春季 (3-5月)', tip: '防潮防霉，注意通风。' },
              { month: '夏季 (6-8月)', tip: '忌大汗，勤擦拭。' },
              { month: '秋季 (9-11月)', tip: '防风防裂，注意补水。' },
              { month: '冬季 (12-2月)', tip: '防冻防裂，远离暖气。' }
            ].map((item, i) => (
              <div key={i} className="bg-wenwan-gold/5 p-6 rounded-sm border border-wenwan-gold/10 text-center">
                <h4 className="font-bold font-serif text-wenwan-gold mb-2">{item.month}</h4>
                <p className="text-wenwan-gray text-xs font-serif">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold font-serif text-wenwan-ink mb-8 text-center">常见问题 FAQ</h3>
          <div className="space-y-4">
            {[
              { q: '新买的手串可以直接上手盘吗？', a: '建议先用纯棉手套盘玩1-2周，待表面形成初步包浆后再尝试上手，这样可以避免汗液直接渗入导致珠体发黑。' },
              { q: '手串不小心沾水了怎么办？', a: '应立即用干毛巾吸干水分，然后放入密封袋中自然阴干。千万不要用吹风机吹干或放在阳光下暴晒。' },
              { q: '如何判断手串是否已经“包浆”？', a: '包浆后的手串表面会有一层如玉般的温润光泽，触感更加顺滑，颜色也会变得更加深邃沉稳。' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-sm border border-wenwan-paper-dark">
                <h4 className="font-bold font-serif text-wenwan-ink mb-2 flex items-center gap-2">
                  <span className="text-wenwan-gold">Q:</span> {faq.q}
                </h4>
                <p className="text-wenwan-gray text-sm font-serif pl-6 leading-relaxed">
                  <span className="text-wenwan-ink font-bold">A:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const guarantees = [
    { icon: <ShieldCheck size={40} />, title: '正品保障', desc: '每一件藏品均附带权威机构鉴定证书，支持全国复检，假一赔十。' },
    { icon: <Wrench size={40} />, title: '终身维护', desc: '免费提供换绳、抛光、除尘等基础维护服务，让您的藏品历久弥新。' },
    { icon: <RotateCcw size={40} />, title: '七天无理由', desc: '在不影响二次销售的前提下，支持七天无理由退换货，购物无忧。' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-wenwan-paper min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Brand Story Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-wenwan-gold font-bold tracking-[0.4em] text-sm uppercase border-b-2 border-wenwan-gold pb-2 inline-block">
                关于我们 · 品牌故事
              </h2>
              <h3 className="text-5xl font-bold font-serif text-wenwan-ink leading-tight">
                传承东方美学<br />弘扬匠人精神
              </h3>
              <div className="space-y-6 text-wenwan-gray text-lg font-serif leading-loose italic">
                <p>
                  文玩馆创立于2018年，源于一群文玩爱好者对传统文化的痴迷。我们深知，真正的文玩不是冰冷的商品，而是承载了岁月、情感与审美的雅物。
                </p>
                <p>
                  我们走遍名山大川，深入原产地，只为寻找那一块温润的玉、那一根油性十足的木、那一颗桩型端正的菩提。我们与多位非遗传承人深度合作，记录匠人故事，让传统工艺在现代生活中焕发新生。
                </p>
                <p>
                  在这里，我们不仅提供高品质的藏品，更致力于打造一个专业、有温度的文玩文化社区。让每一位雅友都能在盘玩中寻得内心的宁静。
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-sm overflow-hidden shadow-2xl aspect-[4/5]">
                <img 
                  src="https://raw.githubusercontent.com/wengzhenjie6-cpu/wenwang/1962cfa7f7ba4d73f6820cf7a5271d94f4d393f6/%E4%B8%9C%E6%96%B9%E7%BE%8E%E5%AD%A6.jpg" 
                  alt="Brand Story" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-wenwan-ink text-white p-10 rounded-sm shadow-2xl hidden md:block">
                <p className="text-3xl font-bold font-serif mb-2">2018</p>
                <p className="text-wenwan-gold font-serif tracking-widest text-sm">品牌创立于北京</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 font-serif tracking-widest text-wenwan-ink">售后服务</h1>
          <p className="text-wenwan-gray max-w-2xl mx-auto font-serif">全方位的售后保障，为您解决后顾之忧</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {guarantees.map((g, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="bg-white p-10 rounded-sm border border-wenwan-paper-dark text-center space-y-6 hover:shadow-xl transition-all"
            >
              <div className="text-wenwan-gold flex justify-center">{g.icon}</div>
              <h3 className="text-2xl font-bold font-serif text-wenwan-ink">{g.title}</h3>
              <p className="text-wenwan-gray font-serif text-sm leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <ScrollFloat as="h2" containerClassName="text-3xl font-bold font-serif text-wenwan-ink tracking-widest border-b border-wenwan-gold/20 pb-4">
              服务流程
            </ScrollFloat>
            <div className="space-y-8">
              {[
                { step: '01', title: '在线申请', desc: '联系在线客服或提交售后表单，描述您的问题。' },
                { step: '02', title: '寄回藏品', desc: '将藏品妥善包装后寄回我们的专业维护中心。' },
                { step: '03', title: '专业评估', desc: '养护师收到后进行全面检查，并给出处理方案。' },
                { step: '04', title: '完成寄回', desc: '维护完成后，我们将通过顺丰快递寄回您的手中。' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-4xl font-bold text-wenwan-gold/20 font-serif">{item.step}</span>
                  <div>
                    <h4 className="text-xl font-bold font-serif text-wenwan-ink mb-2">{item.title}</h4>
                    <p className="text-wenwan-gray font-serif text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Tracking Mock */}
            <div className="bg-wenwan-gold/5 p-8 rounded-sm border border-wenwan-gold/10 mt-12">
              <h4 className="text-wenwan-gold font-bold font-serif text-sm tracking-widest mb-4 uppercase">服务进度查询</h4>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="输入快递单号或服务编号..." 
                  className="flex-grow px-4 py-2 rounded-sm border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif text-sm"
                />
                <button className="bg-wenwan-ink text-white px-6 py-2 rounded-sm font-bold font-serif text-sm hover:bg-wenwan-gold transition-all btn-neumorphic-dark">
                  查询
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <ScrollFloat as="h2" containerClassName="text-3xl font-bold font-serif text-wenwan-ink tracking-widest border-b border-wenwan-gold/20 pb-4">
              品牌理念
            </ScrollFloat>
            <div className="grid grid-cols-1 gap-8">
              {[
                { title: '匠心', desc: '每一件藏品都经过严格筛选，确保每一颗珠子都符合收藏级别。' },
                { title: '传承', desc: '弘扬传统文化，让更多人感受东方美学的魅力。' },
                { title: '诚信', desc: '坚持正品保障，透明交易，建立值得信赖的文玩社区。' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-wenwan-paper-dark rounded-sm hover:border-wenwan-gold transition-colors">
                  <h4 className="text-xl font-bold font-serif text-wenwan-ink mb-4">{item.title}</h4>
                  <p className="text-wenwan-gray font-serif text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-12 rounded-sm border border-wenwan-paper-dark shadow-sm"
          >
            <h2 className="text-2xl font-bold font-serif text-wenwan-ink mb-8">在线报修/咨询</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-serif text-wenwan-gray">姓名</label>
                  <input type="text" className="w-full px-4 py-3 rounded-sm border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-serif text-wenwan-gray">联系电话</label>
                  <input type="text" className="w-full px-4 py-3 rounded-sm border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-serif text-wenwan-gray">服务类型</label>
                <select className="w-full px-4 py-3 rounded-sm border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif">
                  <option>日常养护</option>
                  <option>翻新修复</option>
                  <option>鉴定咨询</option>
                  <option>退换货申请</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-serif text-wenwan-gray">问题描述</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-sm border border-wenwan-paper-dark focus:border-wenwan-gold outline-none font-serif" />
              </div>
              <button className="w-full py-4 bg-wenwan-ink text-white rounded-sm font-bold font-serif tracking-widest hover:bg-wenwan-gold transition-all btn-neumorphic-dark">
                提交申请
              </button>
            </form>
          </motion.div>

        <div className="mt-24 p-12 bg-wenwan-gold/5 rounded-sm border border-wenwan-gold/20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-wenwan-gold rounded-full flex items-center justify-center text-white">
              <Headphones size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-wenwan-ink">24小时雅友热线</h3>
              <p className="text-wenwan-gold font-bold text-2xl">400-888-9999</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-wenwan-ink text-white rounded-sm font-bold font-serif hover:bg-wenwan-gold transition-all btn-neumorphic-dark">在线客服</button>
            <button className="px-8 py-3 border border-wenwan-ink text-wenwan-ink rounded-sm font-bold font-serif hover:bg-wenwan-ink hover:text-white transition-all btn-neumorphic">常见问题</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-wenwan-ink flex items-stretch overflow-hidden">
      {/* Left Side: Atmospheric Image (45%) */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?q=80&w=1200&auto=format&fit=crop" 
          alt="Atmospheric Background" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        
        {/* Brand Logo (Top Left) */}
        <div className="absolute top-10 left-12 flex items-center gap-3 opacity-80">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <div className="w-5 h-5 bg-wenwan-gold rounded-full" />
          </div>
          <span className="text-white font-serif tracking-[0.4em] text-lg">文玩馆</span>
        </div>

        {/* Vertical Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white font-serif text-5xl md:text-6xl tracking-[1em] leading-relaxed [writing-mode:vertical-rl]"
          >
            雅物待人，静候知音
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form Area (55%) */}
      <div className="flex-1 bg-white relative lg:rounded-tl-[2rem] flex flex-col justify-center items-center px-6 md:px-20 py-12">

        <div className="w-full max-w-[27.5rem] space-y-10">
          {/* Welcome & Title */}
          <div className="space-y-3">
            <p className="text-gray-400 text-sm tracking-widest">
              {activeTab === 'login' ? '欢迎回来' : '加入文玩雅集'}
            </p>
            <h2 className="text-3xl font-bold text-wenwan-ink font-serif tracking-widest">
              {activeTab === 'login' ? '登录' : '注册'}
            </h2>
          </div>

          {/* Tab Switch */}
          <div className="flex gap-10 border-b border-gray-100 relative">
            <button 
              onClick={() => setActiveTab('login')}
              className={`pb-4 text-sm font-bold tracking-widest transition-colors relative ${activeTab === 'login' ? 'text-wenwan-ink' : 'text-gray-400'}`}
            >
              登录
              {activeTab === 'login' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-wenwan-gold" transition={{ duration: 0.3, ease: "easeOut" }} />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`pb-4 text-sm font-bold tracking-widest transition-colors relative ${activeTab === 'register' ? 'text-wenwan-ink' : 'text-gray-400'}`}
            >
              注册
              {activeTab === 'register' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-wenwan-gold" transition={{ duration: 0.3, ease: "easeOut" }} />
              )}
            </button>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form 
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="手机号 / 邮箱" 
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2 relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="密码" 
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-gray-400 hover:text-wenwan-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="flex justify-end pt-2">
                    <a href="#" className="text-xs text-wenwan-gold hover:underline tracking-widest">忘记密码？</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="accent-wenwan-gold w-4 h-4" />
                  <label htmlFor="remember" className="text-xs text-gray-500 tracking-widest">记住账号</label>
                </div>

                <button className="w-full h-12 bg-wenwan-gold text-white rounded-[2.5rem] font-bold tracking-[0.4em] hover:bg-wenwan-gold/90 transition-all shadow-lg shadow-wenwan-gold/20 btn-neumorphic">
                  登录
                </button>

                <div className="pt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-gray-100" />
                    <span className="text-[10px] text-gray-300 tracking-[0.3em] uppercase">社交账号登录</span>
                    <div className="flex-1 h-[1px] bg-gray-100" />
                  </div>
                  <div className="flex justify-center gap-6">
                    <button type="button" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#07C160] hover:border-[#07C160] transition-all">
                      <MessageCircle size={24} />
                    </button>
                    <button type="button" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#12B7F5] hover:border-[#12B7F5] transition-all">
                      <Zap size={24} />
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.form 
                key="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="手机号" 
                    className="flex-1 h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                  />
                  <button type="button" className="px-4 h-12 border border-wenwan-gold text-wenwan-gold rounded-lg text-xs font-bold tracking-widest hover:bg-wenwan-gold/5 transition-all">
                    获取验证码
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="请输入验证码" 
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                />
                <input 
                  type="password" 
                  placeholder="设置密码 (8-20位字母数字)" 
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                />
                <input 
                  type="password" 
                  placeholder="确认密码" 
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-wenwan-gold focus:ring-1 focus:ring-wenwan-gold outline-none transition-all text-sm"
                />
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="agree" className="accent-wenwan-gold mt-1" />
                  <label htmlFor="agree" className="text-[11px] text-gray-400 leading-relaxed tracking-wider">
                    我已阅读并同意 <a href="#" className="text-wenwan-gold">《用户协议》</a> 与 <a href="#" className="text-wenwan-gold">《隐私政策》</a>
                  </label>
                </div>

                <button className="w-full h-12 bg-wenwan-gold text-white rounded-[2.5rem] font-bold tracking-[0.4em] hover:bg-wenwan-gold/90 transition-all shadow-lg shadow-wenwan-gold/20 btn-neumorphic">
                  注册并登录
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer Link */}
          <div className="pt-10 text-center">
            <a href="#" className="text-xs text-gray-400 hover:text-wenwan-gold transition-colors tracking-widest">
              遇到问题？联系客服
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Not Found Component ---

const NotFound = () => {
  const beads = [
    { x: -80, y: 40, delay: 0.1 },
    { x: -30, y: 90, delay: 0.3 },
    { x: 20, y: 60, delay: 0.2 },
    { x: 80, y: 100, delay: 0.5 },
    { x: 120, y: 30, delay: 0.4 },
    { x: -100, y: -10, delay: 0.6 },
    { x: 60, y: -30, delay: 0.7 },
  ];

  return (
    <div className="min-h-[70vh] bg-wenwan-paper flex flex-col items-center justify-center relative overflow-hidden px-6 py-32">
      <div className="relative w-full max-w-md h-64 mb-12 flex items-center justify-center">
        {/* 404 Text Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[12rem] font-serif font-bold text-wenwan-ink/5 select-none tracking-tighter">404</span>
        </div>

        {/* Broken string SVG */}
        <svg className="absolute inset-0 w-full h-full text-wenwan-gold/40" viewBox="0 0 400 250">
          <path d="M 50,200 Q 150,250 200,150 T 350,50" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        </svg>

        {/* Scattered Beads */}
        {beads.map((bead, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 rounded-full shadow-xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #8B4513, #3D3229)',
              boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)'
            }}
            initial={{ 
              x: 0, 
              y: -200,
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              x: bead.x, 
              y: bead.y,
              opacity: 1,
              rotate: bead.x * 2
            }}
            transition={{ 
              duration: 1.5, 
              delay: bead.delay,
              type: "spring",
              bounce: 0.6
            }}
          >
            {/* Bead hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/60 rounded-full shadow-inner" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center z-10"
      >
        <h2 className="text-3xl font-serif font-bold text-wenwan-ink mb-4 tracking-[0.2em]">寻物未果 · 缘分未到</h2>
        <p className="text-wenwan-gray font-serif mb-10 max-w-md mx-auto leading-loose">
          抱歉，您寻找的雅致之物似乎遗落在了时光里。线断珠散，或许是在等待下一次的相遇。
        </p>
        <Link to="/" className="inline-block bg-wenwan-ink text-white px-12 py-4 rounded-sm font-bold tracking-[0.3em] hover:bg-wenwan-gold transition-all btn-neumorphic-dark">
          重回雅集
        </Link>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-wenwan-paper font-sans selection:bg-wenwan-red selection:text-white flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/mall" element={<Mall />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mall" element={<MallPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
