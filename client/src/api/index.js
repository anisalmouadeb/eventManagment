import axios from 'axios';

const url = 'http://localhost:5000/events';

export const fetchEvents = (page) => axios.get(`${url}?page=${page}`);
export const fetchEvent = (id) => axios.get(`${url}/event/${id}`);
export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&locations=${searchQuery.locations}`);
export const createEvent = (newEvent) => axios.post(url,newEvent);
export const updateEvent = (id, updatedEvent )=>axios.patch(`${url}/${id}`,updatedEvent);
export const deleteEvent = (id) => axios.delete(`${url}/${id}`);