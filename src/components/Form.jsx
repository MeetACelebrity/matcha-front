import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import TextField from './TextField.jsx';

const FormContainer = styled.form`
    ${tw`flex flex-col items-stretch`}
`;

export default function useForm({ fields = [], onSubmit }) {
    const [isValid, setFormIsValid] = useState(false);

    useEffect(() => {
        setFormIsValid(!fields.some(field => field.isValid === false));
    }, [fields]);

    const form = (
        <FormContainer onSubmit={onSubmit}>
            {fields.map((props, i) => (
                <TextField key={i} {...props} />
            ))}
        </FormContainer>
    );

    return [isValid, form];
}

export function useFormField() {
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(true);

    return [value, setValue, valid, setValid];
}
