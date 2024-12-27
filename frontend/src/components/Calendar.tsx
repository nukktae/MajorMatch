import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  availableTimes: string[];
  onTimeSelect: (time: string | null) => void;
}

export function Calendar({ selectedDate, onDateSelect, availableTimes, onTimeSelect }: CalendarProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Schedule a Meeting</h2>
      <DayPicker
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date: Date | undefined) => onDateSelect(date || null)}
        disabled={{ before: new Date() }}
        className="border rounded-lg p-4"
      />
      
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Available Times</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`p-2 rounded ${
                  selectedTime === time
                    ? 'bg-violet-500 text-white'
                    : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 