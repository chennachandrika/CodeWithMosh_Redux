const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== "apiCalled") {
    return next(action);
  }
  next(action);
  const { url, onSuccess, onFailure } = action.payload;
  try {
    const respond = await fetch(url);
    if (respond.ok) {
      const data = await respond.json();
      dispatch({ type: onSuccess, payload: data });
    }
  } catch (error) {
    dispatch({ type: onFailure, payload: error });
  }
};

export default api;
