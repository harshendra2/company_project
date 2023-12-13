import axios from 'axios';

const instance = axios.create({
    baseURL: "https://server-8nqa.onrender.com/",
    timeout: 100000,

})
export default instance;