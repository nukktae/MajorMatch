import { useState } from 'react';
import { SessionManager } from './SessionManager';
import { Stats } from './Stats';

export function MentorDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stats 
          title="Pending Sessions"
          value="3"
          trend="+2 this week"
        />
        <Stats 
          title="Completed Sessions"
          value="12"
          trend="+5 this month"
        />
        <Stats 
          title="Student Rating"
          value="4.8"
          trend="+0.2 this month"
        />
      </div>

      <SessionManager mentorId={localStorage.getItem('userId') || ''} />
    </div>
  );
} 