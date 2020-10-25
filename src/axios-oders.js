import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-app-d91a6.firebaseio.com/'
})

export default instance;