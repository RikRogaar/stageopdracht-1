import { Route, Routes } from 'react-router-dom'
import { TodoIndex } from './components/Todos/TodoIndex'
import { TodoProdiver } from './Context/TodoContext'

function App() {
  return (
    <TodoProdiver>
      <div className="bg-neutral-800">
        <div className="max-w-7xl mx-auto min-h-screen">
          <Routes>
            <Route path="/" element={<TodoIndex />} />
          </Routes>
        </div>
      </div>
    </TodoProdiver>
  )
}

export default App
