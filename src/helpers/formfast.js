export default { 
 
    getJson: (target) => {        
        var object = {};
        const formData = new FormData(target);        

        formData.forEach(function(value, key) {
            object[key] = value
        });

        return JSON.stringify(object)
    },

    getObject: (target) => {        
        var object = {};
        const formData = new FormData(target);

        formData.forEach(function(value, key) {
            object[key] = value
        });

        return object
    },

    estaVazio: (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }
    
}