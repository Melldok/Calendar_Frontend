
import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'


// Crear la conexion


const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})











// TODO : Configurar interceptores
calendarApi.interceptors.request.use( config => {
    // Checkear el tokern del usuario y colocarlo en localstorage para que no tenga que revalidar reiteradamente
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})
 

export default calendarApi;