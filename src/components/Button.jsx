import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'feather-icons-react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const BaseButton = styled.button`
    font-family: 'Saira', sans-serif;

    ${tw`bg-blue-600 stroke-current rounded-full bg-white p-2 cursor-pointer uppercase`}

    &.active.outlined {
        ${tw`text-blue-600`}
    }

    ${({ flat }) => !flat && tw`bg-gray-300`}
`;

const TextButtonRedStyles = tw`bg-red-500`;
const TextButtonBlueStyles = tw`bg-blue-900`;

const TextButton = styled.button`
    ${tw`px-2 py-1 rounded text-white shadow relative`}

    ${({ blue = true }) => blue && TextButtonBlueStyles}

    ${({ red }) => red && TextButtonRedStyles}

    &:disabled {
        ${tw`bg-gray-300 text-gray-700`}
    }

    &:focus {
        ${tw`outline-none`}
    }

    &::after {
        ${tw`absolute inset-0 shadow-lg opacity-0`}

        transition: 200ms opacity;
    }

    &:focus::after {
        ${tw`opacity-100`}
    }
`;

export default function Button({
    to,
    flat = false,
    text = false,
    icon,
    children,
    className,

    // eslint-disable-next-line no-unused-vars
    outlined,
    ...props
}) {
    const Root = text === true ? TextButton : BaseButton;
    const child = icon ? <Icon icon={icon} /> : children;

    if (to === undefined) {
        return (
            <Root className={className} flat={flat} icon={icon} {...props}>
                {child}
            </Root>
        );
    }

    return (
        <Root
            as={NavLink}
            exact
            className={className}
            to={to}
            icon={icon}
            {...props}
        >
            {child}
        </Root>
    );
}
