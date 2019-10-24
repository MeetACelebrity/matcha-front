import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { toast } from 'react-toastify';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import AddPictureButton from './UserProfileModifyPicturesAddPictureButton.jsx';
import Picture from './UserProfileModifyPicturesPicture.jsx';
import { API_ENDPOINT } from '../constants.js';

const PicturesContainer = styled.div`
    ${tw`flex items-center justify-start overflow-x-scroll w-full`}

    min-height: 10rem;
`;

export default function UserProfileModifyPictures({
    user,
    user: { images },
    context,
    setContext,
}) {
    const [uploadStack, setUploadStack] = useState([]);
    const [readingStack, setReadingStack] = useState([]);
    const filteredPictures = useMemo(
        () =>
            images
                .filter(({ imageNumber }) => imageNumber !== 0)
                .sort(({ imageNumber: a }, { imageNumber: b }) => a - b),
        [images]
    );

    useEffect(() => {
        for (const { temporaryUuid, uuid, imageNumber } of uploadStack) {
            setContext({
                ...context,
                user: {
                    ...user,
                    images: images.map(({ uuid: imageUuid, ...image }) => {
                        if (imageUuid === temporaryUuid) {
                            return {
                                ...image,
                                uuid,
                                imageNumber,
                            };
                        }
                        return {
                            ...image,
                            uuid: imageUuid,
                        };
                    }),
                },
            });

            setUploadStack(
                uploadStack.filter(({ uuid: taskUuid }) => taskUuid !== uuid)
            );
        }
    }, [uploadStack, setContext, context, images, user, setUploadStack]);

    useEffect(() => {
        for (const { temporaryUuid, result, imageNumber } of readingStack) {
            setContext({
                ...context,
                user: {
                    ...user,
                    images: [
                        ...images,
                        {
                            src: result,
                            uuid: temporaryUuid,
                            imageNumber,
                        },
                    ],
                },
            });

            setReadingStack(
                readingStack.filter(
                    ({ temporaryUuid: taskUuid }) => taskUuid !== temporaryUuid
                )
            );
        }
    }, [context, setContext, user, images, readingStack, setReadingStack]);

    function onFileChange({
        target: {
            files: [file],
        },
        target,
    }) {
        if (
            !['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
                file.type
            )
        ) {
            toast('Bad file type, try with another one !', {
                type: 'error',
            });
            return;
        }

        const temporaryUuid = images.length;

        const reader = new FileReader();

        reader.onload = ({ target: { result } }) => {
            setReadingStack([
                ...readingStack,
                { temporaryUuid, result, imageNumber: images.length },
            ]);
        };

        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profile', file);

        // Reset the input value in order to permit
        // the same file to be chose consecutively several times.
        target.value = null;

        // send the file to the API
        fetch(`${API_ENDPOINT}/profile/pics`, {
            credentials: 'include',
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(({ statusCode, image: { uuid, src, imageNumber } = {} }) => {
                if (statusCode === 'DONE') {
                    // this was a successful uploading
                    setUploadStack([
                        ...uploadStack,
                        { temporaryUuid, uuid, src, imageNumber },
                    ]);
                } else {
                    // an error occured
                }
            });
    }

    function onDelete(uuid) {
        return () => {
            setContext({
                ...context,
                user: {
                    ...user,
                    images: images.filter(
                        ({ uuid: imageUuid }) => imageUuid !== uuid
                    ),
                },
            });

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
