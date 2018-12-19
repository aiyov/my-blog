import {CHANGCOLOR} from '../constants/canvas'

const INITIAL_STATE = {
  color: '#fff001'
}

export default function canvas(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGCOLOR:
      return {
        ...state,
        color: action.color
      }
    default:
      return state
  }
}
