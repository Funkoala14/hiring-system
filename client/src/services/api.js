import axios from "axios";

const api = axios.create({
    baseURL: "/v1/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors in the response
        if (error.response) {
            // monitor /verify
            if (error.response.status === 401 && error.config.url === "/user/verify") {
                if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
                    window.location.href = "/login";
                }
            }

            // The request was made and the server responded with a status code
            console.error("API Error Response:", error.response.status, error.response.data.message);
            // alert(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("API Error Request:", error.request);
            // alert('Network error: No response from server');
        } else {
            // Something happened in setting up the request
            console.error("API Error Message:", error.message);
            // alert('Error: ' + error.message);
        }
        return Promise.reject(error); // Reject the promise
    }
);

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
