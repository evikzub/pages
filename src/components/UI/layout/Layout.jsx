import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const setActive = ({isActive}) => isActive ? 'active-link' : '';
const setColor = ({isActive}) => ({color: isActive ? 'var(--color-active)' : 'white'});

export const Layout = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <>
        <header>
            <MyButton onClick={logout} >Exit</MyButton>
            <NavLink to={"/"} className={setActive}>Home</NavLink>
            <NavLink to={"/posts"} style={setColor} >Posts</NavLink>
            <NavLink to={"/fridge"}>Fridge</NavLink>
            <NavLink to={"/recipes"}>Recipes</NavLink>
            <NavLink to={"/about"}>About</NavLink>
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