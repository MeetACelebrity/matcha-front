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
    pictures,
    images,
    age,
    distance,
    liked,
    hasLikedMe,
    onLike,
    preview,
}) {
    return (
        <Container>
            <ProfileCard
                uuid={uuid}
                username={username}
                givenName={givenName}
                familyName={familyName}
                age={age}
                distance={distance}
                profilePicture={profilePicture}
                pictures={pictures || images}
                preview={preview}
                liked={liked}
                hasLikedMe={hasLikedMe}
                onLike={() => onLike(uuid)}
            />
        </Container>
    );
}
