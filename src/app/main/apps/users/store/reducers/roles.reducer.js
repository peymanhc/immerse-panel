import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : [],
	roles             : [],
    searchText        : '',
    selectedRoleIds   : [],
    roleDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	routes: [],
};

const rolesReducer = (state = initialState, action) => {
	switch(action.type){
		case Actions.GET_ROLES:
		{
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
				roles: action.payload,
            };
		}	
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }	
        case Actions.TOGGLE_IN_SELECTED_ROLES:
        {

            const roleId = action.roleId;

            let selectedRoleIds = [...state.selectedRoleIds];

            if ( selectedRoleIds.find(id => id === roleId) !== undefined )
            {
                selectedRoleIds = selectedRoleIds.filter(id => id !== roleId);
            }
            else
            {
                selectedRoleIds = [...selectedRoleIds, roleId];
            }

            return {
                ...state,
                selectedRoleIds: selectedRoleIds
            };
        }
        case Actions.SELECT_ALL_ROLES:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedRoleIds = arr.map(role => role.id);

            return {
                ...state,
                selectedRoleIds: selectedRoleIds
            };
        }
        case Actions.DESELECT_ALL_ROLES:
        {
            return {
                ...state,
                selectedRoleIds: []
            };
        }
        case Actions.OPEN_NEW_ROLE_DIALOG:
        {
            return {
                ...state,
                roleDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_ROLE_DIALOG:
        {
            return {
                ...state,
                roleDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ROLE_DIALOG:
        {
            return {
                ...state,
                roleDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ROLE_DIALOG:
        {
            return {
                ...state,
                roleDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
		case Actions.GET_ROUTES:
		{
			return {
				...state,
				routes: action.payload,
			}
		}
		default:
		{
			return state;
		}
	}
}

export default rolesReducer;