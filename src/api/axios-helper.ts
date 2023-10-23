import axiosClass from 'axios';

const axios = axiosClass.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  response => {
    // Successful responses
    return response;
  },
  error => {
    if (error.response && error.response.status === 404) {
      // Handle not found situation
      return { data: { status: 404 }}
    }
    // You can also handle other errors here if needed

    return Promise.reject(error);
  }
);

export default axios;
