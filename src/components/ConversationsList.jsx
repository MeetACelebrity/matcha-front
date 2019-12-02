import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeathersIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

const Container = styled.div`
    ${tw`w-full min-h-full relative flex flex-col bg-white`}
`;

const Head = styled.div`
    ${tw`h-12 flex justify-between items-center px-4 py-2 bg-white shadow`}
`;

const List = styled.div`
    ${tw`flex-1`}

    height: calc(100% - 3rem);
`;

const Item = styled.div`
    ${tw`flex items-center h-20 px-2 py-1 relative z-10`}

    &::after {
        ${tw`absolute inset-0 opacity-0 z-0`}

        content: '';
        background-color: rgba(0, 0, 0, 0.1);
        transition: opacity 200ms;
    }

    &:hover::after {
        ${tw`opacity-100`}
    }
`;

const Avatar = styled.img`
    ${tw`h-12 w-12 rounded-full bg-blue-700 mr-3`}
`;

const ItemContent = styled.div`
    ${tw`flex flex-col`}
`;

const Correspondant = styled.h4`
    ${tw``}
`;

const Extract = styled.p`
    ${tw`text-gray-700 font-thin text-sm`}
`;

export default function ConversationsList({
    conversations = [{}, {}, {}],
    className,
}) {
    return (
        <Container className={className}>
            <Head>
                <div></div>

                <h3>Conversations</h3>

                <FeathersIcon icon="plus-square" />
            </Head>

            <List>
                {conversations.map((v, i) => (
                    <Item as={Link} to={`/chat/${i}`} key={i}>
                        <Avatar />

                        <ItemContent>
                            <Correspondant>Baptiste Devessier</Correspondant>

                            <Extract>You want to suck my dick ?</Extract>
                        </ItemContent>
                    </Item>
                ))}
            </List>
        </Container>
    );
}
