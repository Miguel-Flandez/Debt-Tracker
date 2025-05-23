import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/App.css'
import TrackingPage from '@/pages/TrackingPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TrackingPage/>}></Route>
      </Routes>
    </BrowserRouter>
    
  ) 
}
