import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MyButton from "../components/UI/button/MyButton"
import MyInput from "../components/UI/input/MyInput"
//import { AuthContext } from "../context"
import { useAuth } from "../hooks/useAuth"


export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';
    //const fromPage = location.pathname || '/';
    console.log("Login => fromPage: ", fromPage, " location: ", location);
    //const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        //setIsAuth(true);
        //localStorage.setItem('auth', 'true')

        const form = event.target;
        const user = form.login.value;

        signIn(user, () => navigate(fromPage, {replace: true}));
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label>Login</label>
                <MyInput type="text" placeholder="Enter login" name='login' />
                <label>Password</label>
                <MyInput type="password" placeholder="Enter password" name='password' />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    )
}