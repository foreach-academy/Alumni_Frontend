import '../Styles/Footer.css'


const Footer = () => {
    return ( 
       
        <div className='footer_block'>
           
                <p className='navigation_footer'>LOGO</p>
                <p className='navigation_footer'>CGU</p>
                <div className='block_icon_reseaux_footer'>
                <a href='https://www.instagram.com/foreach_academy/' target='blank' ><img src={require("../Assets/instagram_icon.png")} alt="instagram_icon" className='icon_reseaux_footer'/></a>
                <a href="https://www.linkedin.com/school/foreach-academy/" target='blank' ><img src={require("../Assets/linkedin_icon.png")} alt="linkedin_icon" className='icon_reseaux_footer'/></a>
                </div>
                <p className='navigation_footer'>Mentions légales</p>
                <p className='navigation_footer'>Confidentialité des données</p>
                <div>
                <p className='navigation_footer'>393 Rue du Générale de Gaulle,</p>
                <p className='navigation_footer'>59700 Marq-en-baroeul</p>
                </div>
        </div>
    )
}

export default Footer;