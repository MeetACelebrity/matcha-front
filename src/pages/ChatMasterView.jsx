import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useParams } from 'react-router-dom';

import ConversationsList from '../components/ConversationsList.jsx';
import ConversationId from '../components/ConversationId.jsx';

const Container = styled.div`
    ${tw`flex flex-nowrap w-full h-full relative`}

    & > :nth-child(1) {
        ${tw`w-1/3`}
    }

    & > :nth-child(2) {
        ${tw`w-2/3 border-l border-gray-300`}
    }
`;

export default function ChatMasterView() {
    const { uuid } = useParams();

    return (
        <Container>
            <ConversationsList />

            <ConversationId id={uuid} />
        </Container>
    );
}
