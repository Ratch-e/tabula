import { combineReducers } from 'redux'
import persons from './persons'
import occupations from './occupations'


export default combineReducers({
  persons,
  occupations
});