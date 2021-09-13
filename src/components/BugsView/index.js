import { useDispatch, useSelector } from "react-redux";
import { bugAdded, bugRemoved, bugResolved } from "../../store/bugs";
import * as actions from "../../store/api";

function BugsView() {
  const bugsList = useSelector((store) => store.entities.bugs.list);
  const dispatch = useDispatch();
  let inputValue = null;
  const onAddBug = (event) => {
    event.preventDefault();
    dispatch(bugAdded({ description: inputValue }));
    dispatch(
      actions.apiCallBegan({
        url: "https://jsonplaceholder.typicode.com/todos/",
        onSuccess: actions.apiCallSuccess.type,
        onFailure: actions.apiCallFailure.type
      })
    );
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
