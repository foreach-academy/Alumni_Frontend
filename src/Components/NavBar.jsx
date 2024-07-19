import '../Styles/NavBar.css'

const NavBar = () => {
    return ( 
       <>
        <div className='navbar_block'>

            <p>LOGO</p>
            <p className='navigation_navbar'>ANNUAIRE</p>
            <p className='navigation_navbar'>OFFRES STAGE/EMPLOI</p>
            <p className='navigation_navbar'>EVENEMENTS</p>
            <p className='navigation_navbar'>CONTACTS</p>
            <p className='navigation_navbar'>A PROPOS</p>
            <div>
                <p className='navigation_navbar'>PROFIL</p>
                <p className='navigation_navbar'>ESPACE CONNEXION</p>
            </div>
        </div>
                
        </>
    )
}

export default NavBar;
