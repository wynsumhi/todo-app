import { useState } from "react";
import Todo from "./components/Todo";

const App = () => {
  const [todoItems, setTodoItems] = useState([
    { id: 1, title: "my Todo1", done: false },
    { id: 2, title: "my Todo2", done: false },
    { id: 3, title: "my Todo3", done: true },
  ]);
  return (
    // map 함수 사용
    // 힌트1. key 속성 사용
    // 힌트2. 각 todo(데이터)를 props로전달
    <div className="App">
      {todoItems.map((item) => {
        // console.log(item); // {id: 1, title: 'My Todo1', done: false}
        return <Todo key={item.id} item={item} />;
      })}
    </div>
  );
};

export default App;
