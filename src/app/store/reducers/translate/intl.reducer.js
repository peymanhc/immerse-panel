import * as Actions from '../../actions/translate/intl.actions';

const initialState = {
	locale: 'fa',
};

const intl = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_LOCALE:
        {
            return {
                ...state,
                locale: action.payload
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default intl;
