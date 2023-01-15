import * as Actions from '../actions';

const initialState = {
    data		: null,
	loading		: false,
	cities		: [],
};

const discountReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DISCOUNT:
        {
            return {
                ...state,
                data: action.payload
            };
        }        		
        case Actions.SAVE_DISCOUNT:
        {
            return {
                ...state,
                data: action.payload
            };
        }
		case Actions.GET_CITIES:
        {
            return {
                ...state,
                cities: action.payload
            };
        }		
		case Actions.WAIT_DISCOUNT:
		{
			return {
				...state,
				loading: action.payload
			}
		}		
        default:
        {
            return state;
        }
    }
};

export default discountReducer;
