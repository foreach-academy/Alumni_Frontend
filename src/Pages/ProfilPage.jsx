import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import "../Styles/ProfilPage.css";
import instance from "../API/axios";
import UtilisateurService from "../Services/UtilisateurService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormationService from "../Services/FormationService";
import ProfilService from "../Services/ProfilService";
import LiensService from "../Services/LiensService";
import defaultProfileImage from "../Assets/logo_foreach_couleur_horizontal.png";
import ProfilAideService from "../Services/ProfilAideService";
import ProfilCompetenceService from "../Services/ProfilCompetenceService";
import ParcoursService from "../Services/ParcoursService";


const ProfilPage = () => {
  const [profil, setProfil] = useState({
    pr_nom: "",
    pr_prenom: "",
    pr_description: "",
    id_lien: "",
    pr_entreprise: "",
    id_lien: "",
    pr_tel: "",
    pr_imgprofil: "" 
  });
  const [liens, setLiens] = useState({
    li_linkedin: "",
    li_github: "",
    li_perso: "",
    id_profil: "",
  });
  // const [profilCompetence, setProfilCompetence] = useState({
  //   id_profil: "",
  //   id_competence: ""
  // });
  const [parcours, setParcours] = useState({
    id_parcours: "",
    id_formation: "",
    id_promotion: "",
    id_profil: ""
  });
  

  const [profilAide, setProfilAide] = useState([]);
  const [formation, setFormation] = useState([]); 
  const [typeAide, setTypeAide] = useState([]);
  const [Competence, setCompetence] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profilCompetence, setProfilCompetence] = useState([]);

  const navigate = useNavigate();
  const navigateTo = (route)=>{
    navigate(route);
}

  const fetchFormation = async () => {
    try {
      const response = await FormationService.getAllFormation();
      setFormation(response.data);
    } catch (error) {
      console.error("Error fetching formations:", error);
    }
  };

  const getTypeAide = () => {
    instance
      .get("/type_aide")
      .then((response) => {
        setTypeAide(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCompetence = () => {
    instance
      .get("/competence")
      .then((response) => {
        setCompetence(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchProfil = async () => {
      const utilisateur = UtilisateurService.getUtilisateurIdFromToken();
      try {
        const response = await instance.get(`/utilisateur/${utilisateur}/profil`);        
        setProfil(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };

    fetchProfil();
    fetchFormation();
    getTypeAide();
    getCompetence();
  }, []);

  useEffect(() => {
    const fetchLiens = async () => {
      if (profil.id_profil && profil.id_profil.id_lien) {
        try {
          const response = await LiensService.getLiensById(profil.id_profil.id_profil, profil.id_profil.id_lien);
          setLiens(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des liens:", error);
        }
      }
    };
  
    fetchLiens();
  }, [profil.id_profil]);

  useEffect(() => {
    const fetchProfilCompetence = async () => {
      if (profil?.id_profil?.id_profil) {
        try {
          const profilCompetences = await ProfilCompetenceService.getCompetencesByProfilId(profil?.id_profil?.id_profil);
          console.log("Données competence récupérées:", profilCompetences); 
          setProfilCompetence(profilCompetences);
        } catch (error) {
          console.error("Erreur lors de la récupération des compétences:", error);
        }
      }
    };
    fetchProfilCompetence();
  }, [profil?.id_profil?.id_profil]);
  
  useEffect(() => {
    const fetchProfilAide = async () => {
      if (profil?.id_profil?.id_profil) {  
        try {
          const profilAide = await ProfilAideService.getProfilAideByProfilId(profil?.id_profil?.id_profil);
          console.log("Données aide récupérées:", profilAide); 
          setProfilAide(profilAide);  
        } catch (error) {
          console.error("Erreur lors de la récupération des aides:", error);
        }
      }
    };
    
    fetchProfilAide();
  }, [profil?.id_profil?.id_profil]);  

useEffect(() => {
  const fetchParcours = async () => {
      if (profil?.id_profil?.id_profil) {  
          try {
              const parcoursData = await ParcoursService.getParcoursByProfilId(profil.id_profil.id_profil);
              console.log("Données parcours récupérées:", parcoursData); 
              
              // Assure-toi que parcoursData est un tableau
              setParcours(Array.isArray(parcoursData) ? parcoursData : [parcoursData]);  
          } catch (error) {
              console.error("Erreur lors de la récupération des parcours:", error);
          }
      }
  };
  
  fetchParcours();
}, [profil?.id_profil?.id_profil]); 

  // console.log(profil)
  
  return (
    <>
      <NavBar className="NavBar_profil_page" />
      <body className="page_profil">
        <div className="text_bienvenue">
          <div className="info_image">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Aperçu de la photo"
                className="profile-image"
              />
            ) : (
              profil?.id_profil?.pr_imgprofil ? (
                <img
                  src={`http://127.0.0.1:3006/${profil.id_profil.pr_imgprofil}`} 
                  alt="Photo de profil"
                  className="profile-image"
                />
              ): (
                <img
                  src={defaultProfileImage} 
                  alt="Photo de profil par défaut"
                  className="profile-image"
                />
              )
            )}
          </div>
          <h2>BIENVENUE SUR TON <span className="espace_alumni">ESPACE ALUMNI</span></h2>
        </div>
        <div className="content_profil">
          <div className="header-title">
            <h1>{profil.id_profil ? `${profil?.id_profil?.pr_nom} ${profil?.id_profil?.pr_prenom}` : "Nom prénom"}</h1>
          </div>
          <div className="infos_profil">
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Ma formation / Mon parcours</p>
                {Array.isArray(parcours) && parcours.length > 0 ? (
                  parcours.map((item) => (
                      <p className="input_profil" key={item.id_parcours}>
                          {item.formation.type_formation}
                      </p>
                  ))
              ) : (
                  <p>Aucun parcours trouvé</p>
              )}

              </div>
            </div>

            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes spécialités</p>
                <p className="input_profil">{profil?.id_profil?.pr_description || ""}</p>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon LinkedIn</p>
                <p className="input_profil">{liens.li_linkedin}</p>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon entreprise</p>
                <p className="input_profil">{profil?.id_profil?.pr_entreprise || ""}</p>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes liens</p>
                <p className="input_profil">{liens.li_github}</p>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">OK pour</p>
                {Array.isArray(profilAide) && profilAide.length > 0 ? (
                  profilAide.map((item) => (
                    <p className="input_profil" key={item.id_profil_aide}>
                      {item.TypeAide.type_aide}
                    </p>
                  ))
                ) : (
                  <p>Aucune aide trouvée</p>
                )}

              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes compétences</p>
                {Array.isArray(profilCompetence) && profilCompetence.length > 0 ? (
                  profilCompetence.map((item) => (
                    <p className="input_profil" key={item.id_profil_competence}>
                      {item.Competence.nom_competence}
                    </p>
                  ))
                ) : (
                  <p>Aucune compétence trouvée</p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mail perso / Numéro de téléphone</p>
                <p  className="input_profil">{profil?.id_profil?.pr_tel || ""}</p>

              </div>
            </div>
            
            <div className="boutton_page_profil">
              <button
                className="boutton_modifier_profil"
                onClick={() => {navigateTo("/edit_profil_page")}}
              >
                Modifier mon profil
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default ProfilPage;