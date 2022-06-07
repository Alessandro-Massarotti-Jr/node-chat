import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Home from "./pages/Home"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
      </Routes>
    </Router>
    </>);
}

export default App;
