import * as Actions from '../actions';
import _ from '@lodash';

const form = {
	id: null,
	displayName: '',
	email : '',
	password: '',
	city: null,
}
const initialState = {
	form,
    entities          : [],
    searchText        : '',
    selectedCountryIds   : [],
    routeParams       : {},
    countryDialog     : {
        type : 'new',
		open: false,
        props: {
            open: false
        },
        data : null
    },
	countries:[],
	loading: false,	
};

const countriesReducer = (state = initialState, action) => {
	switch(action.type){
		case Actions.GET_COUNTRIES:
		{
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                routeParams: action.routeParams,
				countries:action.payload,
            };
		}	
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }	
        case Actions.TOGGLE_IN_SELECTED_COUNTRIES:
        {

            const countryId = action.countryId;

            let selectedCountryIds = [...state.selectedCountryIds];

            if ( selectedCountryIds.find(id => id === countryId) !== undefined )
            {
                selectedCountryIds = selectedCountryIds.filter(id => id !== countryId);
            }
            else
            {
                selectedCountryIds = [...selectedCountryIds, countryId];
            }

            return {
                ...state,
                selectedCountryIds: selectedCountryIds
            };
        }
        case Actions.SELECT_ALL_COUNTRIES:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedCountryIds = arr.map(country => country.id);

            return {
                ...state,
                selectedCountryIds: selectedCountryIds
            };
        }
        case Actions.DESELECT_ALL_COUNTRIES:
        {
            return {
                ...state,
                selectedCountryIds: []
            };
        }
        case Actions.OPEN_NEW_COUNTRY_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_COUNTRY_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_COUNTRY_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_COUNTRY_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.OPEN_COUNTRIES_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
					open: true
                }
            };
        }		
        case Actions.CLOSE_COUNTRIES_DIALOG:
        {
            return {
                ...state,
                countryDialog: {
					open: false
                },
				form
            };
        }
		case Actions.SELECT_COUNTRY:
		{
			return {
				...state,
				form: action.payload,
			}
		}
		case Actions.WAIT_COUNTRIES:
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
}

export default countriesReducer;