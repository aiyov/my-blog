import {
  CHANGCOLOR,
  CHANGAGE,
  CHANGNAME
} from '../constants/canvas'

export const changeColor = (color) => {
  return {
    type: CHANGCOLOR,
    color
  }
}

export const changeName = (name) => {
  return {
    type: CHANGNAME,
    name
  }
}

export const changeAge = (age) => {
  return {
    type: CHANGAGE,
    age
  }
}
// 异步的action
export function asyncChangeName (name) {
  return dispatch => {
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        dispatch(changeName(name))
        reject()
      },1000)
    })
  }
}
