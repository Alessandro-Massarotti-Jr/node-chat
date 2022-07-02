import styles from "./styles.module.css"
import InputText from "../Form/InputText/index"
import { FiArrowRight } from "react-icons/fi"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useUser } from "../../providers/User";
import Loading from "../Loading";
import AlertModal from "../Layout/AlertModal";

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [alertModal,setAlertModal] = useState(false);

  const { setUser } = useUser();

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    setLoading(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    const request = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })
    const data = await request.json();

    if (data.success) {

      const userData = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        auth_token: data.token
      }


      setUser(userData);

      setLoading(false);
      navigate('/', { replace: true });
    } else {
      setAlertModal(true);
      setLoading(false);
      setTimeout(()=>{
        setAlertModal(false);
      },3000)
    }

  }

  return (
    <div className={styles.formContainer}>
      {alertModal && <AlertModal title="Erro" text="Login ou senha Invalidos"/>}
      {loading && <Loading />}
      <form onSubmit={(event) => { login(event) }} className={styles.loginForm} method="POST">
        <InputText name="Email" type="email" value={email} setValue={setEmail} required={true} />
        <InputText name="Password" type="password" value={password} setValue={setPassword} required={true} />
        <button className={styles.loginForm__submitButton} type="submit">Login</button>
      </form>
      <p className={styles.registerLink}><Link to="/register">Register here <FiArrowRight /></Link></p>
    </div>

  )
}