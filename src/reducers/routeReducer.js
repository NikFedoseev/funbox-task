import { ADD_POINT, REMOVE_POINT, DRAG_POINT, REORGANIZE_POINTS, CHANGE_TYPE } from '../actions/routeActions';

const initialState = {
  points: ['Москва, улица Константина Царева, 12', 'Москва, улица Арбат'],
  activeType: 'auto',
  types: ['auto', 'masstransit', 'pedestrian', 'bicycle']
}


export function routeReducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case ADD_POINT:
      return { ...state, points: [...state.points].concat(action.payload) }
    case REMOVE_POINT:
      const points = state.points.filter(el => el != action.payload);
      return { ...state, points: points.length ? points : [] }
    case DRAG_POINT:
      return { ...state, points: state.points.map((el,i) => (i == action.payload.id) ? action.payload.addr : el) }
    case REORGANIZE_POINTS:
      return { ...state, points: action.payload }
    case CHANGE_TYPE:
      return { ...state, activeType: action.payload }
    default:
      return state;
  } 
}