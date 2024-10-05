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


const ProfilPage = () => {
  const [profil, setProfil] = useState({
    pr_nom: "",
    pr_prenom: "",
    pr_description: "",
    pr_linkedin: "",
    pr_entreprise: "",
    pr_liens: "",
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

  const [profilAide, setProfilAide] = useState([]);
  const [formation, setFormation] = useState([]);
  const [typeAide, setTypeAide] = useState([]);
  const [typeCompetence, setTypeCompetence] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

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

  const getTypeCompetence = () => {
    instance
      .get("/type_competence")
      .then((response) => {
        setTypeCompetence(response.data);
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
    getTypeCompetence();
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
    const fetchProfilAide = async () => {
      
      try {
        const response = await ProfilAideService.getProfilAideByProfilId(profil.id_profil.id_profil);
        setProfilAide(response); 
        console.log("reponse de fetch profil aide :",response);
      } catch (error) {
        console.error("Erreur lors de la récupération des aides:", error);
      }
    };

    fetchProfilAide();
  }, [profil.id_profil]);


  const updateProfil = async () => {
    try {
        const profilId = profil.id_profil.id_profil; 

        if (profilId) {
            await ProfilService.updateProfil(profilId, {
                pr_nom: profil.pr_nom,
                pr_prenom: profil.pr_prenom,
                pr_description: profil.pr_description,
                pr_linkedin: profil.pr_linkedin,
                pr_entreprise: profil.pr_entreprise,
                pr_tel: profil.pr_tel,
                pr_imgprofil: profil.pr_imgprofil
            });

            if (profil.id_profil.id_lien) {
                // Mise à jour du lien existant
                await LiensService.updateLiens(profil.id_profil.id_profil, profil.id_profil.id_lien, {
                    li_linkedin: liens.li_linkedin,
                    li_github: liens.li_github,
                    li_perso: liens.li_perso
                });
            } else {
                // Création d'un nouveau lien
                const response = await LiensService.createLien(profilId, {
                    li_linkedin: liens.li_linkedin,
                    li_github: liens.li_github,
                    li_perso: liens.li_perso
                });

                // Extraction de l'ID du lien créé depuis la réponse
                const newLienId = response.data.id_lien;

                // Mise à jour de l'id_lien du profil avec l'ID du nouveau lien
                await ProfilService.updateProfil(profilId, { 
                    id_lien: newLienId 
                });
              } 


              // Ajout ou mise à jour de ProfilAide
              const profilAideData = {
                id_profil: profilId,
                id_typeaide: profil.selectedTypeAide 
              };


              if (profilAide && profilAide.id_profil_aide) {
                // Mise à jour du ProfilAide existant
                console.log("id profil aide :",profilAide.id_profil_aide.id_profil_aide)
                console.log("Mise à jour du profil aide avec ID:", profilAide.id_profil_aide);
                await ProfilAideService.updateProfilAide(profilAide.id_profil_aide, profilAideData);
                console.log("Mise à jour des données pour profil aide :", profilAideData);
              } else if (!profilAide.id_profil_aide) {
                // Création d'un nouveau ProfilAide seulement si typeAideId est valide
                console.log("Création d'un nouveau profil aide.");
                const response = await ProfilAideService.addProfilAide(profilAideData);
                const newProfilAide = response.data; // Assurez-vous que c'est bien ici que l'ID est retourné
                console.log("Nouveau ProfilAide créé :", newProfilAide);
              } else {
                console.log("Erreur : typeAideId est invalide ou manquant.");
              }

            toast.success("Profil mis à jour avec succès !");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        toast.error("Une erreur est survenue lors de la mise à jour.");
    }
};



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  
  const uploadImage = async () => {
    if (imageFile) {
      try {
        await ProfilService.uploadProfileImage(profil.id_profil.id_profil, imageFile);
        toast.success("Image de profil mise à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image:", error);
        toast.error("Erreur lors du téléchargement de l'image.");
      }
    }
  };


  console.log(profil)
  
  
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
                  src={`uploads/${profil.pr_imgprofil}`} 
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
            <h1>{profil.id_profil ? `${profil.id_profil.pr_nom} ${profil.id_profil.pr_prenom}` : "Nom prénom"}</h1>
          </div>
          <div className="infos_profil">
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Ma formation / Mon parcours</p>
                <select
                  className="input_profil"
                  onChange={(e) => {
                    setFormation({
                      ...formation,
                      type_formation: parseInt(e.target.value),
                    });
                  }}
                >
                  {formation.map((formation, id) => (
                    <option value={formation.id_formation} key={id}>
                      {formation.type_formation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes spécialités</p>
                <input
                  type="text"
                  name="specialite"
                  placeholder={profil.id_profil ? `${profil.id_profil.pr_description} ` : "Spécialité"}
                  onChange={(e) => {
                    setProfil({ ...profil, pr_description: e.target.value });
                  }}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon LinkedIn</p>
                <input
                  type="text"
                  name="linkedin"
                  placeholder={liens.li_linkedin || "Mon LinkedIn"}
                  onChange={(e) => {
                    setLiens({ ...liens, li_linkedin: e.target.value });
                  }}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon entreprise</p>
                <input
                  type="text"
                  name="entreprise"
                  placeholder={profil.id_profil ? `${profil.id_profil.pr_entreprise} ` : "Entreprise"}
                  onChange={(e) => {
                    setProfil({ ...profil, pr_entreprise: e.target.value });
                  }}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes liens</p>
                <input
                  type="text"
                  name="lien"
                  placeholder={liens.li_linkedin || "Github, Portfolio ..."}
                  onChange={(e) => {
                    setLiens({ ...liens, li_github: e.target.value });
                  }}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">OK pour</p>
                <select
                  className="input_profil"
                  onChange={(e) => {
                    setProfil({ ...profil, selectedTypeAide: parseInt(e.target.value) });
                  }}
                >
                  {typeAide.map((type_aide) => (
                    <option value={type_aide.id_typeaide} key={type_aide.id_typeaide}>
                      {type_aide.type_aide}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes compétences</p>
                <select
                  className="input_profil"
                  onChange={(e) => {
                    setProfil({ ...profil, selectedTypeCompetence: parseInt(e.target.value) });
                  }}
                >
                  {typeCompetence.map((type_competence) => (
                    <option value={type_competence.id_type_competence} key={type_competence.id_type_competence}>
                      {type_competence.type_competence}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mail perso / Numéro de téléphone</p>
                <input
                  type="text"
                  name="telephone"
                  placeholder={profil.id_profil ? `${profil.id_profil.pr_tel} ` : "Numéro/Email"}
                  onChange={(e) => {
                    setProfil({ ...profil, pr_tel: e.target.value });
                  }}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="info">
              <div className="info-group ">
                <p className="liste_info">Ma photo de profil</p>
                <input
                  type="file"
                  name="pr_imgprofil"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input_profil"
                />
              </div>
            </div>
            <div className="boutton_page_profil">
              <button
                className="boutton_modifier_profil"
                onClick={() => {
                  updateProfil();
                  uploadImage();
                }}
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