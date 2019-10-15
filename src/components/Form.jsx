import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import TextField from './TextField.jsx';
import Textarea from './Textarea.jsx';
import SegmentedControl from './SegmentedControl.jsx';

const FormContainer = styled.form`
    ${tw`flex flex-col items-stretch`}
`;

const FormButton = styled.button`
    ${tw`px-3 py-1 rounded text-white bg-blue-700 mt-3 uppercase shadow-md relative z-10`}

    font-family: 'Saira', sans-serif;
    transition: all 300ms ease-in-out;

    &::after {
        ${tw`shadow-lg opacity-0 rounded absolute inset-0 z-0`}

        content: '';
        transition: opacity 300ms ease-in-out;
    }

    &:focus {
        ${tw`outline-none`}
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }
`;

function FormComponent({ isValid, onSubmit, fields, hideButton = false }) {
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
            {fields.map((props, i) => {
                if (props.segmented === true) {
                    return (
                        <SegmentedControl
                            key={`segmented-control-${i}`}
                            {...props}
                        />
                    );
                }

                if (props.textarea === true) {
                    return <Textarea key={`textarea-${i}`} {...props} />;
                }

                return (
                    <TextField
                        key={`text-field-${i}`}
                        {...props}
                        triggerValidation={triggerValidation}
                    />
                );
            })}

            {!hideButton && <FormButton type="submit">Send</FormButton>}
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

export function useFormField(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const [valid, setValid] = useState(true);

    return [value, setValue, valid, setValid];
}
