import { useDispatch, useSelector } from "react-redux";
import { bugAdded, bugRemoved, bugResolved } from "../../store/bugs";

function BugsView() {
  const bugsList = useSelector((store) => store.entities.bugs);
  const dispatch = useDispatch();
  let inputValue = null;
  const onAddBug = (event) => {
    event.preventDefault();
    dispatch(bugAdded({ description: inputValue }));
    const dataTodos = dispatch({
      type: "apiCalled",
      payload: {
        url: "https://jsonplaceholder.typicode.com/todos/",
        onSuccess: "onTodosReceived",
        onFailure: "onTodosRejected"
      }
    });
    console.log(dataTodos);
  };
  const renderApp = () => {
    return (
      <div className="App">
        <h1>Bugs List</h1>
        <form onSubmit={onAddBug}>
          <input
            onChange={(e) => {
              inputValue = e.target.value;
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {bugsList.map((bugItem) => (
            <li key={bugItem.id}>
              {bugItem.description}
              <button
                onClick={() => {
                  dispatch(bugRemoved({ id: bugItem.id }));
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  dispatch(bugResolved({ id: bugItem.id }));
                }}
              >
                Alright
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return renderApp();
}

export default BugsView;
