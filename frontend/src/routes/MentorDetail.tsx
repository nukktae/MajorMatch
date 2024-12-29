import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { mentors } from '../data/mentors';
import { VideoBackground } from '../components/VideoBackground';
import { BookingSection } from '../components/BookingSection';
import mentorVideo from '../assets/videos/IMG_1482.mp4';
import { MentorVideo } from '../components/MentorVideo';
import caseyImage from '../assets/videos/caseylee.png';
import { API_BASE_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';

interface Mentor {
  id: string;
  name: string;
  title: string;
  field: string;
  experience: string;
  availability: string;
  specialties: string[];
  rating: number;
  imageUrl: string;
  email: string;
}

export function MentorDetail() {
  const { id: mentorId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    const mentorFromState = location.state?.mentor as Mentor;
    if (mentorFromState) {
      setMentor(mentorFromState);
      return;
    }

    const foundMentor = mentors.find(m => m.id === mentorId);
    if (foundMentor) {
      setMentor(foundMentor);
    } else {
      navigate('/mentors');
    }
  }, [mentorId, location.state, navigate]);

  if (!mentor) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </PageLayout>
    );
  }

  const handleBookSession = async (date: Date, time: string, message: string) => {
    try {
      // First create the session
      const sessionResponse = await fetch(`${API_BASE_URL}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          mentorId: mentor.id,
          date,
          time,
          message
        })
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      // Then send the email notification
      const emailData = {
        to: mentor.email,
        subject: `New Mentoring Session Request - ${date.toLocaleDateString()}`,
        html: `
          <h2>New Mentoring Session Request</h2>
          <p><strong>Student:</strong> ${localStorage.getItem('userName') || 'Student'}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>Please respond to confirm or reschedule the session.</p>
        `
      };

      const emailResponse = await fetch(`${API_BASE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.details || errorData.error || 'Failed to send email');
      }

      alert('Session request sent successfully! The mentor will respond shortly.');
      
    } catch (error) {
      console.error('Error creating session:', error);
      alert(error instanceof Error ? error.message : 'Failed to send session request. Please try again.');
    }
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Mentor Header with Video */}
          <div className="flex items-start gap-8">
            {mentor.id === '2' ? ( // Casey Lee's ID
              <div className="w-32 h-32">
                <img
                  src={caseyImage}
                  alt={mentor.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />
              </div>
            ) : mentor.imageUrl ? (
              <div className="w-32 h-32">
                <MentorVideo 
                  videoSrc={mentorVideo} 
                  className="w-32 h-32 rounded-xl"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 
                           flex items-center justify-center text-white text-4xl font-bold">
                {mentor.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold gradient-text">{mentor.name}</h1>
              <p className="text-lg text-slate-600">{mentor.title}</p>
              <p className="text-slate-600">{mentor.field}</p>
              <p className="text-sm text-slate-500 mt-2">Experience: {mentor.experience}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Booking and Specialties */}
            <div className="col-span-12 md:col-span-5 space-y-6">
              <BookingSection 
                mentorName={mentor.name}
                onBook={handleBookSession}
              />

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="col-span-12 md:col-span-7 space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-slate-600 leading-relaxed">
                  A passionate {mentor.field} professional with {mentor.experience} of experience.
                  Dedicated to helping students navigate their academic and career paths.
                </p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Education & Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-violet-700">Current Position</h3>
                    <p className="text-slate-600">{mentor.title}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-violet-700">Years of Experience</h3>
                    <p className="text-slate-600">{mentor.experience}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Mentoring Style</h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-violet-500">•</span>
                    Personalized guidance based on your goals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-violet-500">•</span>
                    Practical advice from industry experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-violet-500">•</span>
                    Interactive sessions with real-world examples
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Availability & Sessions</h2>
                <div className="space-y-3">
                  <p className="text-slate-600">
                    <span className="font-medium">Available:</span> {mentor.availability}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Session Duration:</span> 45 minutes
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Session Format:</span> Video call
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
} 