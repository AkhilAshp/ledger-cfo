
import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  desc: string;
}

interface ServiceSectionProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  features: Feature[];
  darkCard?: boolean;
  secondaryImage?: string;
  secondaryTitle?: string;
  secondaryDesc?: string;
  bgColor?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  id, tag, title, description, image, features, darkCard, secondaryImage, secondaryTitle, secondaryDesc, bgColor
}) => {
  return (
    <div id={id} className={`scroll-mt-48 transition-colors`} style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#141414]/60 uppercase">
              {tag}
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif-accent leading-tight text-[#141414]">
              {title}
            </h3>
            <p className="text-base sm:text-lg text-[#141414]/70 leading-relaxed max-w-lg">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-10 pt-4">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-3">
                <h5 className="font-bold text-[#141414] text-sm tracking-tight">{feature.title}</h5>
                <p className="text-sm text-[#141414]/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-[#faf8f6]"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto" 
            />
          </motion.div>

          {secondaryTitle && (
            <div className={`p-10 rounded-2xl ${darkCard ? 'bg-[#141414] text-white shadow-[0_40px_80px_rgba(0,0,0,0.3)]' : 'bg-gray-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                 {secondaryImage && (
                    <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                       <img src={secondaryImage} alt={secondaryTitle} className="w-full aspect-square object-cover" />
                    </div>
                 )}
                 <div className="space-y-4 order-1 md:order-2">
                    <h4 className="text-2xl font-serif-accent">{secondaryTitle}</h4>
                    <p className={`text-sm ${darkCard ? 'text-white/70' : 'text-gray-600'}`}>{secondaryDesc}</p>
                    <button className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 group`}>
                       Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
