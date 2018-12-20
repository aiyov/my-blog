import {CHANGCOLOR, CHANGNAME, CHANGAGE} from '../constants/canvas'

const INITIAL_STATE = {
  color: '#fff001',
  name: 'aiyov',
  age: 18
}

export default function canvas(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGCOLOR:
      return {
        ...state,
        color: action.color
      }
    case CHANGNAME:
      return {
        ...state,
        name: action.name
      }
    case CHANGAGE:
      return {
        ...state,
        age: action.age
      }
    default:
      return state
  }
}
