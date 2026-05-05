import React from 'react';
import { Rocket } from 'lucide-react';

const PremiumJobsCard: React.FC = () => {
  return (
    <div className="bg-[#0073b1] rounded-lg overflow-hidden text-white relative p-5 shadow-lg group cursor-pointer mt-4">
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Premium</p>
        <h4 className="text-lg font-bold mb-4 leading-tight">Unlock Salary Insights</h4>
        <button className="bg-white text-[#0073b1] font-bold py-2 px-6 rounded-full text-sm hover:bg-gray-100 transition-all active:scale-95">
          Try Pro for $0
        </button>
      </div>
      
      {/* Decorative Rocket Icon */}
      <div className="absolute bottom-[-10px] right-[-10px] opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        <Rocket size={120} />
      </div>
    </div>
  );
};

export default PremiumJobsCard;
