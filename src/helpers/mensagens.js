







export default { 
 
    tratar: (status) => {        
        switch(status) {
            case 200:
                return {
                    id: Math.round(Math.random(2) * 1000),
                    ativo: true,    
                    tipo: 'success', 
                    destaque: 'Requisição bem sucedida!',
                    msg: 'Parece que tudo ocorreu bem no seu pedido.'
                }
                break; 
            case 201:
                return {
                    id: Math.round(Math.random(2) * 1000),
                    ativo: true,    
                    tipo: 'success', 
                    destaque: 'Dados enviados com sucesso!',
                    msg: 'Parece que tudo ocorreu bem no seu pedido.'
                }
                break;
            case 400:
                return {
                    id: Math.round(Math.random(2) * 1000), 
                    ativo: true,   
                    tipo: 'danger', 
                    destaque: 'Má requisição!',
                    msg: 'Alguma informação que você está tentando enviar, está fora dos padrões.'
                }
                break;
            case 401:
                return {
                    id: Math.round(Math.random(2) * 1000),                     
                    tipo: 'danger', 
                    destaque: 'Usuário não autorizado!',
                    msg: 'A ação que você está tentando tomar, não tem permissão para este usuário.'
                }
                break; 
            case 403:
                return {
                    id: Math.round(Math.random(2) * 1000), 
                    ativo: true,   
                    tipo: 'danger', 
                    destaque: 'Proibido!',
                    msg: 'Acesso negado, você não tem permissão para acessar o conteudo.'
                }
                break; 
            default:
                return {
                    id: Math.round(Math.random(2) * 1000), 
                    ativo: true,   
                    tipo: 'warning', 
                    destaque: 'Ops!',
                    msg: 'Algum erro fora do previsto aconteceu. Status: (' + status + ').'
                }
                break;
        }
    },

    interno: (status) => {
        switch(status) {
            case 1:
                return {    
                    id: Math.round(Math.random(2) * 1000),
                    ativo: true,      
                    tipo: 'warning', //warning, danger
                    msg: 'Leia e aceite o termo de compromisso para continuar.',
                    destaque: 'Aceite nosso termo!'
                }
            case 2:
                return {
                    id: Math.round(Math.random(2) * 1000),    
                    ativo: true,      
                    tipo: 'danger', //warning, danger
                    msg: 'Não foi feita essa parte ainda, está em desenvolvimento.',
                    destaque: 'Feature não lançada ainda.'
                }
            case 3:
                return {
                    id: Math.round(Math.random(2) * 1000),    
                    ativo: true,      
                    tipo: 'warning', //warning, danger
                    msg: 'A confirmação da senha não está igual a qual você digitou primeiramente.',
                    destaque: 'Problema na senha!'
                }
                break;
            default: 
                break;
        }
    },

    ok: (status) => {
        if(status == 200 || status == 201) {
            return true;
        }
        return false;
    },

    danger: (msg) => {
        return {
            id: Math.round(Math.random(2) * 1000),    
            ativo: true,      
            tipo: 'danger', //warning, danger
            msg,
            destaque: 'Erro na requisição!'
        }
    }

    
}