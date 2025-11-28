import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

export default axios;