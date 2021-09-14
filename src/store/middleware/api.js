import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  const { url, onSuccess, data, onStart, onFailure } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const respond = await fetch(url);
    if (respond.ok) {
      const bugsData = await respond.json();
      dispatch(actions.apiCallSuccess(bugsData));
      if (data) dispatch({ type: data, payload: { data: bugsData } });
      // if (onSuccess) dispatch({ type: onSuccess, payload: data });
    }
  } catch (error) {
    dispatch(actions.apiCallSuccess(error));
    if (onFailure) dispatch({ type: onFailure, payload: error });
  }
};

export default api;
