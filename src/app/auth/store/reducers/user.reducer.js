import * as Actions from '../actions';

const initialState = {
    role: 'guest',
    data: {
        'displayName': 'محمد مداحی',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : '09120811016',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    },
	redirect: false,
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        case Actions.USER_ACCESS_DENIED_START:
        {
            return {
				...initialState,
				redirect: true,
			};
        }
        case Actions.USER_ACCESS_DENIED_END:
        {
            return {
				...initialState,
				redirect: false,
			};
        }		
        default:
        {
            return state
        }
    }
};

export default user;
