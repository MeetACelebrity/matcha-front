import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

const PictureContainer = styled.div`
    ${tw`flex items-stretch relative w-1/3 h-32`}

    max-width: 250px;
    min-width: 200px;

    &:hover > img + div {
        ${tw`opacity-75`}
    }
`;

const Img = styled.img`
    ${tw`object-cover`}
`;

const OverlayContainer = styled.div`
    ${tw`absolute inset-0 flex items-center justify-center opacity-0 bg-gray-900 text-white`}

    transition: opacity 100ms;
`;

function DeleteButton({ onClick = () => {} }) {
    return <FeatherIcon icon="delete" onClick={onClick} />;
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

export default function UserProfileModifyPictures() {
    const [pictures] = useState([
        { src: 'https://picsum.photos/536/354' },
        { src: 'https://picsum.photos/536/355' },
        { src: 'https://picsum.photos/536/356' },
    ]);

    return (
        <UserProfileModifyEditionGroup title="Profile Pictures">
            <PicturesContainer>
                {pictures.map(({ src }, i) => (
                    <Picture src={src} alt="Profile" key={i} />
                ))}
            </PicturesContainer>
        </UserProfileModifyEditionGroup>
    );
}
