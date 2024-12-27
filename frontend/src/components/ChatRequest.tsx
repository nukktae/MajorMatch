import React, { FC, FormEvent } from 'react';

interface ChatRequestProps {
  mentorId: string | undefined;
  selectedDate: Date | null;
  selectedTime: string | null;
}

export const ChatRequest: FC<ChatRequestProps> = ({ mentorId, selectedDate, selectedTime }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle chat request submission
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Send Meeting Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Message to Mentor</label>
          <textarea
            className="w-full rounded-lg border p-2 h-32"
            placeholder="Introduce yourself and explain what you'd like to discuss..."
          />
        </div>

        <div className="bg-violet-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Meeting Details</h3>
          <p className="text-sm text-violet-700">
            {selectedDate?.toLocaleDateString()} at {selectedTime}
          </p>
        </div>

        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 disabled:opacity-50"
        >
          Send Request
        </button>
      </form>
    </div>
  );
} 