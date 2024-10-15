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

const EditProfilPage = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [profil, setProfil] = useState({
    pr_nom: "",
    pr_prenom: "",
    pr_description: "",
    id_lien: "",
    pr_entreprise: "",
    pr_tel: "",
    pr_imgprofil: "" ,
    recherche: "",
    fun_fact : "", 
    id_utilisateur: ""
  });
  const [liens, setLiens] = useState({
    li_linkedin: "",
    li_github: "",
    li_perso: "",
    id_profil: "",
  });
  const [profilCompetence, setProfilCompetence] = useState({
    id_profil: "",
    id_competence: ""
  });
  const [parcours, setParcours] = useState({
    id_parcours: "",
    id_formation: "",
    id_promotion: "",
    id_profil: ""
  });
  const [utilisateur, setUtilisateur] = useState({
    ut_email: "",
    ut_motdepasse: ""
  })
  

  const [profilAide, setProfilAide] = useState([]);
  const [formation, setFormation] = useState([]); 
  const [typeAide, setTypeAide] = useState([]);
  const [Competence, setCompetence] = useState([]);
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
              setParcours(Array.isArray(parcoursData) ? parcoursData : [parcoursData]);  
          } catch (error) {
              console.error("Erreur lors de la récupération des parcours:", error);
          }
      }
  };
  
  fetchParcours();
}, [profil?.id_profil?.id_profil]);

useEffect(() => {
  const fetchUtilisateur = async () => {
    if (profil?.id_profil?.id_profil) {  
      try {
        const utilisateurData = await UtilisateurService.getUtilisateurByProfilId(profil?.id_profil?.id_profil);
        setUtilisateur(utilisateurData);  
      } catch (error) {
        console.error("Erreur lors de la récupération des infos de l'utilisateur:", error);
      }
    }
  };

  fetchUtilisateur();
}, [profil?.id_profil?.id_profil]);  


  const updateProfil = async () => {
    try {
        const profilId = profil.id_profil.id_profil; 
        const utilisateurId = utilisateur.id_utilisateur;
        let profilUpdated = false; // Indicateur pour savoir si le profil a été mis à jour

        if (profilId) {
            // Mise à jour des informations de profil si elles ont changé
            const profilUpdates = {
                pr_nom: profil.pr_nom,
                pr_prenom: profil.pr_prenom,
                pr_description: profil.pr_description,
                pr_linkedin: profil.pr_linkedin,
                pr_entreprise: profil.pr_entreprise,
                pr_tel: profil.pr_tel,
                pr_imgprofil: profil.pr_imgprofil,
                recherche: profil.recherche,
                fun_fact: profil.fun_fact,
                id_utilisateur: profil.id_utilisateur
            };

            // Vérifie si des mises à jour de profil de base ont eu lieu
            const currentProfil = await ProfilService.getProfilById(profilId);
            const hasProfilChanged = 
                currentProfil.pr_nom !== profil.pr_nom ||
                currentProfil.pr_prenom !== profil.pr_prenom ||
                currentProfil.pr_description !== profil.pr_description ||
                currentProfil.pr_linkedin !== profil.pr_linkedin ||
                currentProfil.pr_entreprise !== profil.pr_entreprise ||
                currentProfil.pr_tel !== profil.pr_tel ||
                currentProfil.pr_imgprofil !== profil.pr_imgprofil ||
                currentProfil.recherche !== profil.recherche ||
                currentProfil.fun_fact !== profil.fun_fact;


            if (hasProfilChanged) {
                await ProfilService.updateProfil(profilId, profilUpdates);
                profilUpdated = true;
            }

            // Appel des fonctions de mise à jour individuelles
            await handleLiensChange(profilId); 
            await handleCompetenceChange(profilId); 
            await handleProfilAideChange(profilId); 
            await handleParcoursChange(profilId); 
            await handleUtilisateurChange(utilisateurId); 

            if (profilUpdated) {
                toast.success("Profil mis à jour avec succès !");

                // Rechargement de la page après 5 secondes (5000 ms)
                setTimeout(() => {window.location.reload();}, 5000);
            } else {
                console.log("Aucune modification détectée dans le profil.");
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        toast.error("Une erreur est survenue lors de la mise à jour.");
    }
};

const handleLiensChange = async (profilId) => {
    try {
        const currentLien = await LiensService.getLiensById(profilId, profil.id_profil.id_lien);
        
        // Vérifie si les liens ont changé
        const hasLienChanged = 
            currentLien.li_linkedin !== liens.li_linkedin ||
            currentLien.li_github !== liens.li_github ||
            currentLien.li_perso !== liens.li_perso;

        if (profil.id_profil.id_lien) {
            // Mise à jour du lien existant uniquement si un champ a été modifié
            if (hasLienChanged) {
                await LiensService.updateLiens(profilId, profil.id_profil.id_lien, {
                    li_linkedin: liens.li_linkedin,
                    li_github: liens.li_github,
                    li_perso: liens.li_perso
                });
                toast.success("Lien mis à jour avec succès !");

                setTimeout(() => {window.location.reload();}, 5000);
            } else {
                console.log("Aucune modification détectée dans les liens.");
            }
        } else {
            // Création d'un nouveau lien
            const response = await LiensService.createLien(profilId, {
                li_linkedin: liens.li_linkedin,
                li_github: liens.li_github,
                li_perso: liens.li_perso
            });
            const newLienId = response.data.id_lien;
            await ProfilService.updateProfil(profilId, { id_lien: newLienId });
            toast.success("Lien créé avec succès !");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des liens:", error);
    }
};

const handleCompetenceChange = async (profilId) => {
    try {
        const competenceData = { 
            id_profil: profilId, 
            id_competence: profil.selectedTypeCompetence 
        };

        if (profilCompetence && profilCompetence.id_competence) {
            await ProfilCompetenceService.updateProfilCompetence(competenceData.id_profil, competenceData.id_competence);
            toast.success("Compétence mise à jour avec succès !");

            setTimeout(() => {window.location.reload();}, 5000);
        } else {
            await ProfilCompetenceService.addProfilCompetence(competenceData.id_profil, competenceData.id_competence);
            toast.success("Compétence ajoutée au profil !");

            setTimeout(() => {window.location.reload();}, 5000);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des compétences:", error);
    }
};

const handleProfilAideChange = async (profilId) => {
    try {
        const profilAideData = {
            id_profil: profilId,
            id_typeaide: profil.selectedTypeAide 
        };

        if (profilAide && profilAide.id_profil_aide) {
            await ProfilAideService.updateProfilAide(profilAide.id_profil_aide, profilAideData);
            toast.success("Aide mise à jour avec succès !");
            setTimeout(() => {window.location.reload();}, 5000);
        } else if (profil.selectedTypeAide) {
            const response = await ProfilAideService.addProfilAide(profilAideData);
            toast.success("Nouvelle aide ajoutée avec succès !");
            setTimeout(() => {window.location.reload();}, 5000);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'aide:", error);
    }
};

const handleParcoursChange = async (profilId) => {
  try {
    const parcoursData = {
      id_profil: profilId,
      id_formation: parcours.selectedTypeFormation,
    };
    console.log(parcoursData);

    // Vérifier si un parcours existe déjà
    const currentParcours = await ParcoursService.getParcoursByProfilId(profilId);
    
    // Si le parcours existe, vérifiez s'il a changé
    const hasParcoursChanged =
    currentParcours.id_formation !== parcours.id_formation ||
      currentParcours.id_promotion !== parcours.id_promotion;

    if (currentParcours && currentParcours.id_parcours) {
      // Si des changements ont été détectés, mettre à jour le parcours
      if (hasParcoursChanged) {
        await ParcoursService.updateParcours(currentParcours.id_parcours, parcoursData);
        toast.success("Parcours mis à jour avec succès !");
        setTimeout(() => {window.location.reload();}, 5000);
      } else {
        console.log("Aucune modification détectée dans le parcours.");
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du parcours:", error);
  }
};

const handleUtilisateurChange = async (profilId) => {
  try {
    const utilisateurId = utilisateur.id_utilisateur;
    const currentUtilisateur = await UtilisateurService.getUtilisateurByProfilId(profilId);
    // Vérifie si les informations de l'utilisateur ont changé
    const hasUtilisateurChanged =
      currentUtilisateur.ut_email !== utilisateur.ut_email ||
      currentUtilisateur.ut_motdepasse !== utilisateur.ut_motdepasse;

    if (hasUtilisateurChanged) {
      // Mise à jour des informations de l'utilisateur si elles ont changé
      await UtilisateurService.updateUtilisateur(utilisateurId, {
        ut_email: utilisateur.ut_email,
        ut_motdepasse: utilisateur.ut_motdepasse
      });
      toast.success("Utilisateur mis à jour avec succès !");
      setTimeout(() => {window.location.reload();}, 5000);
    } else {
      console.log("Aucune modification détectée dans les informations de l'utilisateur.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des informations de l'utilisateur :", error);
    toast.error("Une erreur est survenue lors de la mise à jour de l'utilisateur.");
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


  // Ajout d'une fonction pour basculer entre le mode d'édition et le mode d'affichage
const toggleEditMode = () => {
  setIsEditing((prevEditing) => !prevEditing);
};
  // console.log(profil)
  
  return (
    <>
      <NavBar className="NavBar_profil_page" />
      <div className="triangles">
        <svg className="triangle1" width="196" height="225" viewBox="0 0 196 225" fill="" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.250693" y1="0.567388" x2="195.251" y2="113.567" stroke=""/>
        <line x1="193.248" y1="114.434" x2="0.247583" y2="224.434" stroke=""/>
        </svg>
        <svg className="triangle2" width="196" height="225" viewBox="0 0 196 225" fill="" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.250693" y1="0.567388" x2="195.251" y2="113.567" stroke=""/>
        <line x1="193.248" y1="114.434" x2="0.247583" y2="224.434" stroke=""/>
        </svg>
        <svg className="triangle3" width="196" height="225" viewBox="0 0 196 225" fill="" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.250693" y1="0.567388" x2="195.251" y2="113.567" stroke=""/>
        <line x1="193.248" y1="114.434" x2="0.247583" y2="224.434" stroke=""/>
        </svg>
      </div>

      <body className="page_profil">
        <div className="text_bienvenue">
          <div className="info_image">
            {isEditing ? (
              previewImage ? (
                <img
                  src={previewImage}
                  alt="Aperçu de la photo"
                  className="profile-image"
                />
              ) : profil?.id_profil?.pr_imgprofil ? (
                <img
                  src={`http://127.0.0.1:3006/${profil.id_profil.pr_imgprofil}`} 
                  alt="Photo de profil"
                  className="profile-image"
                />
              ) : (
                <img
                  src={defaultProfileImage} 
                  alt="Photo de profil par défaut"
                  className="profile-image defaut"
                />
              )
            ) : (
              profil?.id_profil?.pr_imgprofil ? (
                <img
                  src={`http://127.0.0.1:3006/${profil.id_profil.pr_imgprofil}`} 
                  alt="Photo de profil"
                  className="profile-image"
                />
              ) : (
                <img
                  src={defaultProfileImage}
                  alt="Photo de profil par défaut"
                  className="profile-image defaut"
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
            <div className="info-group-double">
              {isEditing ? (
                <>
                <p className="liste_info_double">Nom / Prénom</p>
                  <input
                    type="text"
                    name="nom"
                    placeholder={profil.id_profil ? `${profil.id_profil.pr_nom}` : "Nom"}
                    onChange={(e) => {
                      setProfil({ ...profil, pr_nom: e.target.value });
                    }}
                    className="input_profil_double"
                  />
                  <input
                    type="text"
                    name="prenom"
                    placeholder={profil.id_profil ? `${profil.id_profil.pr_prenom}` : "Prénom"}
                    onChange={(e) => {
                      setProfil({ ...profil, pr_prenom: e.target.value });
                    }}
                    className="input_profil_double"
                  />
                </>
              ) : (
                <p className="input_profil_affichage">
                  {}
                </p>
              )}
            </div>
          </div>

          <div className="info">
            <div className="info-group">
              <p className="liste_info">Ma formation / Mon parcours</p>
              {isEditing ? (
                <select
                  className="input_profil"
                  onChange={(e) => {
                    setParcours({ ...parcours, selectedTypeFormation: parseInt(e.target.value) });
                  }}
                >
                  <option value="" disabled selected>
                    Choisissez une formation
                  </option>
                  {formation.length > 0 ? (
                    formation.map((formation) => (
                      <option value={formation.id_formation} key={formation.id_formation}>
                        {formation.type_formation}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucune formation disponible</option>
                  )}
                </select>
              ) : (
                <div className="affichage_container">
                {Array.isArray(parcours) && parcours.length > 0 ? (
                  parcours.map((item) => (
                    <p className="affichage_item" key={item.id_parcours}>
                      {item.formation.type_formation}
                    </p>
                  ))
                ) : (
                  <p>Aucun parcours trouvé</p>
                )}
                </div>
              )}
            </div>
          </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes spécialités</p>
                {isEditing ?(
                <input
                  type="text"
                  name="specialite"
                  placeholder={profil.id_profil && profil.id_profil.pr_description ? profil.id_profil.pr_description : "Spécialité"}
                  onChange={(e) => {
                    setProfil({ ...profil, pr_description: e.target.value });
                  }}
                  className="input_profil"
                />
                ):(
                  <p className="input_profil_affichage">{profil.id_profil && profil.id_profil.pr_description ? profil.id_profil.pr_description : "Spécialité"}</p> )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon LinkedIn</p>
                {isEditing ?(
                  <input
                    type="text"
                    name="linkedin"
                    placeholder={liens.li_linkedin || "Mon LinkedIn"}
                    onChange={(e) => {
                      setLiens({ ...liens, li_linkedin: e.target.value });
                    }}
                    className="input_profil"
                  />
                ):(
                  <p className="input_profil_affichage">{liens.li_linkedin || "Mon LinkedIn"}</p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mon entreprise</p>
                {isEditing ?(
                  <input
                    type="text"
                    name="entreprise"
                    placeholder={profil.id_profil && profil.id_profil.pr_entreprise ? profil.id_profil.pr_entreprise : "Entreprise"}
                    onChange={(e) => {
                      setProfil({ ...profil, pr_entreprise: e.target.value });
                    }}
                    className="input_profil"
                  />
                ):(
                  <p className="input_profil_affichage">{profil.id_profil && profil.id_profil.pr_entreprise ? profil.id_profil.pr_entreprise : "Entreprise"}</p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes liens</p>
                {isEditing ?(
                  <input
                    type="text"
                    name="lien"
                    placeholder={liens.li_github || "Github, Portfolio ..."}                  
                    onChange={(e) => {
                      setLiens({ ...liens, li_github: e.target.value });
                    }}
                    className="input_profil"
                  />
                ):(
                  <p className="input_profil_affichage">{liens.li_github || "Github, Portfolio ..."}</p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">OK pour</p>
                {isEditing ? (
                  <select
                    className="input_profil"
                    onChange={(e) => {
                      setProfil({ ...profil, selectedTypeAide: parseInt(e.target.value) });
                    }}
                  >
                    <option value="" disabled selected>Choisissez une option</option>

                    {typeAide.map((type_aide) => (
                      <option value={type_aide.id_typeaide} key={type_aide.id_typeaide}>
                        {type_aide.type_aide}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="affichage_container">
                    {Array.isArray(profilAide) && profilAide.length > 0 ? (
                      profilAide.map((item) => (
                        <p className="affichage_item" key={item.id_profil_aide}>
                          {item.TypeAide.type_aide}
                        </p>
                      ))
                    ) : (
                      <p>Aucune aide trouvée</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Mes compétences</p>
                {isEditing ?(
                  <select
                    className="input_profil"
                    onChange={(e) => {
                      setProfil({ ...profil, selectedTypeCompetence: parseInt(e.target.value) });
                    }}
                  >
                    <option value="" disabled selected>Choisissez une compétence</option>

                    {Competence.map((competence) => (
                      <option value={competence.id_competence} key={competence.id_competence}>
                        {competence.nom_competence}
                      </option>
                    ))}
                  </select>
                ):(
                  <div className="affichage_container">
                    {Array.isArray(profilCompetence) && profilCompetence.length > 0 ? (
                        profilCompetence.map((item) => (
                            <p className="affichage_item" key={item.id_profil_competence}>
                                {item.Competence.nom_competence}
                            </p>
                        ))
                    ) : (
                        <p>Aucune compétence à afficher.</p>
                    )}
                </div>

                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Numéro de téléphone</p>
                {isEditing ?(
                  <input
                    type="text"
                    name="telephone"
                    placeholder={profil.id_profil && profil.id_profil.pr_tel ? profil.id_profil.pr_tel : "Numéro/Email"}
                    onChange={(e) => {
                      setProfil({ ...profil, pr_tel: e.target.value });
                    }}
                    className="input_profil"
                  />
                ):(  
                  <p className="input_profil_affichage">{profil.id_profil && profil.id_profil.pr_tel ? profil.id_profil.pr_tel : "Numéro/Email"}</p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Email perso</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="utemail"
                    placeholder={utilisateur?.ut_email || "Email"}
                    onChange={(e) => {
                      setUtilisateur({ ...utilisateur, ut_email: e.target.value }); 
                    }}
                    className="input_profil"
                  />
                ) : (
                  <p className="input_profil_affichage">{utilisateur?.ut_email || "Email"} </p>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                {isEditing ?(
                  <>
                  <p className="liste_info">Recherche : stage, alternance, premier emploi, emploi ?</p>

                  <input
                    type="text"
                    name="recherche"
                    placeholder={ profil.id_profil && profil.id_profil.recherche ? profil.id_profil.recherche :"stage, alternance, premier emploi, emploi ?"}
                    onChange={(e) => {
                      setProfil({ ...profil, recherche: e.target.value });
                    }}
                    className="input_profil"
                  />
                  </>
                ):(
                  <>
                  <p className="liste_info">Recherche</p>
                  <p className="input_profil_affichage">{profil.id_profil && profil.id_profil.recherche ? profil.id_profil.recherche : "Recherche"}</p>
                  </>
                )}
              </div>
            </div>
            <div className="info">
              <div className="info-group">
                <p className="liste_info">Petit truc fun</p>
                {isEditing ?(
                  <input
                    type="text"
                    name="funfact"
                    placeholder={profil.id_profil && profil.id_profil.fun_fact ? profil.id_profil.fun_fact : "Truc fun"}
                    onChange={(e) => {
                      setProfil({ ...profil, fun_fact: e.target.value });
                    }}
                    className="input_profil"
                  />
                ):(
                  <p className="input_profil_affichage">{profil.id_profil && profil.id_profil.fun_fact ? profil.id_profil.fun_fact : "Truc fun"}</p>
                )}
              </div>
            </div>
            <div className="info">
              {isEditing ?(
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
              ):(
                ""
              )}
            </div>
            <div className="boutton_page_profil">
              {isEditing ? (
                <>
                  <button
                    className="boutton_modifier_profil"
                    onClick={() => {
                      updateProfil();
                      uploadImage();
                    }}
                  >
                    Valider
                  </button>
                  <button
                    className="boutton_annuler"
                    onClick={toggleEditMode} 
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  className="boutton_modifier_profil"
                  onClick={toggleEditMode}
                >
                  Modifier mon profil
                </button>
              )}
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default EditProfilPage;