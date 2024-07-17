import '../Styles/NavBar.css'

const NavBar = () => {
    return ( 
       
        <div className='navbar_block'>
           
                <p>X</p>
                <p className='navigation_navbar'>Annuaire</p>
                <p className='navigation_navbar'>Offres/Emploi</p>
                <p className='navigation_navbar'>Evenements</p>
                <p className='navigation_navbar'>Contacts</p>
                <p className='navigation_navbar'>A propros</p>
                <div>
                <p className='navigation_navbar'>Profil</p>
                <p className='navigation_navbar'>Espace connexion</p>
                </div>
        </div>
    )
}

export default NavBar;
