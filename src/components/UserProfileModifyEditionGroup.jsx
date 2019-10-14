import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const EditionGroupContainer = styled.article`
    ${tw`w-full mt-4`}
`;

const EditorGroupHeader = styled.header`
    ${tw`flex justify-between items-center mb-2`}

    > h2 {
        font-family: 'Saira', sans-serif;

        ${tw`text-xl`}
    }
`;

const EditorGroupSubmitButton = styled.button`
    ${tw`font-bold`}

    &:focus {
        ${tw`outline-none`}
    }
`;

export default function EditionGroup({ title, children }) {
    return (
        <EditionGroupContainer>
            <EditorGroupHeader>
                <h2>{title}</h2>

                <EditorGroupSubmitButton>Envoyer</EditorGroupSubmitButton>
            </EditorGroupHeader>

            <section>{children}</section>
        </EditionGroupContainer>
    );
}
