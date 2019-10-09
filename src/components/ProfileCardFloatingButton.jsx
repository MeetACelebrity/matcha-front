import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

const Button = styled.button`
    ${tw`flex justify-center items-center fixed right-0 bottom-0 m-6 h-12 w-12 shadow-lg rounded-full bg-blue-800 text-white`}

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }
`;

export default function ProfileCardFloatingButton({ edit = false }) {
    const el = edit ? Link : null;
    const to = edit ? '/me/edit' : null;

    return (
        <Button as={el} to={to} name="edit-profile">
            <FeatherIcon icon={edit === true ? 'edit-2' : 'heart'} />
        </Button>
    );
}
