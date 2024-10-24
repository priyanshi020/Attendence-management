import axios from "axios";

// const API_URL='http://localhost:8888';
// export const API_URL = 'http://10.0.2.2:8888';

const IMAGE_PATH='http://localhost:8888/uploads'


export default Instance = axios.create({
    baseURL:'http://192.168.250.200:8888/'
})