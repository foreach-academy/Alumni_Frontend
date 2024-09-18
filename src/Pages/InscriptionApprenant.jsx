import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import { validEmail, validMdp } from "../Regex";
import "../Styles/InscriptionApprenantPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Promotion from "../Components/DropdownPromotion";
import Formation from "../Components/DropdownFormation";

const InscriptionApprenant = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [formation, setFormation] = useState("");
    const [promotion, setPromotion] = useState("");

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
        instance.post('/authenticate/inscription_apprenant', {
            ut_email : email,
            ut_motdepasse : mdp,
            pr_nom : nom,
            pr_prenom : prenom,
            type_formation : formation,
            nom_promotion : promotion,

        })
        .then(function(response){
            toast.success(response.data.message);
            navigate("/connexion");
        })
        .catch(function(error) {
            console.log(error);
        })
        
    };    

  const addInscription = async () => {
    console.log("ici");
    await instance
      .post("/account", {
        email: email,
        motdepasse: mdp,
        nom: nom,
        prenom: prenom,
        id_formation: formation[0].id_formation,
        id_promotion: promotion[0].id_promotion,
        id_role: 2,
      })
      .then(function (response) {
        console.log(response);
        toast.success("Inscription réussie!");
        navigate("/connexion");
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
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
      });
  };

  const validInscription = () => {

      console.log('coucou');
    if (validate()) {
      inscription();
    }
  };

  useEffect(() => {
    getFormation();
    getPromotion();
  }, []);

return <>
      <div className="content_logo_page_inscription_apprenant">
          <a href="/"><img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach"
              className="logo_foreach_page_inscription_apprenant"/></a>
      </div>
          <div className="block_inscription_apprenant">
            <div className="inputs_container">
              <div className="inputs_left">
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
                <input
                  type="password"
                  name="mot de passe"
                  defaultValue={mdp}
                  placeholder="Mot de passe"
                  onChange={(e) => setMdp(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
                <input
                  type="text"
                  name="nom"
                  defaultValue={nom}
                  placeholder="Nom"
                  onChange={(e) => setNom(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
              </div>
              <div className="inputs_right">
                <input
                  type="text"
                  name="prenom"
                  defaultValue={prenom}
                  placeholder="Prénom"
                  onChange={(e) => setPrenom(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
                <Formation
                  type="text"
                  name="formation"
                  defaultValue={formation}
                  placeholder="Formation"
                  onChange={(e) => setFormation(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
                <Promotion
                  type="text"
                  name="promotion"
                  defaultValue={promotion}
                  placeholder="Promotion"
                  onChange={(e) => setPromotion(e.target.value)}
                  className="input_inscription_apprenant"
                  required
                />
              </div>
            </div>
            <div className="block_case_a_cocher_apprenant">
              <div className="case_a_cocher_en_formation">
                <input type="checkbox" required />
                <label htmlFor="confirmer_en_formation">
                  Je suis actuellement apprenant·e
                </label>
              </div>
              <div className="case_a_cocher_inscription_apprenant">
                <input type="checkbox" required />
                <label htmlFor="valider_inscription">
                  En m'inscrivant, j'accepte que les données renseignées soient
                  utilisées par l'équipe de ForEach Academy.
                </label>
              </div>
            </div>
            <div className="block_boutton_inscription_apprenant">
              <button
                onClick={() => {
                  validInscription();
                  addInscription();
                }}
                className="boutton_inscription_apprenant"
              >
                Valider
              </button>
              <p id="redirect_connexion">
                Déjà un compte ? page de{' '}
                <span onClick={() => navigate('/connexion')} className="apprenant_redirect_connexion">
                  CONNEXION
                </span>
              </p>       
            </div>
          </div>
      </>
    }
  

  export default InscriptionApprenant;
