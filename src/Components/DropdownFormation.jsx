import React, { useEffect, useState } from "react";
import Select from 'react-select';
import FormationService from "../Services/FormationService";

const Formation = () => {
    const [formations, setFormations] = useState([]);

    const fetchFormation = async () => {
        try {
            const response = await FormationService.getAllFormation();
            setFormations(response.data);
        } catch (error) {
            console.error('Error fetching formations:', error);
        }
    };

    useEffect(() => {
        fetchFormation();
    }, []);

    const options = formations.map(formation => ({
        value: formation.id_formation,
        label: formation.type_formation,
    }));

    return (
        <Select
            options={options}
            className="dropdown_formation"
        />
    );
};

export default Formation;