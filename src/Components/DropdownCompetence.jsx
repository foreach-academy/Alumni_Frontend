import React, { useEffect, useState } from "react";
import Select from 'react-select';
import TypeCompetenceService from "../Services/TypeCompetence";

const TypeCompetence = () => {
    const [typeCompetence, setTypeCompetence] = useState([]);

    const fetchTypeCompetence = async () => {
        try {
            const response = await TypeCompetenceService.getAllTypeCompetence();
            setTypeCompetence(response.data);
        } catch (error) {
            console.error('Error fetching type competence:', error);
        }
    };

    useEffect(() => {
        fetchTypeCompetence();
    }, []);

    const options = typeCompetence.map(type_competence => ({
        value: type_competence.type_competence,
        label: type_competence.type_competence,
    }));

    return (
        <Select
            options={options}
            className="dropdown_type_competence"
        />
    );
};

export default TypeCompetence;