import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'feather-icons-react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const BaseButton = styled.button`
    ${tw`bg-blue-600 stroke-current rounded-full bg-white p-2 cursor-pointer`}

    &.active.outlined {
        ${tw`text-blue-600`}
    }

    ${({ className }) => className}

    ${({ flat }) => !flat && tw`bg-gray-300`}

    ${({ outlined }) => outlined && tw`outlined`}
`;

export default function Button({
    to,
    flat = false,
    outlined = true,
    icon,
    children,
    className,
}) {
    const child = icon ? <Icon icon={icon} /> : children;

    if (to === undefined) {
        return (
            <BaseButton className={className} flat={flat} outlined={outlined}>
                {child}
            </BaseButton>
        );
    }

    return (
        <BaseButton as={NavLink} exact className={className} to={to}>
            {child}
        </BaseButton>
    );
}
