import axios from "axios";

class   TypeAideService{
    static getAllTypeAide(){
        return axios.get("http://127.0.0.1:3000/type_aide");
    }
}

export default TypeAideService;