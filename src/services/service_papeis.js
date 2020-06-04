
import { API_URL_BASE, LOCAL_STORAGE_VAR } from '../helpers/globalvar';

import axios from 'axios';

export default {

    index: async (pagina) => {

      const localstorage_item = await localStorage.getItem(LOCAL_STORAGE_VAR)            
      const token = 'Bearer ' + localstorage_item.split('|')[1];

        return await axios.get(API_URL_BASE + '/roles?limit=5&page=' + pagina,  { headers: { Authorization: token } } )
        .then(res => {
              return res;              
        }).catch(function (error) {
          return error.response;
        });  

    },

    store: async (data) => {
        
      return axios.post(API_URL_BASE + '/roles', data)
      .then(res => {          
        return res;
      }).catch(function (error) {
        return error.response;
      }); 

  },
}