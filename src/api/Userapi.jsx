import axios from "axios";
const Userapi = axios.create({
    baseURL: 'http://192.168.1.150:8000', // Ajusta la URL base según tu configuración
  });
export default Userapi;