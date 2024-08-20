import React, { useEffect, useState } from "react";
import Select from 'react-select';
import PromotionService from "../Services/PromotionService";

const Promotion = () => {
    const [promotions, setPromotions] = useState([]);

    const fetchPromotions = async () => {
        try {
            const response = await PromotionService.getAllPromotion();
            setPromotions(response.data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const options = promotions.map(promotion => ({

        value: promotion.id_promotion,
        value: promotion.nom_promotion,
        label: promotion.nom_promotion,
    }));

    return (
        <Select
            options={options}
            className="dropdown_promotion"
        />
    );
};

export default Promotion;