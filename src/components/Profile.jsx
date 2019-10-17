import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import remy from '../assets/remy.png';
import girl from '../assets/girl.png';

import ProfileCard from '../components/ProfileCard.jsx';

const Container = styled.article`
    ${tw`w-full bg-red-500`}

    transition: all 100ms;
`;

export default function Profile() {
    return (
        <Container>
            <ProfileCard
                uuid="123456789"
                username="Kekette"
                givenName="Baptiste"
                familyName="Devessier"
                profilePicture={{ src: remy }}
                pictures={[{ src: girl }]}
            />
        </Container>
    );
}
