import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, CheckCircle, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { markAttendance, addEvent, getAttendance, getEvents } from './api';

export default function LibraryManagement() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [inputValue, setInputValue] = useState('');

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
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (modalType === 'attendance' && inputValue) {
      await markAttendance(inputValue, selectedDate);
    } else if (modalType === 'event' && inputValue) {
      await addEvent(inputValue, selectedDate);
    }
    setModalOpen(false);
    setInputValue('');
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600">
        <h1 className="text-xl font-bold">Library Management</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
        <ul className="hidden space-x-4 md:flex">
          <li>Home</li>
          <li>Books</li>
          <li>Attendance</li>
          <li>Events</li>
        </ul>
      </nav>

      {/* Calendar Section */}
      <div className="container p-4 mx-auto my-8">
        <h2 className="flex items-center mb-4 text-2xl font-bold">
          <Calendar className="mr-2" /> Events & Attendance
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
        />
      </div>

      {/* Modal for Attendance/Event */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalType === 'attendance' ? 'Mark Attendance' : 'Add Event'}
        </DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder={
              modalType === 'attendance'
                ? 'Enter your name'
                : 'Enter event title'
            }
            className="w-full p-2 border rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
