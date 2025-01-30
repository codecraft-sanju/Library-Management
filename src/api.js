import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const markAttendance = (name, date) =>
  axios.post(`${API_URL}/attendance`, { name, date });

export const addEvent = (title, date) =>
  axios.post(`${API_URL}/events`, { title, date });

export const getAttendance = () => axios.get(`${API_URL}/attendance`);
export const getEvents = () => axios.get(`${API_URL}/events`);



