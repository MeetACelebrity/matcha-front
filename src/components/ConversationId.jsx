import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeathersIcon from 'feather-icons-react';

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
    ${tw`absolute inset-0 overflow-y-scroll`}
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
    const title = Boolean(id) === true ? `Conversation ${id}` : 'Hololo';

    function onSend(e) {
        e.stopPropagation();

        console.log('send !');
    }

    return (
        <Container>
            <Head>{title}</Head>

            <MessagesContainer>
                <Messages>
                    {new Array(100).fill(null).map((v, i) => (
                        <div key={i}>qdfgjqdfhgjkqdfg</div>
                    ))}
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
