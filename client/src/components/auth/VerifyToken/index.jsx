import { Navigate } from "react-router-dom";
import { useUser } from "../../../providers/User";

export default function VerifyToken({ children }) {

    const { user } = useUser();

    const token = user.auth_token;

    if (token) {
        return (children);
    } else {
       return (<Navigate to='/login' replace={true}/>)
    }


}