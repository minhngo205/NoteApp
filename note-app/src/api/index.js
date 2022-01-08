import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/note/${id}`);
export const fetchPosts = (page) => API.get(`/note/getall?page=${page}`);
export const fetchPostsByTag = (tag) => API.get(`/note/tag?tagQuery=${tag}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/note/search?searchQuery=${searchQuery.search}`);
export const createPost = (newPost) => API.post('/note/create', newPost);

export const importantPost = (id) => API.patch(`/note/${id}/important`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const updatePost = (id, updatedPost) => API.put(`/note/${id}/update`, updatedPost);
export const deletePost = (id) => API.delete(`/note/${id}/delete`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
