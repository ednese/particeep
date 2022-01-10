export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_CATEGORIES': {
      return [...action.payload];
    }
    default:
      return state;
  }
}