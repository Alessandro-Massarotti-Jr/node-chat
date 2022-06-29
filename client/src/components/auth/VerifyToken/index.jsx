import { Navigate } from "react-router-dom";

export default function VerifyToken({ children }) {


    const token = localStorage.getItem('auth_token');
    console.log(token);
    if (token) {
        return (children);
    } else {
       return (<Navigate to='/login' replace={true}/>)
    }


}