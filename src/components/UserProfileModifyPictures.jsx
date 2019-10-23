import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import AddPictureButton from './UserProfileModifyPicturesAddPictureButton.jsx';
import Picture from './UserProfileModifyPicturesPicture.jsx';
import { API_ENDPOINT } from '../constants.js';

const PicturesContainer = styled.div`
    ${tw`flex items-center justify-start overflow-x-scroll w-full`}

    min-height: 10rem;
`;

export default function UserProfileModifyPictures({ user: { images } }) {
    const [pictures, setPictures] = useState(images);
    const reader = useMemo(() => new FileReader(), []);
    const filteredPictures = useMemo(
        () =>
            pictures
                .filter(({ imageNumber }) => imageNumber !== 0)
                .sort(({ imageNumber: a }, { imageNumber: b }) => a < b),
        [pictures]
    );

    useEffect(() => {
        reader.onload = ({ target: { result } }) => {
            setPictures([...pictures, { src: result, uuid: pictures.length }]);
        };
    }, [reader, setPictures, pictures]);

    function onFileChange({
        target: {
            files: [file],
        },
    }) {
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profile', file);

        // send the file to the API
        fetch(`${API_ENDPOINT}/profile/pics`, {
            credentials: 'include',
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then(res => res.json())
            .then(console.log);
    }

    function onDelete(uuid) {
        return () => {
            fetch(`${API_ENDPOINT}/profile/pics`, {
                credentials: 'include',
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ pics: uuid }),
            })
                .then(res => res.json())
                .then(console.log);
        };
    }

    return (
        <UserProfileModifyEditionGroup title="Profile Pictures" noButton>
            <PicturesContainer>
                {filteredPictures.map(({ uuid, src }) => (
                    <Picture
                        src={src}
                        alt="One of my profile picture"
                        key={uuid}
                        onDelete={onDelete(uuid)}
                    />
                ))}

                {filteredPictures.length < 4 && (
                    <AddPictureButton onChange={onFileChange} />
                )}
            </PicturesContainer>
        </UserProfileModifyEditionGroup>
    );
}
