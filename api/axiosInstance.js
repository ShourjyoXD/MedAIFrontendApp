// api/axiosInstance.js
import axios from 'axios';

// IMPORTANT: Replace this with your backend's actual IP address or deployed URL.
// If testing on a physical device, 'localhost' will not work.
// You need to find your machine's local IP address (e.g., `ipconfig` on Windows, `ifconfig` on macOS/Linux).
// Example for physical device: const API_BASE_URL = 'http://192.168.1.100:5000/api';
// Example for Android Emulator: const API_BASE_URL = 'http://10.0.2.2:5000/api';
// If deployed: const API_BASE_URL = 'https://your-deployed-backend.com/api';
const API_BASE_URL = 'https://medai-backend-1-703k.onrender.com'; // This is the standard alias for host localhost; // Common for Android Emulator to access host's localhost

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;