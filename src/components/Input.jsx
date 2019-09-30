import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const BaseInput = styled.input`
    ${tw`border-b-2 border-transparent focus:border-blue-500 mb-2 outline-none`}

    ${({ className }) => className}

    ${({ isOk }) => isOk && tw`border-red-500`}
`;

export default function Input({
    id,
    value,
    label,
    onChange,
    className,
    type = 'text',
    isOk,
}) {
    return (
        <BaseInput
            id={id}
            type={type}
            label={label}
            value={value}
            onInput={onChange}
            className={className}
            isOk={isOk}
            onChange={onChange}
            required
        />
    );
}
