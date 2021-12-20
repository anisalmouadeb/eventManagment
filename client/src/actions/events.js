import * as api from "../api/index.js";
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";


export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchEvent(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};



export const getEvents = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchEvents(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getEventsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const  { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    console.log({data});
    dispatch({ type: FETCH_BY_SEARCH, payload: { data }  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (_event,history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const keys = Object.keys(_event);
    const formData = new FormData();
    keys.forEach((key) => {
      formData.append(key, _event[key]);
    });
    const { data } = await api.createEvent(formData);
    history.push(`/events/${data._id}`)
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEvent = (id, _event) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const keys = Object.keys(_event);
    const formData = new FormData();
    keys.forEach((key) => {
      formData.append(key, _event[key]);
    });
    const { data } = await api.updateEvent(id, formData);
   


    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = (id,history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteEvent(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
    
  } catch (error) {
    console.log(error.message);
  }
};
