import axios from "axios";

class FormationService {
    static getAllFormation(){
        return axios.get("http://127.0.0.1:3006/formation");
    }
}

export default FormationService;