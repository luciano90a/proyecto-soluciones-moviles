
// Get_users.js
import axios from 'axios';

const users = axios.create({
  baseURL: 'http://192.168.56.1:8000', // Ajusta la URL base según tu configuración
});

export default users;





