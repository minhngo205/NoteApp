import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchNote = (id) => API.get(`/note/${id}`);
export const fetchNotes = (page) => API.get(`/note/getall?page=${page}`);
export const fetchNotesByTag = (tag) => API.get(`/note/tag?tagQuery=${tag}`);
export const fetchNotesBySearch = (searchQuery) => API.get(`/note/search?searchQuery=${searchQuery.search}`);
export const createNote = (newNote) => API.post('/note/create', newNote);

export const importantNote = (id) => API.patch(`/note/${id}/important`);

export const updateNote = (id, updatedNote) => API.put(`/note/${id}/update`, updatedNote);
export const deleteNote = (id) => API.delete(`/note/${id}/delete`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
