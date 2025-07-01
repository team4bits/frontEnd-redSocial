const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";
const API_PORT = import.meta.env.VITE_API_PORT || "3001";

export const API_URL = `${API_BASE_URL}:${API_PORT}`;

export const apiEndpoints = {
  users: '/users',
  posts: '/posts',
  comments: '/comments'
};
