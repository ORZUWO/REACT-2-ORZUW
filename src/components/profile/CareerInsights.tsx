import React from 'react';
import { Sparkles, ArrowRight, PlayCircle, FileText } from 'lucide-react';

const CareerInsights: React.FC = () => {
  return (
    <div className="flex gap-4 mb-4">
      {/* AI Career Insights */}
      <div className="flex-1 bg-[#004182] rounded-xl p-5 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-8"></div>
        
        <h3 className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-wider mb-4 opacity-90">
          <Sparkles className="w-5 h-5" />
          AI Career Insights
        </h3>
        
        <p className="font-semibold text-lg leading-tight mb-2">
          Targeting VP of Strategy?
        </p>
        <p className="text-sm opacity-90 leading-relaxed mb-5">
          Our AI analysis of 450+ successful VP roles shows you are 85% ready. Focus on these missing competencies.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">Board Relations</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">M&A Strategy</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">ESG Governance</span>
        </div>
      </div>

      {/* Skill Gap Learning */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
            Skill Gap Learning
          </h3>
          <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors" />
        </div>

        <div className="flex flex-col gap-4">
          {/* Course 1 */}
          <div className="flex gap-3 items-center group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center shrink-0 text-[#0a66c2]">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#0a66c2] leading-tight">Executive Board Mastery</h4>
              <p className="text-[12px] text-gray-500">ProConnect Learning • Course</p>
            </div>
          </div>

          {/* Course 2 */}
          <div className="flex gap-3 items-center group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center shrink-0 text-[#0a66c2]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#0a66c2] leading-tight">M&A Strategy for Executives</h4>
              <p className="text-[12px] text-gray-500">Harvard Business • Interactive Case</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;
