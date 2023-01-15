import * as Actions from '../actions';

//const discounts = [
//	{id:'1', title:'15 darsad takhfif', value:15},
//	{id:'2', title:'25 darsad takhfif', value:25},
//	{id:'3', title:'35 darsad takhfif', value:35},
//	{id:'4', title:'45 darsad takhfif', value:45},
//];

const initialState = {
    accdocAddUserDialog	: {
		open	: false,
		loading	: false,		
    },
    accdocAddProductDialog	: {
		open	: false,
		loading	: false,
		data	: null,
    },	
    accdocAddDiscountDialog	: {
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

const newAccdocReducer = function (state = initialState, action) {
    switch ( action.type )
    {	
        case Actions.CLOSE_ADD_ACCDOC_USER_DIALOG:
        {
            return {
                ...state,
				accdocAddUserDialog: {...state.accdocAddUserDialog, open:false}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_USER_DIALOG:
        {
            return {
                ...state,
				accdocAddUserDialog: {...state.accdocAddUserDialog, open:true}
            };
        }	
        case Actions.CLOSE_ADD_ACCDOC_PRODUCT_DIALOG:
        {
            return {
                ...state,
				accdocAddProductDialog: {...state.accdocAddProductDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_PRODUCT_DIALOG:
        {
            return {
                ...state,
				accdocAddProductDialog: {...state.accdocAddProductDialog, open:true, data:action.data}
            };
        }
        case Actions.CLOSE_ADD_ACCDOC_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				accdocAddDiscountDialog: {...state.accdocAddDiscountDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_DISCOUNT_DIALOG:
        {
            return {
                ...state,
				accdocAddDiscountDialog: {...state.accdocAddDiscountDialog, open:true, data:action.data}
            };
        }			
        case Actions.CLOSE_ADD_ACCDOC_TAX_DIALOG:
        {
            return {
                ...state,
				orderAddTaxDialog: {...state.orderAddTaxDialog, open:false, data:null}
            };
        }
        case Actions.OPEN_ADD_ACCDOC_TAX_DIALOG:
        {
            return {
                ...state,
				orderAddTaxDialog: {...state.orderAddTaxDialog, open:true, data:action.data}
            };
        }			
        case Actions.NEW_ACCDOC_ADD_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: addToList(state.addedDiscounts, action.payload),
            };
        }	
        case Actions.NEW_ACCDOC_DELETE_DISCOUNT:
        {
			
            return {
                ...state,
				addedDiscounts: state.addedDiscounts.filter(({id}) => id !== action.payload),
            };
        }			
        case Actions.NEW_ACCDOC_ADD_TAX:
        {
			
            return {
                ...state,
				addedTax: addToList(state.addedTax, action.payload),
            };
        }	
        case Actions.NEW_ACCDOC_DELETE_TAX:
        {
			
            return {
                ...state,
				addedTax: state.addedTax.filter(({id}) => id !== action.payload),
            };
        }					
        case Actions.NEW_ACCDOC_GET_USERS:
        {
            return {
                ...state,
				users: action.payload,
            };
        }		
        case Actions.NEW_ACCDOC_GET_ADDRESSES:
        {
            return {
                ...state,
				addresses: action.payload,
            };
        }
        case Actions.NEW_ACCDOC_GET_STATUS:
        {
            return {
                ...state,
				status: action.payload,
            };
        }
        case Actions.NEW_ACCDOC_GET_COMPANIS:
        {
            return {
                ...state,
				companies: action.payload,
            };
        }
        case Actions.NEW_ACCDOC_GET_PRODUCTS:
        {
            return {
                ...state,
				products: action.payload,
            };
        }	
        case Actions.NEW_ACCDOC_GET_DISCOUNTS:
        {
            return {
                ...state,
				discounts: action.payload,
            };
        }
        case Actions.NEW_ACCDOC_GET_TAX:
        {
            return {
                ...state,
				tax: action.payload,
            };
        }					
		case Actions.WAIT_NEW_ACCDOC_ADD_USER:
		{
			return {
				...state,
				accdocAddUserDialog:{...state.accdocAddUserDialog, loading:action.payload}
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

export default newAccdocReducer;
