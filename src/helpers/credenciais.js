

import { LOCAL_STORAGE_VAR } from './globalvar';
import ServiceLogin from '../services/service_login';

export default { 
 
    temToken: () => {
        //Nesse metodo irá checar se o cliente tem o token gravado no local storage do navegado

        const token = localStorage.getItem(LOCAL_STORAGE_VAR);   

        let isAuth = false;
        if (token !== null && token !== undefined) {
            if(token.trim().length > 0) {
                isAuth = true;
            } else {
                isAuth = false;
            }
        }

        return isAuth;
        
    },

    acessoValido: async () => {
        const acesso = await ServiceLogin.acessoValido();
        return acesso;
    }
}