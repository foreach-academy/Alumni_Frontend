import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import { validEmail, validMdp } from '../Regex';
import "../Styles/InscriptionEntreprisePage.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const InscriptionEntreprise = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [fonction, setFonction] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [mdpError, setMdpError] = useState(false);
    
    const validate = () => {
            if (!validEmail.test(email)) {
              setEmailError(true);
              toast.error("Email incorrect")
           }
           if (!validMdp.test(mdp)) {
              setMdpError(true);
              toast.error("Votre mot de passe doit contenir au moins : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère speciale.")
           }
        };


    const inscription = () => {
        instance.post('/auth/inscription_entreprise', {
            ut_email : email,
            ut_motdepasse : mdp,
            en_nom_contact : nom,
            en_prenom_contact : prenom,
            en_nom : entreprise,
            en_fonction_contact : fonction,

        })
        .then(function(response){
            toast.success(response.data.message);
            navigate("/connexion");
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    const validInscription = () =>{
        if (validate()){
            inscription();
        }
    }


return <>
    <body className="page_inscription_entreprise">
        <div className="content_logo_page_inscription_entreprise">
        <a href="/"><img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach"
                className="logo_foreach_page_inscription_entreprise"/></a>
        </div>
        <div className="block_inscription_entreprise">

            <div className="premiere_partie_inscription_entreprise"> 
                <input type="email" name="email" defaultValue={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className="input_inscription_entreprise" size={35} required/>
                <input type="password" name="mot de passe" defaultValue={mdp} placeholder="Mot de passe" onChange={(e) => {setMdp(e.target.value)}} className="input_inscription_entreprise" required/>
                <input type="text" name="nom" defaultValue={nom} placeholder="Nom" onChange={(e) => {setNom(e.target.value)}} className="input_inscription_entreprise" required/>
            </div>
            <div className="deuxieme_partie_inscription_entreprise">
                <input type="text" name="prenom" defaultValue={prenom} placeholder="Prenom" onChange={(e) => {setPrenom(e.target.value)}}className="input_inscription_entreprise" size={35} required />
                <input type="text" name="formation" defaultValue={entreprise} placeholder="Nom de l'entreprise" onChange={(e) => {setEntreprise(e.target.value)}} className="input_inscription_entreprise" required/>
                <input type="text" name="promotion" defaultValue={fonction} placeholder="Fonction dans l'entreprise" onChange={(e) => {setFonction(e.target.value)}}className="input_inscription_entreprise" required/>
        </div>
        </div>
        
        <div className="case_a_cocher_inscription_entreprise">
            <input type="checkbox" required/>
            <label for="valider_inscription">En m'inscrivant, j'accepte que les données renseignées soient utilisées par l'équipe de ForEach Academy.</label>
        </div>
        <div className="block_boutton_inscription_entreprise">
            <button onClick={validInscription} className="boutton_inscription_entreprise" >Validate</button>
        </div>
        <p id="redirect_connexion">
            Déjà un compte ? page de{' '}
            <span onClick={() => navigate('/connexion')} className="entreprise_redirect_connexion">
                CONNEXION
            </span>
        </p>       
    </body>
</>
    
}

export default InscriptionEntreprise;