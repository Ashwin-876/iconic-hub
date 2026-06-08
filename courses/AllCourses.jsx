import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Search, Star, Clock, User, ArrowRight, Shield, Laptop, Layers, 
  ChevronLeft, ChevronRight, Grid, Sliders, ChevronDown, Zap, Sparkles 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

const TRENDING_COURSES = [
  {
    title: 'AI Fundamentals',
    instructor: 'Dr. Sarah Chen • Chief AI Scientist',
    rating: '4.9',
    students: '12.4k',
    cat: 'AI & Data',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCakWZ52RdJHUD2Qkxc2cfblxtfLqyQVO9m6d65J1T2RIQCv9G337Cbw0M3nXY2IPh-QxfSZBjORt2LkfYf1FcIHjc2t6Mce2MBIpytfLBkA_gWJcmUzxvkSYrcKpBLnyaphfKTLLerxmk00Hx3888H-PngDlXnmD9Npk_VE19_cx3g-rat39_qWWFw5KhdYdjrKMsBpnsW9z1LRSVD2jfAkxH-hE3HtKv3eA8z9gDy6iSyEvpn5QYvkQICrRE0DQIluDiFLpw6ZAL'
  },
  {
    title: 'Full-Stack Web3',
    instructor: 'Marcus Aurelius • Sr. Blockchain Dev',
    rating: '4.8',
    students: '8.2k',
    cat: 'Web Development',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzxb-UOQwyzVQcknGP1D_0qierJhkAF1p4Mu9QX5hC-Kf3g6TasWKg12KS_5DvUIByE6F8aygkqSd3OGxq1O3Sx33zOhAPADBrx0pN-VjD5b_gka11mBcXlHFHIPhM2_Uy0g9qsMgPnAE8FAXtv01BSGGnryvBJ-TUMYioWZRiiUVQtOlqq6zU6bncsoNQaP86rKnV0IYJWOqZlKIPrgbSEvN6d71O7qzVZPv5YdT_Z7Ix-paK03NT58Zccp8Oa7gzM6_3EW3sC0S'
  },
  {
    title: 'Systematic Design Systems',
    instructor: 'Elena Rossi • Principal Designer',
    rating: '5.0',
    students: '5.1k',
    cat: 'Design Systems',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9ZLCuawGJrRWTXuQXDr72aNP-M97dshG8TUQiaMfyPCA0tVPiR6M2cubYaxp8ecVAo26_ScyNsy7Bony5oOSRDpSuufdjUTgTItCOK1foOsEqdzD_5_VE4Vk4aNqlhN_Rjz7XRWS_IjlwsvUM-6s_RvBI1jLQ9B-knx2QpuaqfSv0hcrteYC5azJbyASPijoD9XOP6Tba_0M8juHGZAAB63g7sjP7OZR61pRh_GCO8NBl2NMjTEvXKuSBlJJ4JxEhVdXS7kCWNjar'
  },
  {
    title: 'Data Visualisation Pro',
    instructor: 'Liam Grant • Lead Data Analyst',
    rating: '4.7',
    students: '9.5k',
    cat: 'Data Analysis',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7QcpqAGrpwNMJj5W5cwt0fyNEV2X81wzhrcGHGVFazf6sFwsu1sfW8C5JO12VhqvXdkrC55u-KINo6-IPOhF5UPokc-61SVtovXQbYe1pLdqTUtj5qvpWhY6mRq4Sdc5BbVdv9xHBHVcEBeXE51LaqR-Vj9OCD2U2x0TVwuHl0peGZmVdJR1nP2T1kMKEWksdkX6ynxUdiNqTRmOB0N6m9NVFWav_WwZMC3q81ICnVNQGk-5vnKQCr1MR5wKG9LrpZ0d95K2x5O9'
  }
];

const SKILL_PATHS = [
  {
    title: 'Full-Stack Architect',
    coursesCount: 9,
    description: 'Master the entire web ecosystem from database to pixel.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAERqBNqNL_Iq1aX5ex7xRLRGVrN8S-L7JBNxc57fOmerZGCCGwNmnrhB7Da-SfESb1QNybNZua8mpQKyI1_C4SxBZMi9tXm3dXgPtl04adJ2dXt8OiTYzVA5-nW0PQWb_7LYT8PPtFXYZAqz10OCRuMNdsle-_4kuhAAJXgKoP3Jj2CkzEs0s9o4uJtnz_ZybD7WSzj6GIqA1Bkw4L0TF8AJEe0DKBJ8iCwOdnkHg-1bJ7W4wOotAwBx3_wtcH50CQLLYaKpmav1AR'
  },
  {
    title: 'UI/UX Design',
    coursesCount: 12,
    description: 'Create intuitive, beautiful digital experiences with data-driven design.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYmXLqya1ysmk5L26spV4vFoSDra-6H2GGTvo1NecGpZHck3awWumCzjVPm5qmRFKis6ntR1-tOGezRdFj_V8myzoPlEXPRsFyUg-Jmi7nYt6k41fBfsAbXl1OV8H6a-rTX3LokTBE77RyoQOt4fY6HJ716FNBo_h97MsbOkhziU5nDUur3d3_4QxhzN-GwJWpb3GQan7MRcdX-BdLKuDT-HSHeqDT-n4y5IDYQvzHxks2txlntJS_323putusgdOQ_BBQ_ZMz7m4O'
  },
  {
    title: 'Data Analysis',
    coursesCount: 7,
    description: 'Uncover deep insights and drive strategy through quantitative storytelling.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDour4dDcflIcY4EyslZIUKO-sIOtn9M-Uthi5X2BzZ6XHuGMaBrqLqUBpp34qSucs_zGwWxQWces5xuQiujiYqWwOi9533GNbXgjdtFdzy9PjvnuyQfDFnBJrbyw1DygTKFB-9tplC4eIEiG0qd388V0iB0FN2aFEtdPccR2IsVhzSc6C27s_nXaB2-Wl475jeu7bNB7w988bxB4lLAm4muaasUmU_DQrZXEjWp7uet3XkFV7ZvurDhn-2vTYdLklCQGtoH0HJqP9K'
  }
];

const EXPLORE_COURSES = [
  { title: 'Advanced React patterns', instructor: 'Josh W. Comeau', cat: 'Development', level: 'Advanced', duration: 12, rating: '4.9', students: '12.3k', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400' },
  { title: 'Mastering Typography', instructor: 'Sarah Drasner', cat: 'Design', level: 'Beginner', duration: 6, rating: '4.8', students: '8.1k', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400' },
  { title: 'Generative AI for PMs', instructor: 'Alex Hormozi', cat: 'AI', level: 'Intermediate', duration: 8, rating: '4.7', students: '15.5k', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400' },
  { title: 'High-Scale SQL', instructor: 'Tobias Lutke', cat: 'Database', level: 'Advanced', duration: 14, rating: '4.9', students: '6.4k', img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400' },
  { title: 'Motion with Framer', instructor: 'Meng To', cat: 'Design', level: 'Intermediate', duration: 4, rating: '5.0', students: '4.2k', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
  { title: 'Go Microservices', instructor: 'Kelsey Hightower', cat: 'Development', level: 'Advanced', duration: 18, rating: '4.9', students: '9.8k', img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400' },
  { title: 'Prompt Engineering', instructor: 'Andrew Ng', cat: 'AI', level: 'Beginner', duration: 5, rating: '4.6', students: '22k', img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400' },
  { title: 'Leadership 101', instructor: 'Simon Sinek', cat: 'Business', level: 'Beginner', duration: 3, rating: '4.8', students: '34k', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' }
];

const FACULTY = [
  { name: 'Dr. Sarah Chen', role: 'Chief AI Scientist', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC23pGSUIIPwRvJdFRZfPEKPQcTvgpw8RriOzVGjdmKNmPrvRDxHQpK1IQyFrE62qcdkTB_FI2pYAZdCHNujSSWxONcxpLFjF7nwbvKlpmXYi-TrlR7H3ZQOtTsj1XhX3QX9VYvirJ03USNt2XZ9VWUwwoqHL1mH_sCDOPj0StaicqVFjXE8mQrBqnIRyfT-aH16RIpxlrrcnZrBqN3i4pk4ns3Nl0bf3lTgtLf1B5E0aF6IeH__KUEQ7kC_W67PYRhx13zRw8u8K0f' },
  { name: 'Marcus Aurelius', role: 'Sr. DevOps Engineer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfZ5ZAshGpGRYtM6XQ-hVzOjQCHaSssJzSxUAjIjGizxlbcsQ5LCiTJrxV3kuHP0KR4r8LNksbrpmK0zoDcZWvlvb_KMcFYymEuG3Yj6Kcakxku5Fb_Rur5uKeQFK_uF-NWPmBKAs86Tsedm855Lo6fI0P99CQyCsErvzCywGn3byNe2Pw60tyAFugf0oQx0_97KbvPt-iU1MKJ2DfC4ZgRDLtzObuyy4QBgkUjK4JHfHdJ_ihdC9laG-n_3d3dZzs46jWPCulbrVb' },
  { name: 'Elena Rossi', role: 'Principal Designer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNyqWIr3D_QpnsDn4aZGuNkNQvtGo1q909zvjaUwznvf6rf4X3UYrfpeFiXlieEGZuLBo2ecNRscJuixfWfcqj_N7eHkL5khXgTzHSWI8JiA0twrcjaMCFNfd_uGJrDszDGrVE76zdbedfHfCa-85o-fNDpTHcHtBB1VmqrvW2R4hvbqEPMrbGJYgla-rlMREcp5sRu_WBiJSQRNjSTR0IJkfHro9DXajvrkIU28K0SvynUG1IPtt22En1Ym0IH8eeazVGVVDebh8U' },
  { name: 'Liam Grant', role: 'Lead Data Analyst', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr5fz5--3jcSZCaVNB5eGgl09wVgjY-7J7WqU0zhug6EDZTAh5YbeCftYkjD73r0vyLlAXuzrH-mKPuiz4lsn4G-E8yhhN2l6w5XyNvO5QYxn9L8MBQ6cW8hjy7ja4hnwk4BlTF8_kz6EkPOFRHlC_p2P4VsRe7S8GpYPIWiq_bY96_R3hKtB8sQBJYMpNguW-s8ZQP5tK67UhY1XoO4F6qrkW2xnbbtGpkDh1O1va1p4gxiuimbNMVOx7sm9_d_W12T2sQfWxME0i' },
  { name: 'Sofia Vergara', role: 'VP of Product', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-uu9ESnmOLXBU_Ooxo4LIr9imuWF-_GSNrdk6dXQPQoPY4vcCq_6xC7ndYoysgeDImb6EDL75GtxdtNeCOAHJtnNgLaIID0HYlFiPwczV3r4-P4rRrHj58ULPLOzMIIH0epXywX-6wdBeDugfbruSanMHH08Ken21HWjDsr4sDXxbicVmq-phqhn-evf3mgdAIv9RuraNAvPVtdXHGdtspjj00CZjpLiORkxBDyAJg9X6jgTLuNUyCgPF5QWBJ3Tq8fsFSQSTl0e' }
];

export default function AllCourses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevelFilter, setActiveLevelFilter] = useState('All');
  const [activeDurationFilter, setActiveDurationFilter] = useState('All');
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

  const [search, setSearch] = useState('');
  
  const trendingCarouselRef = useRef(null);

  const filteredCourses = EXPLORE_COURSES.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.cat === activeCategory;
    const matchesLevel = activeLevelFilter === 'All' || course.level === activeLevelFilter;
    
    let matchesDuration = true;
    if (activeDurationFilter !== 'All') {
      if (activeDurationFilter === '< 5 Hours') {
        matchesDuration = course.duration < 5;
      } else if (activeDurationFilter === '5 - 10 Hours') {
        matchesDuration = course.duration >= 5 && course.duration <= 10;
      } else if (activeDurationFilter === '10+ Hours') {
        matchesDuration = course.duration > 10;
      }
    }

    const matchesSearch = 
      course.title.toLowerCase().includes(search.toLowerCase()) || 
      course.instructor.toLowerCase().includes(search.toLowerCase());
      
    return matchesCategory && matchesLevel && matchesDuration && matchesSearch;
  });

  const scrollCarousel = (direction) => {
    if (trendingCarouselRef.current) {
      const scrollAmount = 340;
      trendingCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 selection:bg-blue-600 selection:text-white">
        <style dangerouslySetInnerHTML={{ __html: `
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .vibrant-shadow:hover {
            box-shadow: 0 20px 40px -12px rgba(37, 99, 235, 0.15);
            transform: translateY(-8px);
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />

        {/* Top Navigation Bar */}
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8 space-y-16 text-left">
          
          {/* Hero Section */}
          <section 
            className="relative pt-24 pb-20 px-8 rounded-[32px] text-center bg-cover bg-center shadow-2xl shadow-blue-900/10"
            style={{ 
              backgroundImage: 'url("/hero_bg.png")'
            }}
          >
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] -z-10 rounded-[32px]"></div>
            <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold mb-8">
                <Zap className="w-4 h-4 fill-blue-400 text-blue-400" />
                <span>Accelerate Your Growth</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 max-w-3xl mx-auto leading-tight tracking-tight">
                Future-Proof Your Career with <span className="text-blue-400">Industry Experts</span>
              </h1>
              
              <div className="w-full max-w-2xl mx-auto mb-10">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="What do you want to learn today?" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-6 pr-16 py-5 bg-white rounded-2xl border-none shadow-xl text-base focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-400 text-slate-900"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                
                {/* Category Dropdown */}
                <div className="relative">
                  <div 
                    onClick={() => {
                      setShowCategoryDropdown(!showCategoryDropdown);
                      setShowLevelDropdown(false);
                      setShowDurationDropdown(false);
                    }}
                    className="glass-card px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white transition-all text-sm font-semibold text-slate-800"
                  >
                    <Grid className="w-4 h-4 text-blue-600" />
                    <span>Category: {activeCategory}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-2">
                      {['All', 'Development', 'Design', 'AI', 'Database', 'Business'].map(cat => (
                        <div 
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                          className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-slate-50 text-left ${activeCategory === cat ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Level Dropdown */}
                <div className="relative">
                  <div 
                    onClick={() => {
                      setShowLevelDropdown(!showLevelDropdown);
                      setShowCategoryDropdown(false);
                      setShowDurationDropdown(false);
                    }}
                    className="glass-card px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white transition-all text-sm font-semibold text-slate-800"
                  >
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>Level: {activeLevelFilter}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                  {showLevelDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-2">
                      {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                        <div 
                          key={lvl}
                          onClick={() => {
                            setActiveLevelFilter(lvl);
                            setShowLevelDropdown(false);
                          }}
                          className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-slate-50 text-left ${activeLevelFilter === lvl ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                        >
                          {lvl}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration Dropdown */}
                <div className="relative">
                  <div 
                    onClick={() => {
                      setShowDurationDropdown(!showDurationDropdown);
                      setShowCategoryDropdown(false);
                      setShowLevelDropdown(false);
                    }}
                    className="glass-card px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white transition-all text-sm font-semibold text-slate-800"
                  >
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Duration: {activeDurationFilter}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                  {showDurationDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-2">
                      {['All', '< 5 Hours', '5 - 10 Hours', '10+ Hours'].map(dur => (
                        <div 
                          key={dur}
                          onClick={() => {
                            setActiveDurationFilter(dur);
                            setShowDurationDropdown(false);
                          }}
                          className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-slate-50 text-left ${activeDurationFilter === dur ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                        >
                          {dur}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => {
                    document.getElementById('explore-courses')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-12 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </section>

          {/* Trending Now Carousel */}
          <section className="py-4 overflow-hidden">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
                <p className="text-sm text-slate-500 mt-2">The most sought-after skills this week.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-900 bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-900 bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div 
              ref={trendingCarouselRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x"
            >
              {TRENDING_COURSES.map((course, idx) => (
                <div key={idx} className="min-w-[320px] max-w-[320px] glass-card rounded-2xl overflow-hidden vibrant-shadow transition-all group snap-start bg-white">
                  <div className="h-48 relative overflow-hidden">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs font-bold text-slate-900 bg-white/90">
                      {course.cat}
                    </div>
                  </div>
                  <div className="p-6 text-left flex flex-col justify-between h-[200px]">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.instructor}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-blue-600 text-sm mb-4">
                        <Star className="w-4 h-4 fill-blue-600" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-slate-500 font-normal ml-1">({course.students} students)</span>
                      </div>
                      <button className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] border-2 border-[#2563EB] text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] transition-all rounded-lg text-xs">
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skill-Based Learning Paths */}
          <section className="py-12 bg-white px-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Skill-Based Learning Paths</h2>
              <p className="text-sm text-slate-500 mt-4">Structured curricula designed to take you from beginner to professional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SKILL_PATHS.map((path, idx) => (
                <div key={idx} className="relative group cursor-pointer h-[380px] rounded-[32px] overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <img src={path.img} alt={path.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full text-left">
                    <div className="px-3 py-1 bg-blue-600 text-white w-fit rounded-full text-xs font-bold mb-4">
                      {path.coursesCount} Courses
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{path.title}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{path.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Explore All Courses Grid */}
          <section id="explore-courses" className="py-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Explore All Courses</h2>
                <p className="text-sm text-slate-500 mt-2">Find your next obsession among our 500+ premium courses.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Development', 'Design', 'AI', 'Business'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${
                      activeCategory === cat 
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/15' 
                        : 'border border-slate-200 text-slate-500 hover:bg-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between bg-white">
                  <div>
                    <div className="h-40 relative overflow-hidden bg-slate-100">
                      <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-all duration-500" />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-900">
                        {course.cat}
                      </div>
                    </div>
                    <div className="p-5 text-left">
                      <h4 className="text-base font-bold text-slate-900 mb-1 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-500 mb-3">{course.instructor}</p>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-0 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-blue-600" />
                        {course.rating}
                      </div>
                      <div className="text-slate-500 text-[10px] font-semibold">{course.students} students</div>
                    </div>
                    <button className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] border-2 border-[#2563EB] text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] transition-all">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No courses found matching your criteria.
              </div>
            )}

            <div className="mt-16 text-center">
              <button className="px-8 py-4 bg-slate-950 text-white rounded-full text-xs font-bold hover:bg-black transition-all">
                Load More Courses
              </button>
            </div>
          </section>

          {/* World-Class Faculty */}
          <section className="py-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-16">World-Class Faculty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {FACULTY.map((fac, idx) => (
                <div key={idx} className="group">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-slate-100 transition-all group-hover:border-blue-600">
                    <img src={fac.img} alt={fac.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{fac.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{fac.role}</p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </PageTransition>
  );
}

