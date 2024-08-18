import Footer from "../Components/Footer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import { validEmail, validMdp } from '../Regex';
import "../Styles/InscriptionApprenantPage.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const InscriptionApprenant = () => {

    const [inscription,setInscription] = useState({
        ut_email: "",
        ut_motdepasse: "",
        pr_nom: "",
        pr_prenom: "",
        type_formation: "",
        nom_promotion: "",
    })

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [formation, setFormation] = useState([]);
    const [promotion, setPromotion] = useState([]);

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

    const addInscription = () => {
        instance.post('/utilisateur/', inscription)
            // ut_email : email,
            // ut_motdepasse : mdp,
            // pr_nom : nom,
            // pr_prenom : prenom,
            // type_formation : formation,
            // nom_promotion : promotion,


        .then(function(response){
            navigate("/connexion");
            toast.success("Inscription réussie!");
        })
        .catch(function(error) {
            toast.error(error.response.data.error);
        })
        
    };    

    const getFormation = () => {
        instance
          .get("/formation")
          .then((response) => {
            setFormation(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const getPromotion = () => {
        instance
        .get("/promotion")
        .then((response) => {
            setPromotion(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

        const validInscription = () => {
            if (validate()){
                inscription();
            }
        }

    useEffect(() => {
        getFormation();
        getPromotion();
    }, []);

return <>
    <body className="page_inscription_apprenant">
    <div className="content_logo_page_inscription_apprenant">
        <a href="/"><img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach"
             className="logo_foreach_page_inscription_apprenant"/></a>
    </div>
    <div className="block_inscription_apprenant">
    <div className="premiere_partie_input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setInscription({ ...inscription, ut_email: e.target.value });
              }}
              className="input_inscription_apprenant" size={35} required 
            />
            <input
              type="password"
              name="motdepasse"
              placeholder="Mot de Passe"
              onChange={(e) => {
                setInscription({ ...inscription, ut_motdepasse: e.target.value });
              }}
              className="input_inscription_apprenant" size={35} required
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              onChange={(e) => {
                setInscription({ ...inscription, pr_nom: e.target.value });
              }}
              className="input_inscription_apprenant" size={35} required
            />
            </div>
            <div className="deuxieme_partie_input">
            <input
              type="text"
              name="prenom"
              placeholder="Prenom"
              onChange={(e) => {
                setInscription({
                  ...inscription,
                  pr_prenom: e.target.value,
                });
              }}
              className="input_inscription_apprenant" size={35} required
            />

        {/* <div className="premiere_partie_input">
            <input type="email" name="email" defaultValue={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className="input_inscription_apprenant" size={35} required/>
            <input type="password" name="mot de passe" defaultValue={mdp} placeholder="Mot de passe" onChange={(e) => {setMdp(e.target.value)}} className="input_inscription_apprenant" required/>
            <input type="text" name="nom" defaultValue={nom} placeholder="Nom" onChange={(e) => {setNom(e.target.value)}} className="input_inscription_apprenant" required/>
        </div>
        <div className="deuxieme_partie_input">
            <input type="text" name="prenom" defaultValue={prenom} placeholder="Prenom" onChange={(e) => {setPrenom(e.target.value)}}className="input_inscription_apprenant" size={35} required /> */}
            <select
              required
              className="input_inscription_apprenant" 
              name=""
              id=""
              onChange={(e) => {
                setFormation({
                  ...formation,
                  type_formation: parseInt(e.target.value),
                });
              }}
            >
              {formation.map((formation, id) => {
                return (
                  <option value={formation.id_formation} key={id}>
                    {formation.type_formation}
                  </option>
                );
              })} 
            </select>
            <select
              required
              className="input_inscription_apprenant"
              name=""
              id=""
              onChange={(e) => {
                setPromotion({
                  ...promotion,
                  nom_promotion: parseInt(e.target.value),
                });
              }}
            >
              {promotion.map((promotion, id) => {
                return (
                  <option value={promotion.id_promotion} key={id}>
                    {promotion.nom_promotion}
                  </option>
                );
              })}
            </select>
        </div>
            {/* <Formation type="text" name="formation" defaultValue={formation} placeholder="Formation" onChange={(e) => {setFormation(e.target.value)}} className="input_inscription_apprenant" required/>
            <Promotion type="text" name="promotion" defaultValue={promotion} placeholder="Promotion" onChange={(e) => {setPromotion(e.target.value)}}className="input_inscription_apprenant" required/> */}
        </div> 
        {/* </div> */}
        <div className="block_case_a_cocher_apprenant">
            <div className="case_a_cocher_en_formation">
                <input type="checkbox" required/>
                <label for="confirmer_en_formation">Je suis actuellement apprenant·e</label>
            </div>
            
            <div className="case_a_cocher_inscription_apprenant">
                <input type="checkbox" required/>
                <label for="valider_inscription">En m'inscrivant, j'accepte que les données renseignées soient utilisées par l'équipe de ForEach Academy.</label>
            </div>
        </div> 
            <div className="block_boutton_inscription_apprenant">
                <button onClick={() => {validInscription(); addInscription();}}className="boutton_inscription_apprenant" >Validate</button>
            </div>
    
          
    </body>
    <Footer/>
    </>
    
}

export default InscriptionApprenant;