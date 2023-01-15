import * as Actions from '../actions';

const initialState = {
    data      : [],
	center: [],
	zoom: 14,
	id: null
};

const locationsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_LOCATIONS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_LOCATIONS:
        {
            return {
                ...state,
                center: action.payload
            };
        }
        case Actions.ZOOM_LOCATIONS:
        {
            return {
                ...state,
                zoom: action.payload
            };
        }	
        case Actions.ID_LOCATIONS:
        {
            return {
                ...state,
                id: action.payload
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default locationsReducer;