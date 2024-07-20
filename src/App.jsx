import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './component/Authentication/Register'
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import TicketForm from './component/TicketForm'
import AdminDashboard from './component/Dashboard/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
      <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          <Route path="/create-ticket" component={TicketForm} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/payment" component={PaymentForm} />

     </Routes>
     </Router>
  
    </>
  )
}

export default App
