import Home from "./Components/Home"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import useAuthStore from "./zustand/authStore";


function App() {
  const { isAuthenticated } = useAuthStore();


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={isAuthenticated?<Dashboard />:<Navigate to="/" />} >
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
