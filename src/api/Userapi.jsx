import axios from "axios";
const Userapi = axios.create({
    baseURL: 'http://0.0.0.0:8000', // Ajusta la URL base según tu configuración
  });
export default Userapi;