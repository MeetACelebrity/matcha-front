import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.article`
    ${tw`mx-auto px-5 w-3/5`}
`;

const Title = styled.h1`
    font-family: 'Saira', sans-serif;

    ${tw`text-3xl`}
`;

export default function MyLovers() {
    return (
        <Container>
            <Title>My Visitors !</Title>
        </Container>
    );
}
