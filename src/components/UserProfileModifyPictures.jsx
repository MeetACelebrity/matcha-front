import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import AddPictureButton from './UserProfileModifyPicturesAddPictureButton.jsx';
import Picture from './UserProfileModifyPicturesPicture.jsx';

const PicturesContainer = styled.div`
    ${tw`flex items-center justify-start overflow-x-scroll w-full`}
`;

export default function UserProfileModifyPictures() {
    const [reader] = useState(new FileReader());
    const [pictures, setPictures] = useState([
        { src: 'https://picsum.photos/536/354' },
        { src: 'https://picsum.photos/536/355' },
        { src: 'https://picsum.photos/536/356' },
    ]);

    useEffect(() => {
        reader.onload = ({ target: { result } }) => {
            setPictures([...pictures, { src: result }]);
        };
    }, [reader, setPictures, pictures]);

    function onFileChange({
        target: {
            files: [file],
        },
    }) {
        reader.readAsDataURL(file);

        // send the file to the API
    }

    return (
        <UserProfileModifyEditionGroup title="Profile Pictures" noButton>
            <PicturesContainer>
                {pictures.map(({ src }, i) => (
                    <Picture
                        src={src}
                        alt="One of my profile picture"
                        key={i}
                    />
                ))}

                {pictures.length < 4 && (
                    <AddPictureButton onChange={onFileChange} />
                )}
            </PicturesContainer>
        </UserProfileModifyEditionGroup>
    );
}
