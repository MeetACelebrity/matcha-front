import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import TextField from './TextField.jsx';

const FormContainer = styled.form`
    ${tw`flex flex-col items-stretch`}
`;

function FormComponent({ isValid, onSubmit, fields }) {
    const [triggerValidation, setTriggerValidation] = useState(false);

    function submitHandler(e) {
        e.preventDefault();

        setTriggerValidation(true);

        // We must wait for validation termination, in 100ms it will be finished
        setTimeout(() => {
            if (isValid.current) {
                onSubmit(e);
            }
        }, 100);
    }

    return (
        <FormContainer onSubmit={submitHandler}>
            {fields.map((props, i) => (
                <TextField
                    key={i}
                    {...props}
                    triggerValidation={triggerValidation}
                />
            ))}

            <button type="submit">Send</button>
        </FormContainer>
    );
}

export default function useForm({ fields = [] }) {
    let isValid = useRef(false);

    useEffect(() => {
        isValid.current = !fields.some(field => field.isValid === false);
    }, [fields]);

    return [isValid, FormComponent];
}

export function useFormField() {
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(true);

    return [value, setValue, valid, setValid];
}
