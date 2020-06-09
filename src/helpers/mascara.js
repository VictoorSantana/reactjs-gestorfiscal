export default { 
 
    celular: (event) => {   
        
        var result = event.target.value;
        event.target.maxLength = 16

        result = result.replace(/\D/g,"")                 //Remove tudo o que não é dígito                
        result = result.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos                
        result = result.replace(/(\d{1})(\d{4})(\d{4})/,"$1 $2-$3")    //Coloca hífen entre o quarto e o quinto dígitos    
        
        event.target.value = result;
        //return '';
    },

    letras: (event) => {           
        var result = event.target.value; 

        result = result.replace(/[^a-zA-Z záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ_]/g, '');

        event.target.value = result;        
    }
    
    
}