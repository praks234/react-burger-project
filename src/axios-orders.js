import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-project-5d230.firebaseio.com/'
});

export default instance;
