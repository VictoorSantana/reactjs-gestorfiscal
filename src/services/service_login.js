
import { API_URL_BASE, LOCAL_STORAGE_VAR } from '../helpers/globalvar';

import axios from 'axios';

export default {


    postLogin: async (data) => {
        
        return axios.post(API_URL_BASE + '/auth/login', data)
        .then(res => {          
          return res;
        }).catch(function (error) {
          return error.response;
        }); 

    },

    whoami: async () => {
      
      const localstorage_item = await localStorage.getItem(LOCAL_STORAGE_VAR)            
      const token = 'Bearer ' + localstorage_item.split('|')[1];

        return await axios.get(API_URL_BASE + '/auth/whoami',  { headers: { Authorization: token } } )
        .then(res => {
            if(res.status == 200) {
              return res.data;
            } else {
              window.location.reload();
              localStorage.removeItem(LOCAL_STORAGE_VAR);
              return res;
            }                   
        }).catch(function (error) {
          window.location.reload();
          localStorage.removeItem(LOCAL_STORAGE_VAR);
          return error.response;
        });         
       
    }
}