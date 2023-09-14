import axios from 'axios';

const api = axios.create({
	baseURL:"http://localhost:5173/api",
	responseType:'json',
	responseEncoding:'uft8'
});

export default api;