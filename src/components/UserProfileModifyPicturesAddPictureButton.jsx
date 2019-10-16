import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

const AddPictureButtonLabel = styled.label`
    ${tw`bg-gray-400 flex items-center justify-center mx-6 p-3 rounded-full shadow relative cursor-pointer`}

    &::after {
        content: '';

        transition: opacity 100ms;

        ${tw`absolute inset-0 rounded-full shadow-md opacity-0`}
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }

    &:focus {
        ${tw`outline-none`}
    }
`;

export default function AddPictureButton({ onChange }) {
    return (
        <AddPictureButtonLabel type="upload">
            <input name="new-picture" type="file" hidden onChange={onChange} />

            <FeatherIcon icon="plus" />
        </AddPictureButtonLabel>
    );
}
