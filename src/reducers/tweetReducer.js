import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_TWEETS_BEGIN:
            return {
              ...state,
              loading: false,
              error: null
            };
      
        case actionTypes.FETCH_TWEETS_SUCCESS:
            initialState.items = action.payload.tweets;
            return {
              ...state,
              loading: false,
              items: action.payload.tweets
            };

        case actionTypes.FETCH_TWEETS_FAILURE:
            console.error(action);
            console.error(action.payload);
            console.error(action.payload.error);
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
            };

        // case actionTypes.FILTER_TWEETS:
        //     let filteresTweets = initialState.items.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(action.searchValue.toLowerCase())));
        //     return {
        //         items: filteresTweets,
        //         loading: false,
        //         error: null
        //     };
        default:
            return state;
    }
};
