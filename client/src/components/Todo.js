// 1. 함수형 컴포넌트
// 2. input(checkbox) 와 label을 랜더링하는 컴포넌트!
// 3. APP (부모 컴포넌트)에서 Todo (자식 컴포넌트) 1개를 랜더링

const Todo = ({ item }) => {
  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${item.id}`}
        name={`todo${item.id}`}
        value={`todo${item.id}`}
        defaultChecked={item.done}
      />
      <label htmlFor={`todo${item.id}`}>{item.title}</label>
    </div>
  );
};

export default Todo;