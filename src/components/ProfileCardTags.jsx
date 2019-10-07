import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const tagColors = [
    tw`bg-blue-900`,
    tw`bg-blue-600`,
    tw`bg-blue-800`,
    tw`bg-blue-700`,
];

const TagsContainer = styled.section`
    ${tw`flex items-center flex-wrap mt-3`}
`;

const Tag = styled.button`
    ${tw`text-white px-3 py-1 my-1 mx-1 rounded-full relative shadow`}

    ${({ index }) => tagColors[index % tagColors.length]}

    &::after {
        content: '';

        ${tw`absolute inset-0 shadow-md opacity-0 rounded-full`}

        transition: opacity 200ms ease-out;
    }

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }

    & > :first-child::before {
        content: '#';

        ${tw`mr-2`}
    }
`;

export default function ProfileCardTags({ tags }) {
    return (
        <TagsContainer>
            {tags.map((tag, i) => (
                <Tag key={tag} index={i}>
                    <span>{tag}</span>
                </Tag>
            ))}
        </TagsContainer>
    );
}
