
import { API_URL_BASE, LOCAL_STORAGE_VAR } from '../helpers/globalvar';

import axios from 'axios';

export default {
//https://api.dev.gestorsistemas.com/api/users?search=root&limit=10&page=1


    index: async (_filtro, _porPagina, _pagina) => {

      const localstorage_item = await localStorage.getItem(LOCAL_STORAGE_VAR)            
      const token = 'Bearer ' + localstorage_item.split('|')[1];

      const filtro = _filtro ? ("search=" + _filtro + "&") : ('search&');
      const porPagina = _porPagina ? ("limit=" + _porPagina + "&") : ('limit&');
      const pagina = _pagina ? ("page=" + _pagina) : ('page&');

        //console.log(API_URL_BASE + '/users?' + filtro + porPagina + pagina);

        return await axios.get(API_URL_BASE + '/users?' + filtro + porPagina + pagina,  
                                                { headers: { Authorization: token } } )
        .then(res => {
            return res;              
        }).catch(function (error) {
        return error.response;
        });  

    },


    store: async (data) => {

        const localstorage_item = await localStorage.getItem(LOCAL_STORAGE_VAR);         
        const token = 'Bearer ' + localstorage_item.split('|')[1];
          
        return axios.post(API_URL_BASE + '/users', data, { headers: { Authorization: token } })
        .then(res => {          
          return res;
        }).catch(function (error) {
          return error.response;
        }); 
  
      },
      
}