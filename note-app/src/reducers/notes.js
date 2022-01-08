import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_TAG, FETCH_NOTE, CREATE, UPDATE, DELETE, IMPORTANT, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, notes: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        notes: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_TAG:
      return { ...state, notes: action.payload.data };
    case FETCH_NOTE:
      return { ...state, note: action.payload.note };
    case IMPORTANT:
      return { ...state, notes: state.notes.map((note) => (note._id === action.payload._id ? action.payload : note)) };
    case COMMENT:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note._id === +action.payload._id) {
            return action.payload;
          }
          return note;
        }),
      };
    case CREATE:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE:
      return { ...state, notes: state.notes.map((note) => (note._id === action.payload._id ? action.payload : note)) };
    case DELETE:
      return { ...state, notes: state.notes.filter((note) => note._id !== action.payload) };
    default:
      return state;
  }
};

