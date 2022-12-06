import { useState } from 'react'
import './App.css'
import { Button, Input, ButtonGroup } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'
// import Header from './components/Header'
// import InputTodo from './components/InputTodo'
// import TodoList from './components/TodoList'
// import Footer from './components/Footer'

function App() {
  
  const [todos, setTodos] = useState([])
  const [textResult, setTextResult] = useState('')

  /*********06/12/2022**********/
  // lấy độ dài của mảng chứa những phần tử chưa được hoàn thành
  // hàm filter() để lọc ra những công việc todo chưa hoàn thành
  const amountTodoUncompleted = todos.filter(todo => !todo.completed).length
  /*********06/12/2022**********/
  const [state, setState] = useState('all')
  // tạo thêm mảng original để khi click vào nút All, vẫn render ra được todo list ban đầu, vì mảng todos đã bị filter
  const [originalTodos, setOriginalTodos] = useState([])


  const onChange = (e) => {
    const {value} = e.target
    setTextResult(value);
  }

  const onClick = () => {
    const todo = {
      id: uuidv4(),
      completed: false,
      content: textResult
    }

    /*********06/12/2022: push phần tử mới lên đầu mảng**********/
    //cach 1: dung unshift
    // todos.unshift(todo)
    // setTodos(todos)
    //cach 2: ...
    setTodos([todo, ...todos])
    setOriginalTodos([todo, ...todos])
    // const newTodos = todos.concat(todo)
    // setTodos(newTodos)
    setTextResult('')
  }

  const onCompleteItem = (item, index) => {
    todos[index] = {...item, completed: !item.completed}
    setTodos([...todos])
    setOriginalTodos([...todos])
  }

  /*********06/12/2022**********/
  const onFilter = (currentState) => {
    setState(currentState)
    switch (currentState) {
      case 'active':
        const active = originalTodos.filter(todo => !todo.completed)
        setTodos(active)
        break;
      case 'completed':
        const completed = originalTodos.filter(todo => todo.completed)
        setTodos(completed)
        break;
      default:
        setTodos(originalTodos)
        break;
    }
  }

  const onClearCompletedTodos = () => {
    const completedTodos = originalTodos.filter(todo => !todo.completed)
    setOriginalTodos(completedTodos)
    setTodos(completedTodos)
  }

  const renderTodos = todos.map((item, index) => {
    return (
      <div key={item.id} className='my-3'>
        <Input  type='checkbox' onChange={() => onCompleteItem(item, index)} checked={item.completed}></Input>
        {item.content}
      </div>
    )
  })

  return (
    <div className="App">
      <h2>Todo List</h2>
      <div className="container d-flex input-wrapper">
        <Input type='text' placeholder='to do...' id='input' onChange={onChange}></Input>
        <Button onClick={onClick}>Click</Button>
      </div>
      {renderTodos}

      {/*********06/12/2022**********/}
      {
        todos.length > 0 ? 
        <div className="mt-4 d-flex align-items-center">
          <div>{`${amountTodoUncompleted} ${amountTodoUncompleted  > 1 ? 'items' : 'item'} left`}</div>
          <div className='mx-2'>
            <ButtonGroup>
            {[{
              label: "All",
              value: "all"
            }, {
              label: "Active",
              value: "active"
            }, {
              label: "Completed",
              value: "completed"
            }].map(item => <Button 
              key={item.value}
              onClick={() => onFilter(item.value)}
              outline
              color='primary'
              active={item.value === state}
            >{item.label}
            </Button>)
            }
            </ButtonGroup>
            <Button color='link' onClick={onClearCompletedTodos}>Clear completed</Button>
          </div>
        </div>
        : null
      }

   
      {/* <Header></Header>
      <InputTodo></InputTodo>
      <TodoList></TodoList>
      <Footer></Footer> */}
    </div>
  )
}

export default App
