import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import TextField from './TextField.jsx';

const FormContainer = styled.form`
    ${tw`flex flex-col items-stretch`}
`;

function FormComponent({ onSubmit, fields }) {
    return (
        <FormContainer onSubmit={onSubmit}>
            {fields.map((props, i) => (
                <TextField key={i} {...props} />
            ))}
        </FormContainer>
    );
}

export default function useForm({ fields = [] }) {
    const [isValid, setFormIsValid] = useState(false);

    useEffect(() => {
        setFormIsValid(!fields.some(field => field.isValid === false));
    }, [fields]);

    return [isValid, FormComponent];
}

export function useFormField() {
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(true);

    return [value, setValue, valid, setValid];
}
