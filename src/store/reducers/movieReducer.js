export const movieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES': {
      return [...state, ...action.payload];
    }
    case 'UPDATE_MOVIES': {
      return [...action.payload];
    }
    default:
      return state;
  }
}