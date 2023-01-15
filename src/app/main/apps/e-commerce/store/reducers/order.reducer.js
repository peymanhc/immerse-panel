import * as Actions from '../actions';

const initialState = {
    orderAddStatusDialog: {
		open: false,
    },
    orderAddPriceDialog: {
		open: false,
    },
    orderShowImageDialog: {
		open: false,
    },
	orderStatus			: [],
	order				: null,
	statusOrderImageLoading: false,
};

const orderReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ORDER:
        {
            return {
                ...state,
				order:action.payload
            };
        }
        case Actions.SAVE_ORDER:
        {
            return {
                ...state,
				order:action.payload
            };
        }
        case Actions.GET_ORDER_STATUS:
        {  
            return {
                ...state,
                orderStatus: action.payload
            };
        }		
        case Actions.CLOSE_ADD_ORDER_STATUS_DIALOG:
        {
            return {
                ...state,
				orderAddStatusDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_ORDER_STATUS_DIALOG:
        {
            return {
                ...state,
				orderAddStatusDialog: {open:true}
            };
        }	
        case Actions.CLOSE_ADD_ORDER_PRICE_DIALOG:
        {
            return {
                ...state,
				orderAddPriceDialog: {open:false}
            };
        }
        case Actions.OPEN_ADD_ORDER_PRICE_DIALOG:
        {
            return {
                ...state,
				orderAddPriceDialog: {open:true}
            };
        }	

        case Actions.CLOSE_ORDER_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				orderShowImageDialog: {open:false}
            };
        }
        case Actions.OPEN_ORDER_SHOW_IMAGE_DIALOG:
        {
            return {
                ...state,
				orderShowImageDialog: {open:true}
            };
        }
		case Actions.WAIT_ORDER_STATUS:
		{
			return {
				...state,
				statusOrderImageLoading: action.payload
			}
		}		
        default:
        {
            return state;
        }
    }
};

export default orderReducer;
