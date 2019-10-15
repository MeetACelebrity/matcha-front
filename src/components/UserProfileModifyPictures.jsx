import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

const PictureContainer = styled.div`
    ${tw`flex items-stretch relative w-1/3 h-40 overflow-hidden`}

    max-width: 250px;
    min-width: 200px;

    &:hover > img {
        transform: scale(1.1);
    }

    &:hover > img + div {
        ${tw`opacity-75`}
    }
`;

const Img = styled.img`
    ${tw`object-cover`}

    transition: transform 100ms;

    transform: scale(1);
`;

const OverlayContainer = styled.div`
    ${tw`absolute inset-0 flex items-center justify-center opacity-0 bg-gray-900 text-white`}

    transition: opacity 100ms;
`;

const Button = styled.button`
    &:focus {
        ${tw`outline-none`}
    }

    &:hover,
    &:focus {
        ${tw`text-red-700`}
    }
`;

function DeleteButton({ onClick = () => {} }) {
    return (
        <Button>
            <FeatherIcon icon="delete" onClick={onClick} />
        </Button>
    );
}

function Picture({ src, alt }) {
    return (
        <PictureContainer>
            <Img src={src} alt={alt} />

            <OverlayContainer>
                <DeleteButton />
            </OverlayContainer>
        </PictureContainer>
    );
}

const PicturesContainer = styled.div`
    ${tw`flex items-center justify-start overflow-x-auto`}
`;

const AddPictureButtonLabel = styled.label`
    ${tw`bg-gray-400 flex items-center justify-center mx-2 p-3 rounded-full shadow relative cursor-pointer`}

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

function AddPictureButton({ onChange }) {
    return (
        <AddPictureButtonLabel type="upload">
            <input name="new-picture" type="file" hidden onChange={onChange} />

            <FeatherIcon icon="plus" />
        </AddPictureButtonLabel>
    );
}

export default function UserProfileModifyPictures() {
    const [pictures] = useState([
        { src: 'https://picsum.photos/536/354' },
        { src: 'https://picsum.photos/536/355' },
        { src: 'https://picsum.photos/536/356' },
    ]);

    return (
        <UserProfileModifyEditionGroup title="Profile Pictures" noButton>
            <PicturesContainer>
                {pictures.map(({ src }, i) => (
                    <Picture src={src} alt="Profile" key={i} />
                ))}

                {pictures.length < 4 && <AddPictureButton />}
            </PicturesContainer>
        </UserProfileModifyEditionGroup>
    );
}
