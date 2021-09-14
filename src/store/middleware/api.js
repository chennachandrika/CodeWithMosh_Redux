import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  const {
    url,
    onSuccess,
    onError,
    data,
    dataType,
    onStart,
    onFailure
  } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const respond = await fetch(url);
    if (respond.ok) {
      const bugsData = await respond.json();
      dispatch(actions.apiCallSuccess(bugsData));
      // if (onSuccess) dispatch({ type: onSuccess, payload: { data: bugsData } });
      if (dataType) dispatch({ type: dataType, payload: bugsData });
    }
  } catch (error) {
    dispatch(actions.apiCallSuccess(error.message));
    dispatch({ type: onError });
    if (onFailure) dispatch({ type: onFailure, payload: error.message });
  }
};

export default api;
