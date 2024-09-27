import { useContext } from 'react';
import '../Styles/NavBar.css'
import AuthContext from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../Assets/logo_foreach_couleur_horizontal.png";

const NavBar = () => {
    const {isAuthenticated, setIsAuthenticated, setToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        window.localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/');
    }

    const navigateTo = (route)=>{
        navigate(route);
    }

    return ( 
    <>
        {isAuthenticated ? <>
            <div className='navbar_block'>
                <div>
                    <img src={logo} alt="logo" className='logo'/>
                </div>
                <p className='navigation_navbar'onClick={() => {navigateTo("/page_annuaire")}}>ANNUAIRE</p>
                <p className='navigation_navbar' onClick={() => {navigateTo("/offres_stage_emploi")}}>OFFRES STAGE/EMPLOI</p>
                <p className='navigation_navbar' onClick={() => {navigateTo("/profil")}}>EVENEMENTS</p>
                <p className='navigation_navbar'>CONTACTS</p>
                <p className='navigation_navbar'>A PROPOS</p>

                    <div className='profil_logout_button'>
                        <p className='navigation_navbar' onClick={() => {navigateTo("/profil")}}>PROFIL</p>
                        <p className='navigation_navbar' onClick={logout}><span class="material-icons-outlined">logout</span></p>
                    </div>
            </div>         
        </> : <>
            
        </>}
    </>
    )
}

export default NavBar;
