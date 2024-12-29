import { useState, useEffect } from 'react';
import { Session } from '../types/Session';
import { API_BASE_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';

export function SessionManager({ mentorId }: { mentorId: string }) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sessions?role=mentor`, {
          headers: {
            'Authorization': `Bearer ${await getAuthToken()}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, [mentorId]);

  const handleAcceptSession = async (sessionId: string) => {
    try {
      const meetingLink = `https://meet.google.com/${sessionId}`; // Generate real meeting link
      const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({ 
          status: 'accepted',
          meetingLink 
        })
      });

      if (response.ok) {
        // Get student email from the session data
        const session = sessions.find(s => s.id === sessionId);
        
        // Send confirmation email
        await fetch(`${API_BASE_URL}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAuthToken()}`
          },
          body: JSON.stringify({
            to: session?.studentEmail,
            subject: 'Mentoring Session Confirmed!',
            html: `
              <h2>Your Session Has Been Confirmed!</h2>
              <p>Session Details:</p>
              <p>Date: ${new Date(session?.date || '').toLocaleDateString()}</p>
              <p>Time: ${session?.time}</p>
              <p>Meeting Link: ${meetingLink}</p>
              <p>Please join the meeting on time using the link above.</p>
            `
          })
        });

        // Update local state
        setSessions(prev => prev.map(s => 
          s.id === sessionId 
            ? { ...s, status: 'accepted', meetingLink } 
            : s
        ));
      }
    } catch (error) {
      console.error('Error accepting session:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold gradient-text">Session Requests</h2>
      {sessions.length === 0 ? (
        <p className="text-slate-600">No pending session requests.</p>
      ) : (
        sessions.map(session => (
          <div key={session.id} className="glass-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{session.studentName}</h3>
                <p className="text-sm text-slate-600">
                  {new Date(session.date).toLocaleDateString()} at {session.time}
                </p>
                <p className="mt-2">{session.message}</p>
              </div>
              {session.status === 'pending' && (
                <div className="space-x-3">
                  <button
                    onClick={() => handleAcceptSession(session.id)}
                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500
                             text-white font-medium rounded-xl hover:opacity-90"
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
} 