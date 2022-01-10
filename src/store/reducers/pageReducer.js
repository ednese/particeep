export const pageReducer = (state = { items: 12, index: 1 }, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}