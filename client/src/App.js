import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Home from "./pages/Home"
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {
  return (<>
    <Router>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/chat">chat</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chat" element={<Chat/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
      </Routes>
    </Router>
    </>);
}

export default App;
