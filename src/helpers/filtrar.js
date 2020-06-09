export default { 
 
    numero: (valor) => {        
        return valor.replace(/\D/g,'') 
    },

    letras: (valor) => {
        return valor.replace(/[^a-zA-Z záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ_]/g, '')
    },

    estaVazio: (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }

}