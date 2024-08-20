import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import "../Styles/ProfilPage.css";
import instance from "../API/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CardProfil from "../Components/PhotoProfil";
import Formation from "../Components/DropdownFormation";
import TypeCompetence from "../Components/DropdownCompetence";
import TypeAide from "../Components/DropdownTypeAide";

const ProfilPage = () => {
  const [formation, setFormation] = useState([]);
  const [typeAide, setTypeAide] = useState([]);
  const [typeCompetence, setTypeCompetence] = useState([]);
  const navigate = useNavigate();


  const [profil, setProfil] = useState({
    type_formation: "",
    pr_description: "",
    pr_linkedin: "",
    pr_entreprise: "",
    pr_liens: "",
    type_aide: "",
    type_competence: "",
    pr_tel: "",
    pr_fun: "",
  });

  const addProfil = () => {
    instance
      .post("/profil", profil)
      .then((response) => {
        toast.success("Profil mis a jour!");
        navigate("/profil");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const getFormation = () => {
    instance
      .get("/fomation")
      .then((response) => {
        setFormation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    getFormation();
    getTypeAide();
    getTypeCompetence();
  }, []);

  return (
    <>
    <NavBar className="NavBar_profil_page" />
      <body className="page_profil">
        {/* <CardProfil/> */}
        <div className="text_bienvenue">
        <h2>BIENVENUE SUR TON <span className="espace_alumni">ESPACE ALUMNI</span></h2>
        </div>
        <div className="content_profil">
          <div className="header-title">
            <h1>Nom</h1>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Ma formation / Mon parcours</p>
            <Formation className="input_profil"/>
              {/* <select
                required
                className="input_profil"
                name=""
                id=""
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
              </select> */}
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mes specialites</p>
              <input
                type="text"
                name="specialite"
                placeholder="Specialite"
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
              <p className="liste_info">Mon Linkedin</p>
              <input
                type="lien"
                name="linkedin"
                placeholder="Mon linkedin"
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
                type="lien"
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
              <TypeAide/>
              {/* <select
                required
                className="input_profil"
                name=""
                id=""
                onChange={(e) => {
                  setTypeAide({
                    ...typeAide,
                    type_aide: parseInt(e.target.value),
                  });
                }}
              >
                {typeAide.map((type_aide, id) => (
                  <option value={type_aide.id_typeaide} key={id}>
                    {type_aide.type_aide}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mes compétences</p>
              <TypeCompetence type="text" name="type_competence" className="input_profil"/>
              {/* <select
                required
                className="input_profil"
                name=""
                id=""
                onChange={(e) => {
                  setTypeCompetence({
                    ...typeCompetence,
                    type_competence: parseInt(e.target.value),
                  });
                }}
              >
                {typeCompetence.map((type_competence, id) => (
                  <option
                    value={type_competence.id_type_competence}
                    key={id}
                  >
                    {typeAide.type_competence}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <div className="info">
            <div className="info-group">
              <p className="liste_info">Mail perso / Numero de téléphone</p>
              <input
                type="text"
                name="telephone"
                placeholder="Numero/Email"
                onChange={(e) => {
                  setProfil({ ...profil, pr_telephone: e.target.value });
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
