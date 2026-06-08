import React from 'react';
import { Star, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RECOMMENDED = [
  {
    id: 'react-arch',
    title: 'Advanced React Architecture: State & Performance',
    instructor: 'Marcus Holloway',
    rating: 4.9,
    duration: '8 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzC0Djo314zKjTXMYdgLiufshp1XokOVZsZYs5UX6ChJqqSkiD3A80Nz09fXeiX_yUfXFobyUHGwtPjwOuk6-sUsFXyUtB1FFMaZZKVpPu-RjWEM4IdLFi_6wyeN_H3BbjttmW5gmgViAO0K3WbqTKk_aKLWwf5MvNBLRyJAX-hnArMEN5fxmY39CHsCuUnQOP8n4tL-WDo-3xvWkTRgOr_7kTPfGJIN8OPsBuVX9rtrC0AU2vI_FiaJKGD__6bE-3eFlwO1vvbJe5',
    tag: 'Highly Recommended'
  },
  {
    id: 'next-edge',
    title: 'NextJS Server Components & Edge Architectures',
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    duration: '12 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Hi0NiKTROw1FjlxblFXC6bZu3bTNi9a5XAUOT60CKj1BDHXu8S5lp1AuN2KD1GRg-8Cxcye5ybqQMMgaP2eTe0rBFRGjj5t8plJiDLfTDYMkrEw5mEAdcz-D1IcuhDjh-RshPZwk6Sp0vZkY0D_JeJwHBb129zxpdkTqnRPknnBVezu8-2Iy97-ASst5IKg1TuOToKPKz-_DzGGmm8S0q1ihCBdSq4ABBHLn4aJKSBkChlMYIx0nf5JTfOR9xGbxYh4gx60NlBif',
    tag: 'Skill Match'
  },
  {
    id: 'tailwind-premium',
    title: 'Tailwind CSS Premium Production Workflows',
    instructor: 'David Sterling',
    rating: 5.0,
    duration: '6 Hours',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbCDMf-bDLZtU_QrsdH6t1sEqx_0rMdIjM1UYWcNOliY5LQDuACfsn2y3me12xo05ThNyUm5YQ9sELQoOd822t9eGTY5goyhm-ZSRg9VRrM2jL_72nXyi32c2a-lMH1BKRi2AHyQrAspTBAlbwbOG3ZZPKFQFIejfnwMlPd37mxkXX-phvLujVC8bBTYpr-0qRD8Et6l2J7QVkabXE0lXnVHGp4J7SeAvcAQiPFEyslm4d6kHdScleAMmO1dkOaRpZLFgfcaAb-TcV',
    tag: 'New release'
  }
];

export default function RecommendedCourses() {
  const navigate = useNavigate();

  const handleEnroll = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-bold text-on-background">Recommended for You</h2>
        <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
          <span>View all paths</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECOMMENDED.map((course) => (
          <div key={course.id} className="bg-white border border-surface-stroke rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="relative h-44 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur text-[10px] font-bold text-blue-600 rounded-md shadow-sm border border-slate-100">
                {course.tag}
              </span>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-1 text-blue-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-on-background line-clamp-2 leading-snug">
                  {course.title}
                </h3>
              </div>

              <div className="space-y-4 pt-3 border-t border-surface-stroke">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span>{course.instructor}</span>
                </div>

                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-600 text-white text-xs font-bold rounded-xl active:scale-[0.99] transition-all"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
