import { useRef, useCallback, useReducer } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

//렉을 경험할 수 있도록 데이터 2500개를 자동으로 생성하는 함수 만듬. 느려짐. 최적화 해보기
function createBulkTodos() {
  const array = [];
  for (let i = 1; i<= 2500; i++){
    array.push({
      id:1, 
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로 추가
    return todos.concat(action.todo);
    case 'REMOVE': //제거
    return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': //토글
    return todos.map(todo => 
      todo.id ===action.id ? {...todo, checked: !todo.checked} : todo,
    );
    default:
        return todos;
  }
}

const App =  () =>{
  // const [todos, setTodos] = useState([
  //   {
  //     id:1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true
  //   },
  //   {
  //     id:2,
  //     text: '컴포넌트 스타일링 해보기',
  //     checked: true
  //   },
  //   {
  //     id:3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false
  //   },
  // ]);

  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);


  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기 
  // const nextId = useRef(4);
  const nextId = useRef(2501);


  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({type: 'INSERT', todo});
      // setTodos(todos.concat(todo));
      // setTodos(todos => todos.concat(todo));
      nextId.current +=1 // nextId 1씩 더하기
    },[]);

  const onRemove = useCallback(
    id => {
      // setTodos(todos.filter(todo => todo.id !== id));
      // setTodos(todos=>todos.filter(todo => todo.id !== id));
      dispatch({type : 'REMOVE', id});
    },[]);

  const onToggle = useCallback(
    id => {
      // setTodos(
      //   todos.map(todo => 
      //     todo.id === id ? {...todo, checked: !todo.checked} : todo,
      //   ),
      // );
      // setTodos(todos =>
      //   todos.map(todo => 
      //     todo.id === id ? {...todo, checked: !todo.checked} : todo,
      //   ),
      // );
      dispatch({type: 'TOGGLE', id});
    },[])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;