import '../Styles/NavBar.css'

const NavBar = () => {
    return ( 
       <>
        <div className='navbar_block'>

            <p>LOGO</p>
            <a href="/page_annuaire"><p className='navigation_navbar'>ANNUAIRE</p></a>
            <p className='navigation_navbar'>OFFRES STAGE/EMPLOI</p>
            <p className='navigation_navbar'>EVENEMENTS</p>
            <p className='navigation_navbar'>CONTACTS</p>
            <p className='navigation_navbar'>A PROPOS</p>
            <div>
                <a href="/profil"><p className='navigation_navbar'>PROFIL</p></a>
                <p className='navigation_navbar'>ESPACE CONNEXION</p>
            </div>
        </div>
                
        </>
    )
}

export default NavBar;
