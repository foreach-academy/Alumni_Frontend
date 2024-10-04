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


const ProfilPage = () => {
  const [profil, setProfil] = useState({
    pr_nom: "",
    pr_prenom: "",
    pr_description: "",
    pr_linkedin: "",
    pr_entreprise: "",
    pr_liens: "",
    pr_tel: "",
    pr_imgprofil: "" 
  });
  const [formation, setFormation] = useState([]);
  const [typeAide, setTypeAide] = useState([]);
  const [typeCompetence, setTypeCompetence] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Ajouter l'état pour l'aperçu
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

  const addProfil = () => {
    instance
      .post("/profil", profil)
      .then((response) => {
        toast.success("Profil mis à jour!");
        navigate("/profil");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Créer une URL pour l'aperçu de l'image
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      try {
        await instance.post(`/profil/${profil.id_profil}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success("Image de profil mise à jour!");
        // Re-fetch the profile to get the updated image
        const utilisateur = UtilisateurService.getUtilisateurIdFromToken();
        const response = await instance.get(`/utilisateur/${utilisateur}/profil`);
        setProfil(response.data);
        setPreviewImage(null); // Réinitialiser l'aperçu après le téléchargement
      } catch (error) {
        toast.error("Erreur lors du téléchargement de l'image de profil.");
        console.error(error);
      }
    }
  };

  return (
    <>
      <NavBar className="NavBar_profil_page" />
      <body className="page_profil">
        <div className="text_bienvenue">
          <div className="info info_image">
            <div className="">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Aperçu de la photo"
                  className="profile-image"
                />
              ) : (
                profil.pr_imgprofil && (
                  <img
                    src={`http://127.0.0.1:3006/${profil.pr_imgprofil}`}
                    alt="Photo de profil"
                    className="profile-image"
                  />
                )
              )}
            </div>
            <div className="info-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input_profil casab"
              />
              <button onClick={handleImageUpload}>Ajouter une photo</button>
            </div>
          </div>
          <h2>BIENVENUE SUR TON <span className="espace_alumni">ESPACE ALUMNI</span></h2>
        </div>
        <div className="content_profil">
          <div className="header-title">
            <h1>{profil.pr_nom ? `${profil.pr_nom} ${profil.pr_prenom}` : "Nom prénom"}</h1>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Ma formation / Mon parcours</p>
              <select
                required
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
                placeholder="Spécialité"
                onChange={(e) => {
                  setProfil({ ...profil, pr_description: e.target.value });
                }}
                className="input_profil"
                required
              />
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mon LinkedIn</p>
              <input
                type="text"
                name="linkedin"
                placeholder="Mon LinkedIn"
                onChange={(e) => {
                  setProfil({ ...profil, pr_linkedin: e.target.value });
                }}
                className="input_profil"
                required
              />
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mon entreprise</p>
              <input
                type="text"
                name="entreprise"
                placeholder="Entreprise"
                onChange={(e) => {
                  setProfil({ ...profil, pr_entreprise: e.target.value });
                }}
                className="input_profil"
                required
              />
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mes liens</p>
              <input
                type="text"
                name="lien"
                placeholder="Github, Portfolio..."
                onChange={(e) => {
                  setProfil({ ...profil, pr_liens: e.target.value });
                }}
                className="input_profil"
                required
              />
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">OK pour</p>
              <select
                required
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
                required
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
                placeholder="Numéro/Email"
                onChange={(e) => {
                  setProfil({ ...profil, pr_tel: e.target.value });
                }}
                className="input_profil"
                required
              />
            </div>
          </div>
          <div className="boutton_page_profil">
            <button
              className="boutton_modifier_profil"
              onClick={() => {
                addProfil();
              }}
            >
              Modifier mon profil
            </button>
          </div>
        </div>
      </body>
    </>
  );
};

export default ProfilPage;

