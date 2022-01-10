import { combineReducers, createStore } from 'redux'
import { movieReducer } from './reducers/movieReducer'
import { pageReducer } from './reducers/pageReducer'

const store = createStore (
  combineReducers({
    movies: movieReducer,
    page: pageReducer
  })
)

export default store