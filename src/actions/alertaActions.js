export const ADD_ALERTA = 'alertas:addAlerta';
export const REMOVE_ALERTA = 'alertas:removeAlerta';

export function addAlerta(novoAlerta) {
    return {
        type: ADD_ALERTA,
        payload: {
            alerta: novoAlerta
        }
    }
}

export function removeAlerta(id) {
    return {
      type: REMOVE_ALERTA,
      payload: id
    }
  }