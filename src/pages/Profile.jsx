import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import ProfileCard from '../components/ProfileCard.jsx';

const Container = styled.article`
    ${tw`mx-auto px-5 w-3/5`}
`;

export default function Profile() {
    const { uuid } = useParams();

    console.log('profile uuid =', uuid);

    return (
        <Container>
            <ProfileCard flat />
        </Container>
    );
}
