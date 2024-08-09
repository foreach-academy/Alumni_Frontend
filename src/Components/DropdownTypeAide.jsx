import React, { useEffect, useState } from "react";
import Select from 'react-select';
import TypeAideService from "../Services/TypeAideService";

const TypeAide = () => {
    const [typeAide, setTypeAide] = useState([]);

    const fetchTypeAide = async () => {
        try {
            const response = await TypeAideService.getAllTypeAide();
            setTypeAide(response.data);
        } catch (error) {
            console.error('Error fetching type aide:', error);
        }
    };

    useEffect(() => {
        fetchTypeAide();
    }, []);

    const options = typeAide.map(type_aide => ({
        value: type_aide.type_aide,
        label: type_aide.type_aide,
    }));

    return (
        <Select
            options={options}
            className="dropdown_typeAide"
        />
    );
};

export default TypeAide;