import Todo from './containers/Todo'
import OptimisedTodo from './containers/OptimisedTodo'
import TodoTest from './containers/TodoTest';
import './App.css';

function App() {
  const showComp= {
    Todo: false,
    OptimisedTodo : false,
    TodoTest: true
  }
  return(
    <>
      { showComp.Todo && <Todo />}
      { showComp.OptimisedTodo && <OptimisedTodo />}
      { showComp.TodoTest && <TodoTest />}
    </>
  );
}

export default App;