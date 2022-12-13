import { useState } from "react";

const AddTodo = ({ addItem }) => {
  // 사용자 입력을 저장할 객체
  // {id, title, done에 대한 정보를 지정해야해서 객체 형태로!!!}
  const [todoItem, setTodoItem] = useState({
    title: "",
  });

  const onButtonClick = () => {
    // props로 받아온 additem 함수 실행

    if (todoItem.title == "") {
      alert("할일을 작성하세요");
    }
    addItem(todoItem);
    setTodoItem({ title: "" });
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter" && todoItem.title !== "") {
      onButtonClick();
    } else if (e.key === "Enter" && todoItem.title == "") {
      alert("할일을 입력하세요!");
    }
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        id="add"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyPress={onEnterKeyPress}
      />
      <label htmlFor="add"></label>
      <button onClick={onButtonClick}>ADD</button>
    </div>
  );
};

export default AddTodo;
