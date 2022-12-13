import { useState, useRef } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";

const App = () => {
  const [todoItems, setTodoItems] = useState([
    { id: 1, title: "my Todo1", done: false },
    { id: 2, title: "my Todo2", done: false },
    { id: 3, title: "my Todo3", done: true },
  ]);

  const todoId = useRef(4);

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트 (App)은 AddTodo 컴포넌트 접근 가능
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당함수를 AddTodo로 넘겨야 함
  const addItem = (newItem) => {
    // newItem = {id: ?, title: ?, done: false}

    newItem.id = todoId.current++; // key를 위한 id 설정
    newItem.done = false; // done 초기화
    // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    setTodoItems([...todoItems, newItem]); // setTodoItems(todoItems.concat(newItem))

    // setTodoItems(
    //   todoItems.concat({
    //     id: todoItems.length + 1,
    //     title: newItem,
    //     done: false,
    //   })
    // );
  };

  // 전체 Todo 리스트(todoItems)는 App 컴포넌트에서 관리하고 있으므로
  // deleteItem() 함수는 App 컴포넌트에 작성해야 함
  const deleteItem = (targetItem) => {
    console.log(targetItem);
    const newItem = todoItems.filter(
      (todoItem) => todoItem.id !== targetItem.id
    );
    setTodoItems(newItem);
  };

  return (
    // map 함수 사용
    // 힌트1. key 속성 사용
    // 힌트2. 각 todo(데이터)를 props로전달
    <div className="App">
      <AddTodo addItem={addItem}></AddTodo>
      {todoItems.map((item) => {
        // console.log(item); // {id: 1, title: 'My Todo1', done: false}
        return <Todo key={item.id} item={item} deleteItem={deleteItem} />;
      })}
    </div>
  );
};

export default App;
