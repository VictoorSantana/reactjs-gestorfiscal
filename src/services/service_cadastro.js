
import { API_URL_BASE, LOCAL_STORAGE_VAR } from '../helpers/globalvar';
import axios from 'axios';

export default {
        
    registrer: async (data) => {
        return axios.post(API_URL_BASE + '/auth/register', data)
        .then(res => {          
          return res;
        }).catch(function (error) {
          return error.response;
        }); 
    }
}