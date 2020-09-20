export const initialState = {
  user: null,
  sidebar: true,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.OPEN_SIDEBAR:
      return { ...state, sidebar: true };
    case actionTypes.CLOSE_SIDEBAR:
      return { ...state, sidebar: false };
    default:
      return state;
  }
};

export default reducer;
