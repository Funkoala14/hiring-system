import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
    baseURL: '/v1/api',
    withCredentials: true, // Include cookies if needed
});

// Handle GET requests
const get = async (url, params = {}) => {
    const res = await api.get(url, { params });
    return res.data;
};

// Handle POST requests for JSON data
const post = async (url, data, isMultipart = false) => {
    const headers = isMultipart
        ? { 'Content-Type': 'multipart/form-data' } // For file uploads
        : { 'Content-Type': 'application/json' };  // For JSON data

    const res = await api.post(url, data, { headers });
    return res.data;
};

// Handle PUT requests
const put = async (url, data) => {
    const res = await api.put(url, data, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
};

// Handle DELETE requests
const del = async (url) => {
    const res = await api.delete(url);
    return res.data;
};

export { get, post, put, del };
