import axios from "axios";

class   TypeCompetenceService{
    static getAllTypeCompetence(){
        return axios.get("http://127.0.0.1:3006/type_competence");
    }
}

export default TypeCompetenceService;