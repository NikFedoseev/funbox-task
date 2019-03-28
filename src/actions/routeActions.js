export const ADD_POINT = 'ADD_POINT';
export const REMOVE_POINT = 'REMOVE_POINT';
export const DRAG_POINT = 'DRAG_POINT';
export const REORGANIZE_POINTS = 'REORGANIZE_POINTS';
export const CHANGE_TYPE = 'CHANGE_TYPE';

export function addPoint (payload) {
  return dispatch => 
    dispatch ({
      type: ADD_POINT,
      payload: payload
    })
}

export function removePoint (payload) {
  return dispatch => 
    dispatch ({
      type: REMOVE_POINT,
      payload: payload
    })
}

export function dragPoint (payload) {
  return dispatch => 
    dispatch ({
      type: DRAG_POINT,
      payload: payload
    })
}

export function reorganizePoints (payload) {
  return dispatch => 
    dispatch ({
      type: REORGANIZE_POINTS,
      payload: payload
    })
}

export function changeType (payload) {
  return dispatch => 
    dispatch ({
      type: CHANGE_TYPE,
      payload: payload
    })
}