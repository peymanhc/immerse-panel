import * as Actions from '../actions/transactionActions';

const initialState = {
	users		: [],
	gateways	: [],
	credit		: 0,
	url			: null,
};

const transaction = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USERS:
        {
            return {
                ...state,
				users: action.payload,
            };
        }	
        case Actions.GET_GATEWAYS:
        {
            return {
                ...state,
				gateways: action.payload,
            };
        }			
        case Actions.GET_CREDIT:
        {
            return {
                ...state,
				credit: action.payload,
            };
        }		
        case Actions.GET_PAYMENT_URL:
        {
            return {
                ...state,
				url: action.payload,
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default transaction;
