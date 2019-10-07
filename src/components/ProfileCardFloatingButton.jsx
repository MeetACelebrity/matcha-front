import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

const Button = styled.button`
    ${tw`flex justify-center items-center absolute right-0 m-6 h-12 w-12 shadow-lg rounded-full bg-blue-800 text-white`}

    bottom: 64px;

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }
`;

export default function ProfileCardFloatingButton({ edit = false }) {
    return (
        <Button name="edit-profile">
            <FeatherIcon icon={edit === true ? 'edit-2' : 'heart'} />
        </Button>
    );
}
