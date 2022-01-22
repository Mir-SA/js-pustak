import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { persist } from '../middlewares/persist-middleware'

export const store = createStore(reducers, {}, applyMiddleware(persist, thunk))

