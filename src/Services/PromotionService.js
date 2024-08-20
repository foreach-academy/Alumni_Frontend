import axios from "axios";

class PromotionService{
    static getAllPromotion(){
        return axios.get("http://127.0.0.1:3006/promotion");
    }
}

export default PromotionService;