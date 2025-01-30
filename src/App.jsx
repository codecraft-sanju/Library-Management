import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CalendarComponent from './components/CalendarComponent';
import { markAttendance, addEvent, getAttendance, getEvents } from './api';
import React from 'react';

export default function App() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    type: '',
    date: '',
    input: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const attendanceRes = await getAttendance();
    const eventsRes = await getEvents();
    setEvents([
      ...attendanceRes.data.map((a) => ({
        title: `${a.name} (Present)`,
        start: a.date,
        color: 'green',
      })),
      ...eventsRes.data.map((e) => ({
        title: e.title,
        start: e.date,
        color: 'blue',
      })),
    ]);
  };

  const handleDateClick = (arg) => {
    setModal({ open: true, date: arg.dateStr, type: '', input: '' });
  };

  const handleSubmit = async () => {
    if (!modal.input) return alert('Input cannot be empty!');

    if (modal.type === 'attendance')
      await markAttendance(modal.input, modal.date);
    else if (modal.type === 'event') await addEvent(modal.input, modal.date);

    setModal({ open: false, type: '', date: '', input: '' });
    loadEvents();
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <CalendarComponent events={events} onDateClick={handleDateClick} />

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg w-96">
            <h3 className="mb-3 text-xl font-bold">📅 {modal.date}</h3>
            {!modal.type ? (
              <>
                <button
                  onClick={() => setModal({ ...modal, type: 'attendance' })}
                  className="block w-full p-2 mt-2 text-white bg-green-500 rounded"
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => setModal({ ...modal, type: 'event' })}
                  className="block w-full p-2 mt-2 text-white bg-blue-500 rounded"
                >
                  Add Event
                </button>
                <button
                  onClick={() => setModal({ open: false })}
                  className="block w-full p-2 mt-2 text-white bg-red-500 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="w-full p-2 mt-2 border rounded"
                  placeholder={
                    modal.type === 'attendance'
                      ? 'Enter your name'
                      : 'Enter event title'
                  }
                  value={modal.input}
                  onChange={(e) =>
                    setModal({ ...modal, input: e.target.value })
                  }
                />
                <button
                  onClick={handleSubmit}
                  className="block w-full p-2 mt-2 text-white bg-green-600 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setModal({ open: false })}
                  className="block w-full p-2 mt-2 text-white bg-gray-500 rounded"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
