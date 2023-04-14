import { Route, Routes } from 'react-router-dom'
import AdminLayouts from './layouts/AdminLayouts'
import ClientLayouts from './layouts/ClientLayouts'

function App() {
  return (
    <Routes>
      <Route path='/*' element={<ClientLayouts />} />
      <Route path='/admin/*' element={<AdminLayouts />} />
    </Routes>
  )
}

export default App
