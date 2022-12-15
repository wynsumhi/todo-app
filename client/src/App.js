import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const todoId = useRef(4);

  useEffect(() => {
    console.log("첫랜더링 완료!");

    const getTodos = async () => {
      let response = await axios.get("http://localhost:8080/todos");
      console.log(response.data);

      setTodoItems(response.data.slice(0, 20));
    };

    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트 (App)은 AddTodo 컴포넌트 접근 가능
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당함수를 AddTodo로 넘겨야 함
  const addItem = async (newItem) => {
    // axios.post(url, data)

    // [Before]
    // newItem = {id: ?, title: ?, done: false}
    // newItem.id = todoId.current++; // key를 위한 id 설정
    // newItem.done = false; // done 초기화
    // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    // setTodoItems([...todoItems, newItem]); // setTodoItems(todoItems.concat(newItem))

    // setTodoItems(
    //   todoItems.concat({
    //     id: todoItems.length + 1,
    //     title: newItem,
    //     done: false,
    //   })
    // );
    const response = await axios.post("http://localhost:8080/todo", newItem);
    console.log(response.data);

    setTodoItems([...todoItems, response.data]);
  };

  // 전체 Todo 리스트(todoItems)는 App 컴포넌트에서 관리하고 있으므로
  // deleteItem() 함수는 App 컴포넌트에 작성해야 함
  const deleteItem = async (targetItem) => {
    //   console.log(targetItem);
    //   const newItem = todoItems.filter(
    //     (todoItem) => todoItem.id !== targetItem.id
    //   );
    //   setTodoItems(newItem);
    console.log(targetItem);
    await axios.delete(`http://localhost:8080/todo/${targetItem.id}`);
    const newItem = todoItems.filter(
      (todoItem) => todoItem.id !== targetItem.id
    );
    setTodoItems(newItem);
  };

  return (
    // map 함수 사용
    // 힌트1. key 속성 사용
    // 힌트2. 각 todo(데이터)를 props로전달
    <div>
      <div className="wrap">
        <Header></Header>
        <AddTodo addItem={addItem}></AddTodo>
        <div className="left-todo">남은 할 일 : {todoItems.length}</div>
        {todoItems.length > 0 ? (
          todoItems.map((item) => {
            // console.log(item); // {id: 1, title: 'My Todo1', done: false}
            return <Todo key={item.id} item={item} deleteItem={deleteItem} />;
          })
        ) : (
          <p className="empty-todos">Todo를 추가해주세요</p>
        )}
      </div>
    </div>
  );
};

export default App;
