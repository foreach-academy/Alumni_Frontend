import axios from "axios";

class FormationService {
    static getAllFormation(){
        return axios.get("http://127.0.0.1:3000/formation");
    }
}

export default FormationService;