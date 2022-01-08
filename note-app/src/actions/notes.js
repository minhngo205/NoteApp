import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_NOTE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  IMPORTANT,
  FETCH_BY_TAG
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getNote = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchNote(id);

    dispatch({ type: FETCH_NOTE, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getNotes = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchNotes(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getNotesByTag = (tagQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchNotesByTag(tagQuery);

    dispatch({ type: FETCH_BY_TAG, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getNotesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchNotesBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createNote = (note, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createNote(note);

    dispatch({ type: CREATE, payload: data });

    history.push(`/note/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = (id, note) => async (dispatch) => {
  try {
    const { data } = await api.updateNote(id, note);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const importantNote = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.importantNote(id, user?.token);

    dispatch({ type: IMPORTANT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};