import _ from "@lodash";
import * as Actions from "../actions";

const initialState = {
  entities: [],
  searchText: "",
  orderBy: "order",
  orderDescending: false,
  otherPagesDialog: {
    type: "new",
    props: {
      open: false
    },
    data: null
  },
  loading: false
};

const otherPagesReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_OTHER_PAGES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, "id"),
        searchText: ""
      };
    }
    case Actions.OPEN_NEW_OTHER_PAGES_DIALOG: {
      return {
        ...state,
        otherPagesDialog: {
          type: "new",
          props: {
            open: true
          },
          data: null
        }
      };
    }

    case Actions.CLOSE_NEW_OTHER_PAGES_DIALOG: {
      return {
        ...state,
        otherPagesDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_OTHER_PAGES_DIALOG: {
      return {
        ...state,
        otherPagesDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_OTHER_PAGES_DIALOG: {
      return {
        ...state,
        otherPagesDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.UPDATE_OTHER_PAGES: {
      const otherPages = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [otherPages.id]: { ...otherPages }
        }
      };
    }
    case Actions.SET_OTHER_PAGES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.TOGGLE_OTHER_PAGES_ORDER_DESCENDING: {
      return {
        ...state,
        orderDescending: !state.orderDescending
      };
    }
    case Actions.CHANGE_OTHER_PAGES_ORDER: {
      return {
        ...state,
        orderBy: action.orderBy
      };
    }
    case Actions.WAIT_OTHER_PAGES: {
      return {
        ...state,
        loading: action.payload
      };
    }
    default:
      return state;
  }
};

export default otherPagesReducer;
