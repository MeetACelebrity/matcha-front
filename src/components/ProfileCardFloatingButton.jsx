import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

const notFloating = tw`static mx-auto my-0 bg-pink-500`;
const liked = tw`bg-pink-500`;
const notLiked = tw`bg-white text-pink-500`;

const Button = styled.button`
    ${tw`flex justify-center items-center fixed right-0 bottom-0 m-6 h-12 w-12 shadow-lg rounded-full bg-blue-800 text-white`}

    transition: color 150ms, background-color 150ms;

    ${({ floating }) => floating === false && notFloating}

    ${({ floating, liked: state }) =>
        floating === false &&
        (state ? liked : notLiked)}

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }
`;

const ButtonNav = styled(Button)``;

export default function ProfileCardFloatingButton({
    edit = false,
    floating = true,
    liked = false,
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
            liked={liked}
            onClick={onLike}
        >
            {Icon}
        </Button>
    );
}
