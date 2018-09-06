import * as actionTypes from './actionTypes';

export const fetchTweetsSuccess = tweets => ({
  type: actionTypes.FETCH_TWEETS_SUCCESS,
  payload: { tweets }
});

export const fetchTweetsError = error => ({
  type: actionTypes.FETCH_TWEETS_FAILURE,
  payload: { error }
});

export function fetchTweets() {
    
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        return dispatch => {
          return fetch("http://localhost:3001/api/tweets/", sendData)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log(json);
            //   dispatch(fetchTweetsSuccess(json.statuses));
              dispatch(fetchTweetsSuccess(json));
            //   return json.statuses;
              return json;
            })
            // .catch(error => dispatch(fetchTweetsError(error)));
        };
}
  
function handleErrors(response) {
    if (!response.ok) {
        console.error(response);
        throw Error(response.statusText);
    }
    return response;
}