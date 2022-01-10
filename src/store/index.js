import { combineReducers, createStore } from 'redux'
import { movieReducer } from './reducers/movieReducer'
import { pageReducer } from './reducers/pageReducer'
import { categoriesReducer } from './reducers/categoriesReducer'

const store = createStore (
  combineReducers({
    categories: categoriesReducer,
    movies: movieReducer,
    page: pageReducer,
  })
)

export default store