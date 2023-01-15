import * as Actions from '../actions/post';
import {ADD_IMAGE_POST, WAIT_POST} from '../actions';
import _ from '@lodash';

const propertySelected={
	propertyId: null,
	PropertyName: '',
	PropertyPrice: '',
	PropertyPercent: '',
	PropertyDescription: '',
	PropertyIcon: '',
}

const initialState = {
    data: null,
	files:[],
	loading: false,
	categoryDialog:{
		open: false
	},
	propertyDialog:{
		open: false
	},	
	categories: [],
	categoryLabels: [],
	properties: [],
	propertyLabels: [],
	propertySelected,
	propertyLabelSelected: null,
	postProperties: [],
	propertyUpdate: false,
	propertyEdit: false,
	propertyLabelFilterSelected : null,
	types:[],
};

const postReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_POST:
        {
            return {
                ...state,
                data: action.payload,
				propertyUpdate: false,
            };
        }
        case Actions.GET_TYPES:
        {
            return {
                ...state,
                types: action.payload,
            };
        }
        case Actions.SAVE_POST:
        {
            return {
                ...state,
                data: action.payload,
				files:[],
				propertyUpdate : false
            };
        }
        case Actions.GET_CATEGORY_LABELS:
        {
            return {
                ...state,
                categoryLabels: action.payload,
            };
        }        
		case Actions.GET_PROPERTY_LABELS:
        {
            return {
                ...state,
                propertyLabels: action.payload,
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories: action.payload,
            };
        }        
		case Actions.GET_PROPERTIES:
        {
            return {
                ...state,
                properties: action.payload,
            };
        }		
        case Actions.OPEN_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					open: true
                }
            };
        }
        case Actions.OPEN_NEW_PROPERTY_DIALOG:
        {
            return {
                ...state,
                propertyDialog: {
					open: true
                }
            };
        }		
        case Actions.CLOSE_NEW_CATEGORY_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
					open: false
                }
            };
        }        
		case Actions.CLOSE_NEW_PROPERTY_DIALOG:
        {
            return {
                ...state,
                propertyDialog: {
					open: false
                },
				propertyLabelSelected: null,
				propertySelected,
				propertyEdit: false,
            };
        }		
		case ADD_IMAGE_POST:
		{ 
			return {
				...state,
				files: state.files.concat(action.image)
			}
		}
		case Actions.REMOVE_IMAGE_POST:
		{ 
			const newFiles = state.files.filter(({id}) => id !== action.payload)
			return {
				...state,
				files: newFiles,
			}
		}		
		case WAIT_POST:
		{
			return {
				...state,
				loading:action.payload
			}
		}
		case Actions.SET_PROPERTY_SELECT:
		{
			return{
				...state,
				propertySelected: action.payload
			}
		}
		case Actions.SET_PROPERTY_LABEL_SELECT:
		{
			return{
				...state,
				propertyLabelSelected: action.payload,
				propertySelected				
			}
		}	
		case Actions.ADD_NEW_PROPERTY:
		{
			let data = null;
			if(state.data !== null){
				if(state.data.properties){
					//const {id, PropertyId, PropertyName, PropertyPrice, PropertyPercent, PropertyDescription, PropertyIcon, PropertyLabelId} = action.payload;
					const {id, PropertyId, PropertyLabelId} = action.payload;
					let propertyFoundById = state.data.properties.find(item => item.id === id);
					if(propertyFoundById){	
						propertyFoundById = action.payload;
						data = {...state.data};									
					}
					else{
						const propertyFound = _.find(state.data.properties, {
							PropertyId, PropertyLabelId
							//PropertyId, PropertyName, PropertyPrice, PropertyPercent, PropertyDescription, PropertyIcon, PropertyLabelId
						});
						if(propertyFound)
							data = state.data;											
						else{
							const properties = [...state.data.properties, action.payload];
							data = {...state.data, properties};							
						}						
					}						
				}
				else
					data = {...state.data, properties: [action.payload]};
			}
			return{
				...state,
				data,
				propertyUpdate: true
			}
		}	
		case Actions.REMOVE_PROPERTY:
		{
			return{
				...state,
				data: {
					...state.data,
					properties:state.data.properties.filter(item => !action.payload.includes(item.id))
				},
				propertyUpdate: true
			}
		}		
		case Actions.EDIT_PROPERTY:
		{
			return{
				...state,
				propertyEdit: true,
			}
		}
		case Actions.SET_PROPERTY_LABEL_FILTER:
		{
			return{
				...state,
				propertyLabelFilterSelected: action.payload
			}
		}
        default:
        {
            return state;
        }
    }
};

export default postReducer;
