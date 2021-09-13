import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  next(action);
  const { url, onSuccess, onFailure } = action.payload;
  try {
    const respond = await fetch(url);
    if (respond.ok) {
      const data = await respond.json();
      dispatch(actions.apiCallSuccess(data));
      // if (onSuccess) dispatch({ type: onSuccess, payload: data });
    }
  } catch (error) {
    dispatch(actions.apiCallSuccess(error));
    if (onFailure) dispatch({ type: onFailure, payload: error });
  }
};

export default api;
