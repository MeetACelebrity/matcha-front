import React, { useState, useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeathersIcon from 'feather-icons-react';

import { AppContext } from '../app-context.js';

const Container = styled.div`
    ${tw`w-full min-h-full relative flex flex-col justify-between items-stretch bg-white`}
`;

const Head = styled.div`
    ${tw`h-12 flex justify-center items-center px-4 py-2 bg-white shadow`}
`;

const MessagesContainer = styled.div`
    ${tw`flex-1 relative`}
`;

const Messages = styled.div`
    ${tw`flex flex-col items-stretch absolute inset-0 overflow-y-scroll p-2`}
`;

const LastMessageStyle = tw`rounded-b-lg mb-4`;
const Message = styled.div`
    ${tw`rounded-none px-2 py-1 bg-gray-300 break-words`}

    max-width: 80%;
    margin-bottom: 0.125rem;

    @media (min-width: 640px) {
        max-width: 66.666667%;
    }

    &.left {
        ${tw`self-start rounded-tr-lg rounded-br-lg`}
    }
    &.right {
        ${tw`self-end bg-blue-700 text-white rounded-tl-lg rounded-bl-lg`}
    }

    &:first-child {
        ${tw`rounded-t-lg`}
    }
    &.left + &.right,
    &.right + &.left {
        ${tw`rounded-t-lg`}
    }

    ${({ last }) => last && LastMessageStyle}
`;

const Form = styled.div`
    ${tw`h-12 px-3 py-1`}
`;

const InputContainer = styled.label`
    ${tw`flex items-center w-full h-full rounded-full bg-gray-300 cursor-text`}
`;

const Input = styled.input`
    ${tw`flex-1 bg-transparent ml-2`}

    &::placeholder {
        ${tw`text-gray-800`}
    }
`;

const SendButton = styled.button`
    ${tw`flex justify-center items-center h-8 w-8 mr-2 rounded-full bg-blue-500 text-white cursor-pointer`}
`;

export default function ConversationId({ id }) {
    const {
        context: { pubsub },
    } = useContext(AppContext);
    const [conversation, setConversation] = useState(undefined);
    const messages = useMemo(() => {
        if (
            !(
                conversation !== undefined &&
                Array.isArray(conversation.messages)
            )
        )
            return [];

        return conversation.messages;
    }, [conversation]);
    const title = useMemo(() => {
        if (
            !(
                conversation !== undefined &&
                typeof conversation.title === 'string'
            )
        )
            return id;

        return conversation.title;
    }, [conversation, id]);

    useEffect(() => {
        if (!pubsub) return;

        function onData(data) {
            setConversation(data);
        }

        pubsub.subscribe(id, onData);

        return () => {
            pubsub.unsubscribe(id, onData);
        };
    }, [id, pubsub]);

    function onSend(e) {
        e.stopPropagation();

        console.log('send !');
    }

    return (
        <Container>
            <Head>{title}</Head>

            <MessagesContainer>
                <Messages>
                    {messages.map((v, i) => {
                        const left = i % 3 === 0;
                        const nextLeft = (i + 1) % 3 === 0;

                        return (
                            <Message
                                className={left ? 'left' : 'right'}
                                last={left !== nextLeft}
                                key={i}
                            >
                                qdfgjqdfhgjkqdfg{'lol '.repeat(i % 20)}
                            </Message>
                        );
                    })}
                </Messages>
            </MessagesContainer>

            <Form>
                <InputContainer>
                    <Input placeholder="Write your message…" />

                    <SendButton onClick={onSend}>
                        <FeathersIcon icon="send" size={16} />
                    </SendButton>
                </InputContainer>
            </Form>
        </Container>
    );
}
