import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  education: string;
  experience: string;
  bio: string;
  specialties: string[];
  availability: {
    day: string;
    slots: string[];
  }[];
  imageUrl: string;
}

export function MentorDetail() {
  const { id: mentorId } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // This would normally come from an API call using mentorId
  const mentor: Mentor = {
    id: mentorId || '1',
    name: 'Dr. Sarah Chen',
    title: 'Senior Software Engineer',
    company: 'Google',
    education: 'Ph.D. in Computer Science, Stanford University',
    experience: '10+ years in software development and AI',
    bio: 'Dr. Chen specializes in artificial intelligence and machine learning, with extensive experience in developing scalable applications. She is passionate about mentoring the next generation of tech leaders.',
    specialties: [
      'Machine Learning',
      'Software Architecture',
      'Career Development',
      'Technical Leadership'
    ],
    availability: [
      {
        day: '2024-02-20',
        slots: ['10:00 AM', '2:00 PM', '4:00 PM']
      },
      {
        day: '2024-02-21',
        slots: ['11:00 AM', '3:00 PM']
      }
    ],
    imageUrl: '/mentor-sarah.jpg'
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    // Handle booking logic here
    console.log('Booking session for:', selectedDate, selectedTime);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Mentor Header */}
          <div className="flex items-start gap-8">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold gradient-text">{mentor.name}</h1>
              <p className="text-lg text-slate-600">{mentor.title}</p>
              <p className="text-slate-600">{mentor.company}</p>
              <p className="text-sm text-slate-500 mt-2">{mentor.education}</p>
            </div>
          </div>

          {/* Mentor Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-slate-600">{mentor.bio}</p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                <p className="text-slate-600">{mentor.experience}</p>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((specialty: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 text-violet-600 
                               rounded-lg text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="glass-card p-6 space-y-6">
              <h2 className="text-xl font-semibold">Book a Session</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                >
                  <option value="">Choose a date</option>
                  {mentor.availability.map((day) => (
                    <option key={day.day} value={day.day}>
                      {new Date(day.day).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl"
                  disabled={!selectedDate}
                >
                  <option value="">Choose a time</option>
                  {selectedDate &&
                    mentor.availability
                      .find((day) => day.day === selectedDate)
                      ?.slots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                </select>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 
                         to-fuchsia-500 text-white font-medium rounded-xl 
                         hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Book Session
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
} 