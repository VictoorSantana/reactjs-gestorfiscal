import {ADD_ALERTA, REMOVE_ALERTA} from '../actions/alertaActions';

const initialUserState = {
    arr:[]
}

export default function alertaState(state = initialUserState, action)
{
    switch (action.type)
    {
        case ADD_ALERTA: 
            return [...state, action.payload.alerta]
        case REMOVE_ALERTA:
            let newArr = [...state.filter((elem, idx) => { // [1,2,3,5]
                return idx !== action.payload.id
              })];
            return newArr;
        default:
            return state
    }
}