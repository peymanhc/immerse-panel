import * as Actions from '../actions';

const data = {
	id						: null,
	languageId				: null,
	languageRtl				: false,
	siteTitle				: '',
	siteDescription			: '',
	siteTags				: [],
	languageColors			: '',
	sliderId				: '',
	applicationLanguageId	: '',
	applicationLanguageRtl	: false,
	siteLogo				: '',
	siteBackground			: '',
	siteFavIco				: '',
	siteStatus				: true,
	panelLanguage			: 'en',
	siteBaner1				: '',
	siteBaner2				: '',
	siteBaner3				: '', 
	siteBaner4				: '',
	serviceTel				: '(+51) 384-66685',
	contactDescription		: '',
	contactAddress			: '',
	contactEmail			: '',
	contactPhone			: '',
	contactHourse			: '',
	aboutContent1			: '',
	aboutContent2			: '',
	gatewayCallback			: 'http://5.63.13.165',
	gatewayDescription		: 'Toospakhsh Market',
    distanceMatrixVal            : '',
    CountMaster           : '',
    hardLimit           : '',
    newBookingMaxSearchTime           : '',
    TripMaster : '',
    surgePrice : '',
      andCust :'',
             iosCust : '',
             andDriver : '',
             iosDriver : '',
             mandatory : '',
             updatelink : '',

};

const initialState = {
    data,
	languages	: [],
	loading		: false,
	currencies	: [],
    currencyDialog: {
		type : 'new',
		props:{
			open: false,
		},
		data: null,
    },	
};

const settingReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SETTING:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_CURRENCIES:
        {
            return {
                ...state,
                currencies: action.payload
            };
        }		
        case Actions.GET_LANGUAGES:
        {
            return {
                ...state,
                languages: action.payload
            };
        }		
        case Actions.SAVE_SETTING:
        {
            return {
                ...state,
                data: action.payload
            };
        }
		case Actions.WAIT_SETTING:
		{
			return {
				...state,
				loading: action.payload
			}
		}
        case Actions.CLOSE_ADD_CURRENCY_DIALOG:
        {
            return {
                ...state,
				currencyDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
				}
            };
        }
        case Actions.OPEN_ADD_CURRENCY_DIALOG:
        {
            return {
                ...state,
				currencyDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
				}
            };
        }
        case Actions.OPEN_EDIT_CURRENCY_DIALOG:
        {
            return {
                ...state,
				currencyDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
				}
            };
        }
        case Actions.CLOSE_EDIT_CURRENCY_DIALOG:
        {
            return {
                ...state,
				currencyDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
				}
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default settingReducer;
