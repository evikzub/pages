//import { useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../../context";
import { useAuth } from "../../../hooks/useAuth";
import MyButton from "../button/MyButton";

const setActive = ({isActive}) => isActive ? 'active-link' : '';
const setColor = ({isActive}) => ({color: isActive ? 'var(--color-active)' : 'white'});

export const Layout = () => {

    //const {isAuth, setIsAuth} = useContext(AuthContext);
    const {signOut} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const logout = () => {
        //setIsAuth(false);
        //localStorage.removeItem('auth')
        signOut(() => navigate('/login', {state:{from:location, replace: true}}))
    }

    return (
        <>
        <header>
            <MyButton onClick={logout} >Exit</MyButton>
            <NavLink to={"/"} className={setActive}>Home</NavLink>
            <NavLink to={"/posts"} style={setColor} >Posts</NavLink>
            <NavLink to={"/storage"}>Storage</NavLink>
            <NavLink to={"/recipes"}>Recipes</NavLink>
            <NavLink to={"/about"} style={setColor} >About</NavLink>
        </header>

        <main className="container">
            <Outlet/>
        </main>

        <footer>
            <h6>2023</h6>
        </footer>
        </>
    )
}