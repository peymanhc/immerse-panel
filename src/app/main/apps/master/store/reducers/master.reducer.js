import * as Actions from '../actions';

const initialState = {
    data		: null,
	loading		: false,
	cities 		: [],
	roles  		: [],
	companies  	: [],
};

const masterReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MASTER:
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
		case Actions.GET_ROLES:
        {
            return {
                ...state,
                roles: action.payload
            };
        }
		case Actions.GET_COMPANIES:
        {
            return {
                ...state,
                companies: action.payload
            };
        }		
        case Actions.SAVE_MASTER:
        {
            return {
                ...state,
                data: action.payload
            };
        }
		case Actions.WAIT_MASTER:
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

export default masterReducer;
