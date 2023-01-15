import * as Actions from '../actions';

const initialState = {
    data		: null,
	loading		: false,
	cities 		: [],
    provinces   : [],
	roles  		: [],
};

const companyReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COMPANY:
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

    case Actions.GET_PROVINCES:
        {
            return {
                ...state,
                provinces: action.payload
            };
        }

        


		case Actions.GET_ROLES:
        {
            return {
                ...state,
                roles: action.payload
            };
        }
        case Actions.SAVE_COMPANY:
        {
            return {
                ...state,
                data: action.payload
            };
        }
		case Actions.WAIT_COMPANY:
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

export default companyReducer;
