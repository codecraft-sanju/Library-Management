import { Menu } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import React from 'react';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <h1 className="text-xl font-bold">📚 Library Management</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <Menu size={30} />
        </button>
        <ul className="hidden space-x-6 md:flex">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Books</li>
          <li className="cursor-pointer hover:underline">Attendance</li>
          <li className="cursor-pointer hover:underline">Events</li>
        </ul>
      </nav>

      {sidebarOpen && <Sidebar closeSidebar={() => setSidebarOpen(false)} />}
    </>
  );
}
