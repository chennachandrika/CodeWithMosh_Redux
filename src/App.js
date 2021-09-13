import "./styles.css";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const bugsList = useSelector((store) => store.entities.bugs);
  const dispatch = useDispatch();
  let inputValue = null;
  const onAddBug = (event) => {
    event.preventDefault();
    dispatch(bugAdded({ description: inputValue }));
  };
  const renderApp = () => {
    console.log(bugsList);
    return (
      <div className="App">
        <h1>Bugs List</h1>
        <form onSubmit={onAddBug}>
          <input
            onChange={(e) => {
              inputValue = e.target.value;
              console.log(inputValue);
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
