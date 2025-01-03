import React from 'react';
import { format } from 'date-fns';
import { Profile } from '../types/Profile';

interface AssessmentHistoryProps {
  assessmentResults: Profile['assessment_results'];
  onSelect?: (date: string) => void;
  selectedDates?: string[];
}

export function AssessmentHistory({ 
  assessmentResults, 
  onSelect, 
  selectedDates = [] 
}: AssessmentHistoryProps) {
  if (!assessmentResults?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-slate-700">No Assessment History Yet</h3>
        <p className="text-slate-500 mt-2">Take your first assessment to discover majors that match your interests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assessmentResults.map((result) => (
        <div 
          key={result.date}
          className={`p-4 rounded-xl border ${
            selectedDates.includes(result.date) 
              ? 'border-violet-500 bg-violet-50' 
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-slate-900">
                {format(new Date(result.date), 'MMMM d, yyyy')}
              </h3>
              <p className="text-sm text-slate-500">
                {result.majors.length} recommended majors
              </p>
            </div>
            {onSelect && (
              <input
                type="checkbox"
                checked={selectedDates.includes(result.date)}
                onChange={() => onSelect(result.date)}
                className="h-4 w-4 text-violet-600 rounded border-slate-300"
              />
            )}
          </div>

          <div className="space-y-3">
            {result.majors.map((major, index) => (
              <div key={index} className="p-3 rounded-lg bg-slate-50">
                <h4 className="font-medium text-slate-800">{major.name}</h4>
                <p className="text-sm text-slate-600 mt-1">{major.description}</p>
                <div className="mt-2">
                  <h5 className="text-xs font-medium text-slate-700 mb-1">Why it's a good fit:</h5>
                  <p className="text-sm text-slate-600">{major.whyGoodFit}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {major.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-violet-100 text-violet-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 