import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import AddPictureButton from './UserProfileModifyPicturesAddPictureButton.jsx';
import Picture from './UserProfileModifyPicturesPicture.jsx';

const PicturesContainer = styled.div`
    ${tw`flex items-center justify-start overflow-x-scroll w-full`}
`;

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
