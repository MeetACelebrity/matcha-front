import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import FeathersIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

import { AppContext } from '../app-context.js';

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

const ItemHoverStyle = tw`opacity-50`;
const ItemFocusStyle = tw`opacity-100`;
const Item = styled.div`
    ${tw`flex items-center h-20 px-2 py-1 relative z-10`}

    &::before {
        ${tw`absolute inset-0 opacity-0 z-0`}

        content: '';
        background-color: rgba(0, 0, 0, 0.1);
        transition: opacity 200ms;
    }

    &:hover::before {
        ${ItemHoverStyle}
    }

    ${({ selected }) =>
        selected &&
        css`
            &&::before {
                ${ItemFocusStyle}
            }
        `}
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

export default function ConversationsList({ id, className }) {
    const {
        context: { pubsub },
    } = useContext(AppContext);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (!pubsub) return;

        function onData(conversations) {
            setConversations(conversations);
        }

        pubsub.listen(onData);

        return () => {
            pubsub.unlisten(onData);
        };
    }, [id, pubsub]);

    return (
        <Container className={className}>
            <Head>
                <div></div>

                <h3>Conversations</h3>

                <FeathersIcon icon="plus-circle" />
            </Head>

            <List>
                {conversations.map(({ uuid, picture, title, description }) => (
                    <Item
                        as={Link}
                        selected={uuid === id}
                        to={`/chat/${uuid}`}
                        key={uuid}
                    >
                        <Avatar src={picture} />

                        <ItemContent>
                            <Correspondant>{title}</Correspondant>

                            <Extract>{description}</Extract>
                        </ItemContent>
                    </Item>
                ))}
            </List>
        </Container>
    );
}
