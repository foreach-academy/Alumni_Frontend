import axios from "axios";

class   CompetenceService{
    static getAllCompetence(){
        return axios.get("http://127.0.0.1:3006/competence");
    }
}

export default CompetenceService;