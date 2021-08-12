let initState = { user: null, authError: null, loading: true };

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHECKING":
      return { ...state, loading: true };
    case "CHECKED":
      return { ...state, loading: false };
    case "ERROR_SIGNING_UP":
      return { ...state, authError: action.error.code, user: null };
    case "ERROR_LOGGING_IN":
      return { ...state, authError: action.error.code, user: null };
    case "SIGNING_UP":
      return { ...state, authError: null, user: null };
    case "LOGGING_IN":
      return { ...state, authError: null, user: action.user };
    case "FETCH_USER":
      return {
        ...state,
        user: action.user,
        authError: null,
      };
    case "SIGN_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
