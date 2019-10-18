import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import ProfileCard from '../components/ProfileCard.jsx';

const Container = styled.article`
    ${tw`w-full`}

    transition: all 100ms;
`;

export default function Profile({
    uuid,
    username,
    givenName,
    familyName,
    profilePicture,
    pictures = [],
    preview,
}) {
    return (
        <Container>
            <ProfileCard
                uuid={uuid}
                username={username}
                givenName={givenName}
                familyName={familyName}
                profilePicture={profilePicture}
                pictures={pictures}
                preview={preview}
            />
        </Container>
    );
}
