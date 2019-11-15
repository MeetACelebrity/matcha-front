import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

import FloatingButton from './FloatingButton.jsx';

const notFloating = tw`static mx-auto my-0 bg-pink-500`;
const liked = tw`bg-pink-500`;
const notLiked = tw`bg-white text-pink-500`;

const Button = styled(FloatingButton)`
    ${({ floating }) => floating === false && notFloating}

    ${({ floating, liked: state }) =>
        floating === false && (state ? liked : notLiked)}
`;

const ButtonNav = styled(Button)``;

export default function ProfileCardFloatingButton({
    edit = false,
    floating = true,
    liked = false,
    disabled = false,
    onLike,
}) {
    const to = edit ? '/me/edit' : null;
    const Icon = <FeatherIcon icon={edit === true ? 'edit-2' : 'heart'} />;

    if (edit === true) {
        return (
            <ButtonNav as={Link} to={to}>
                {Icon}
            </ButtonNav>
        );
    }

    return (
        <Button
            name={liked === true ? 'unlike-profile' : 'like-profile'}
            floating={floating}
            disabled={disabled}
            liked={liked}
            onClick={onLike}
        >
            {Icon}
        </Button>
    );
}
