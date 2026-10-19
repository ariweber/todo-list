import { Route, Routes } from 'react-router'
import TasksPage from './pages/TasksPage/TasksPage'
import Layout from './components/Layout/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<TasksPage />} />
      </Route>
    </Routes>
  )
}