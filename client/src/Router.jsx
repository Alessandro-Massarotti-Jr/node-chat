import { BrowserRouter, Routes, Route } from 'react-router-dom';

import VerifyToken from './components/auth/VerifyToken';

import Home from "./pages/Home"
import Login from "./pages/login"
import Register from "./pages/register"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
               <VerifyToken>
                <Home />
               </VerifyToken>}></Route>
                <Route path="/login" element={<Login />}> </Route>
                <Route path="/register" element={<Register />}> </Route>
            </Routes>
        </BrowserRouter>
    );
}