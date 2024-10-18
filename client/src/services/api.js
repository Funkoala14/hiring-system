import axios from 'axios';

const api = axios.create({
    baseURL: '/v1/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define common HTTP methods
const get = async (url, params = {}) => {
    const res = await api.get(url, { params });
    return res.data; // Handle post requests
};

const post = async (url, data) => {
    const res = await api.post(url, data);
    return res.data; // Handle post requests
};

const put = async (url, data) => {
    const res = await api.put(url, data); // Handle put requests
    return res.data; 
};

const del = async (url) => {
    const res = await api.delete(url); // Handle delete requests
    return res.data; 
};

export { get, post, put, del };
