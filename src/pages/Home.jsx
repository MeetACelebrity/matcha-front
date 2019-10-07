import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import remy from '../assets/remy.png';
import girl from '../assets/girl.png';

import ProfileCard from '../components/ProfileCard.jsx';

const Container = styled.section`
    ${tw`w-full`}

    display: grid;
    grid-template-columns: repeat(10, 1fr);

    grid-column-gap: 1rem;
    column-gap: 1rem;

    & > :first-child {
        ${tw`hidden`}

        @media (min-width: 768px) {
            ${tw`block`}

            grid-column: 1 / span 3;
            grid-row: 1;
        }
    }

    & > :nth-child(2) {
        grid-column: 1 / span 10;
        grid-row: 1;

        @media (min-width: 768px) {
            grid-column: 1 / span 3;
            grid-row: 1;
        }
    }
`;

export default function Home() {
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

            <article>This is home</article>
        </Container>
    );
}
