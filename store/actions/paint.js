import {
  CHANGCOLOR,
} from '../constants/canvas'

export const changeColor = (color) => {
  return {
    type: CHANGCOLOR,
    color
  }
}
// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(minus())
    }, 2000)
  }
}
