import React from 'react';
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
    ${tw`rounded-full object-cover h-full`}
`;

const Aside = styled.aside`
    ${tw`absolute bottom-0 inset-x-0 flex justify-end`}
`;

const ChangePictureButton = styled.button`
    ${tw`relative p-2 rounded-full bg-blue-800 text-white shadow`}

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
    return (
        <ProfileContainer>
            <Img src={src} alt="profile picture" />

            <Aside>
                <ChangePictureButton>
                    <FeatherIcon icon="edit-2" />
                </ChangePictureButton>
            </Aside>
        </ProfileContainer>
    );
}

export default function UserProfileModifyProfileImage({ src }) {
    return (
        <Preferences>
            <ProfileImage src={src} />
        </Preferences>
    );
}
