export const actionTypes = {
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_LOADING: 'SET_LOADING',
  SET_MATCHES: 'SET_MATCHES',
  SET_ERROR: 'SET_ERROR',
  SET_AI_INSIGHTS: 'SET_AI_INSIGHTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload }
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.SET_AI_INSIGHTS:
      return {
        ...state,
        aiInsights: action.payload
      };
    case actionTypes.CLEAR_RESULTS:
      return {
        ...state,
        matches: [],
        aiInsights: null,
        error: null
      };
    default:
      return state;
  }
};

export default appReducer;
