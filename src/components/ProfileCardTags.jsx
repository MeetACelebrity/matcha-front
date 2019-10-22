import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

const tagColors = [
    tw`bg-blue-900`,
    tw`bg-blue-600`,
    tw`bg-blue-800`,
    tw`bg-blue-700`,
];

const greyBg = tw`bg-gray-400`;

const TagsContainer = styled.section`
    ${tw`flex items-center flex-wrap`}
`;

const Tag = styled.button`
    ${tw`text-white px-3 py-1 my-1 mx-1 rounded-full relative shadow`}

    ${({ index }) => tagColors[index % tagColors.length]}
    ${({ more }) => more === true && greyBg}

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

export default function ProfileCardTags({ tags, mini = false }) {
    const [shownTags, setShownTags] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (expanded === true || mini === false) {
            setShownTags(tags);
        } else {
            setShownTags(tags.slice(0, 3));
        }
    }, [tags, mini, expanded]);

    return (
        <TagsContainer>
            {shownTags.map((tag, i) => (
                <Tag key={tag} index={i}>
                    <span>{tag}</span>
                </Tag>
            ))}

            {mini === true && expanded === false && (
                <Tag
                    key="more"
                    more
                    onClick={() => expanded === false && setExpanded(true)}
                >
                    <FeatherIcon icon="more-horizontal" />
                </Tag>
            )}
        </TagsContainer>
    );
}
