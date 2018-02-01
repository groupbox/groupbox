import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import current from './current'
import videos from './videos'
import currentRoom from './room'
import rooms from './rooms'
import NewRoomEntry from './NewRoomEntry'

const reducer = combineReducers({user, current, videos, currentRoom, rooms, NewRoomEntry})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './current'
export * from './videos'
export * from './room'
export * from './rooms'
export * from './NewRoomEntry'
