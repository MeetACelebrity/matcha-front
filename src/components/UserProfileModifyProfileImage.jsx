import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

const Preferences = styled.section`
    ${tw`mt-8`}
`;

const ProfileContainer = styled.div`
    ${tw`relative w-64 h-64 mx-auto`}
`;

const Img = styled.img`
    ${tw`rounded-full object-cover h-full w-full`}
`;

const Aside = styled.aside`
    ${tw`absolute bottom-0 inset-x-0 flex justify-end`}
`;

const ChangePicture = styled.label`
    ${tw`relative p-2 rounded-full bg-blue-800 text-white shadow cursor-pointer`}

    bottom: 20px;
    right: 20px;

    &::after {
        content: '';
        transition: opacity 200ms;

        ${tw`absolute inset-0 shadow-xl opacity-0 rounded-full`}
    }

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }
`;

function ProfileImage({ src }) {
    const [displayedImage, setDisplayedImage] = useState(src);
    const reader = useMemo(() => new FileReader(), []);

    useEffect(() => {
        setDisplayedImage(src);
    }, [src, setDisplayedImage]);

    useEffect(() => {
        reader.onload = ({ target: { result } }) => {
            setDisplayedImage(result);
        };
    }, [reader, setDisplayedImage]);

    function onFileChange({
        target: {
            files: [file],
        },
    }) {
        reader.readAsDataURL(file);

        // fetch()
    }

    return (
        <ProfileContainer>
            <Img src={displayedImage} alt="profile picture" />

            <Aside>
                <ChangePicture>
                    <input type="file" hidden onChange={onFileChange} />
                    <FeatherIcon icon="edit-2" />
                </ChangePicture>
            </Aside>
        </ProfileContainer>
    );
}

export default function UserProfileModifyProfileImage({
    images: [
        { src } = {
            src:
                'https://images.unsplash.com/photo-1491921125492-f0b9c835b699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        },
    ] = [],
}) {
    return (
        <Preferences>
            <ProfileImage src={src} />
        </Preferences>
    );
}
