import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface BookingSectionProps {
  mentorName: string;
  onBook: (date: Date, time: string, message: string) => void;
}

export function BookingSection({ mentorName, onBook }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState<'date' | 'time' | 'message'>('date');

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleNext = () => {
    if (step === 'date' && selectedDate) {
      setStep('time');
    } else if (step === 'time' && selectedTime) {
      setStep('message');
    }
  };

  const handleBook = () => {
    if (selectedDate && selectedTime && message) {
      onBook(selectedDate, selectedTime, message);
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-semibold gradient-text">Book a Session</h2>

      <div className="space-y-6">
        {step === 'date' && (
          <>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="mx-auto bg-white rounded-xl shadow-sm p-4"
              modifiersClassNames={{
                selected: 'bg-violet-500 text-white hover:bg-violet-600',
                today: 'text-violet-500 font-bold'
              }}
            />
            <button
              onClick={handleNext}
              disabled={!selectedDate}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-500
                       text-white font-medium rounded-xl hover:opacity-90 
                       transition-opacity disabled:opacity-50"
            >
              Next: Select Time
            </button>
          </>
        )}

        {step === 'time' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors
                    ${selectedTime === time
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selectedTime}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-500
                       text-white font-medium rounded-xl hover:opacity-90 
                       transition-opacity disabled:opacity-50"
            >
              Next: Add Message
            </button>
          </>
        )}

        {step === 'message' && (
          <>
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write a message to ${mentorName}...`}
                className="w-full h-32 p-4 rounded-xl border border-violet-200 
                         focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
              <button
                onClick={handleBook}
                disabled={!message}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-500
                         text-white font-medium rounded-xl hover:opacity-90 
                         transition-opacity disabled:opacity-50"
              >
                Book Session
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 