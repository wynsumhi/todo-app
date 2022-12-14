import { useState } from "react";
import "../scss/Todo.scss";

// 1. 함수형 컴포넌트
// 2. input(checkbox) 와 label을 랜더링하는 컴포넌트!
// 3. APP (부모 컴포넌트)에서 Todo (자식 컴포넌트) 1개를 랜더링

const Todo = ({ item, deleteItem }) => {
  // console.log(item); // { id : 1, title : 'todo', done : false }
  const { id, title, done } = item;

  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
  };

  // title input 클릭시 (title를 수정하겠다!): readOnly state 를 false로 변경
  const readOnlyHandler = () => {
    setReadOnly(false);
  };

  // title input에서 enter 키 입력시 (title 수정을 완료했다!!!): readOnly state를 true로 변경
  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };

  // title input 커서가 깜빡인다고 수정이 가능한 것은 아님
  // 사용자가 키보드 입력할 때마다 todoItem의 title을 새 값으로 변경
  const editEventHandler = (e) => {
    const { title, ...rest } = todoItem;

    setTodoItem({
      title: e.target.value,
      ...rest,
      // id: todoItem.id,
      // done: false,
    });
  };

  //  checkbox 업데이트
  //  done :true -> false, false -> true
  const checkboxEventHandler = (e) => {
    console.log(e);
    // todoItem.done = !todoItem.done; // !true -> false, !false -> true

    // rest: id, title 정보
    const { done, ...rest } = todoItem; // {id: 1, title: 'todo1', done: false}
    setTodoItem({
      done: e.target.checked,
      ...rest,
    });
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${item.id}`}
        name={`todo${item.id}`}
        value={`todo${item.id}`}
        defaultChecked={item.done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor={`todo${item.id}`}>{item.title}</label> */}
      <input
        type="text"
        value={todoItem.title}
        id={`todo${item.id} input`}
        onChange={editEventHandler}
        onClick={readOnlyHandler}
        onKeyPress={onEnterKeyPress}
        readOnly={readOnly}
      />
      <button onClick={onDeleteBtnClick}>DELETE</button>
    </div>
  );
};

export default Todo;
