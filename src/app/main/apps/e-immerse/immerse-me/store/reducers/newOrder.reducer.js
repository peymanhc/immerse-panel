import * as Actions from '../actions';

//const discounts = [
//	{id:'1', title:'15 darsad takhfif', value:15},
//	{id:'2', title:'25 darsad takhfif', value:25},
//	{id:'3', title:'35 darsad takhfif', value:35},
//	{id:'4', title:'45 darsad takhfif', value:45},
//];

const initialState = {
    orderAddUserDialog	: {
		open	: false,
		loading	: false,		
    },
    orderAddProductDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },	
    orderAddDiscountDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },	
    orderAddTaxDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },		
	users				: [],
	addresses			: [],	
	status				: [],	
	companies			: [],	
	products			: [],	
	discounts			: [],
	addedDiscounts		: [],
	addedTax			: [],
	tax					: [],
};

const newOrderReducer = function (state = initialState, action) {
    switch ( action.type )
    {	
        case Actions.CLOSE_ADD_ORDER_USER_DIALOG:
        {
            return {
                ...state,
				orderAddUserDialog: {...state.orderAddUserDialog, open:false}
            };
        }
        case Actions.OPEN_ADD_ORDER_USER_DIALOG:
        {
            return {
                ...state,
				orderAddUserDialog: {...state.orderAddUserDialog, open:true}
            };
        }	
        case Actions.CLOSE_ADD_ORDER_PRODUCT_DIALOG:
        {
            return {
                ...state,
				orderAddProductDialog: {...state.orderAddProductDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ORDER_PRODUCT_DIALOG:
        {
            return {
                ...state,
				orderAddProductDialog: {...state.orderAddProductDialog, open:true, data:action.data}
            };
        }
        case Actions.CLOSE_ADD_ORDER_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				orderAddDiscountDialog: {...state.orderAddDiscountDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ORDER_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				orderAddDiscountDialog: {...state.orderAddDiscountDialog, open:true, data:action.data}
            };
        }			
        case Actions.CLOSE_ADD_ORDER_TAX_DIALOG:
        {
            return {
                ...state,
				orderAddTaxDialog: {...state.orderAddTaxDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ORDER_TAX_DIALOG:
        {
            return {
                ...state,
				orderAddTaxDialog: {...state.orderAddTaxDialog, open:true, data:action.data}
            };
        }			
        case Actions.NEW_ORDER_ADD_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: addToList(state.addedDiscounts, action.payload),
            };
        }	
        case Actions.NEW_ORDER_DELETE_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: state.addedDiscounts.filter(({id}) => id !== action.payload),
            };
        }			
        case Actions.NEW_ORDER_ADD_TAX:
        {
			
            return {
                ...state,
				addedTax: addToList(state.addedTax, action.payload),
            };
        }	
        case Actions.NEW_ORDER_DELETE_TAX:
        {
			
            return {
                ...state,
				addedTax: state.addedTax.filter(({id}) => id !== action.payload),
            };
        }					
        case Actions.NEW_ORDER_GET_USERS:
        {
            return {
                ...state,
				users: action.payload,
            };
        }		
        case Actions.NEW_ORDER_GET_ADDRESSES:
        {
            return {
                ...state,
				addresses: action.payload,
            };
        }
        case Actions.NEW_ORDER_GET_STATUS:
        {
            return {
                ...state,
				status: action.payload,
            };
        }
        case Actions.NEW_ORDER_GET_COMPANIS:
        {
            return {
                ...state,
				companies: action.payload,
            };
        }
        case Actions.NEW_ORDER_GET_PRODUCTS:
        {
            return {
                ...state,
				products: action.payload,
            };
        }	
        case Actions.NEW_ORDER_GET_DISCOUNTS:
        {
            return {
                ...state,
				discounts: action.payload,
            };
        }
        case Actions.NEW_ORDER_GET_TAX:
        {
            return {
                ...state,
				tax: action.payload,
            };
        }					
		case Actions.WAIT_NEW_ORDER_ADD_USER:
		{
			return {
				...state,
				orderAddUserDialog:{...state.orderAddUserDialog, loading:action.payload}
			}
		}		
        default:
        {
            return state;
        }
    }
};

const addToList = (list, object) => {
	
	const findIndex = list.findIndex(({id}) => id === object.id);
	if(findIndex !== -1){
		const newList = [
			...list.slice(0, findIndex),
			object,
			...list.slice(findIndex + 1)
		];
		return newList;
	}
	else
		return [...list, object];
	
};

export default newOrderReducer;
