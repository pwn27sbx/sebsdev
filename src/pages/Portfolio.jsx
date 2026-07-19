import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ExpertiseSection from '../components/ExpertiseSection';
import InteractiveBanner from '../components/InteractiveBanner';
import ProjectsGallery from '../components/ProjectsGallery';
import ViewAllBlock from '../components/ViewAllBlock';
import Footer from '../components/Footer';

export default function Portfolio() {
  return (
    <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white min-h-screen font-sans md:cursor-none transition-colors duration-500 overflow-clip">
      <CustomCursor />
      <Header />

      <main className="w-full relative z-10">
        <div className="relative z-10 w-full h-[100dvh]">
          <Hero />
        </div>

        <div className="relative z-20 h-[200vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
            <ExpertiseSection />
          </div>
        </div>

        <div className="relative z-30 -mt-[100vh] h-[300vh] w-full bg-[#f5f5f5] dark:bg-[#0a0a0a]">
          <div className="absolute top-0 left-0 w-full h-32 sm:h-48 -translate-y-full bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a] pointer-events-none z-40"></div>

          <div className="w-full pt-16 sm:pt-24 pb-8 z-30 relative">
            <InteractiveBanner />
          </div>

          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center z-20 overflow-hidden">
            <ProjectsGallery />
          </div>
        </div>

        <div className="relative z-40 -mt-[100vh] w-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 sm:h-48 -translate-y-full bg-gradient-to-b from-transparent to-[#f5f5f5] dark:to-[#0a0a0a] pointer-events-none z-50"></div>

          <div className="w-full min-h-screen flex flex-col justify-between pt-12 pb-4 bg-[#f5f5f5] dark:bg-[#0a0a0a] pointer-events-auto shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex-1 flex flex-col items-center justify-center w-full mt-0 mb-8 sm:mb-16">
              <ViewAllBlock />
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
