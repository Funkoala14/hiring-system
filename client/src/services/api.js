import axios from 'axios';

const api = axios.create({
    baseURL: '/v1/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors in the response
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('API Error Response:', error.response);
            alert(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Error Request:', error.request);
            alert('Network error: No response from server');
        } else {
            // Something happened in setting up the request
            console.error('API Error Message:', error.message);
            alert('Error: ' + error.message);
        }
        return Promise.reject(error); // Reject the promise
    }
);

// Define common HTTP methods
const get = async (url, params = {}) => {
    return await api.get(url, { params }); // Handle query parameters
};

const post = async (url, data) => {
    return await api.post(url, data); // Handle post requests
};

const put = async (url, data) => {
    return await api.put(url, data); // Handle put requests
};

const del = async (url) => {
    return await api.delete(url); // Handle delete requests
};

export { get, post, put, del };
