import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

export default function Sidebar({ closeSidebar }) {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      exit={{ x: -250 }}
      className="fixed top-0 left-0 w-64 h-full p-5 text-white bg-blue-600 shadow-lg"
    >
      <button onClick={closeSidebar} className="absolute top-3 right-3">
        <X size={25} />
      </button>
      <ul className="mt-10 space-y-4">
        <li className="cursor-pointer hover:underline">Home</li>
        <li className="cursor-pointer hover:underline">Books</li>
        <li className="cursor-pointer hover:underline">Attendance</li>
        <li className="cursor-pointer hover:underline">Events</li>
      </ul>
    </motion.div>
  );
}
