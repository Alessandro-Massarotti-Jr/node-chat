
import {Navigate} from "react-router-dom";
import MessageField from "../components/MessageField";


export default function Home(){
  
  
  
   

    return (<>
    {/* <Navigate to="/login" replace={true} /> */}
     <h1>Home</h1>
     <MessageField/>
    </>

    );
}