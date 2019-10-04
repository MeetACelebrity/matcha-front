import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

const Container = styled.div`
    ${tw`relative max-w-full h-64`}
`;

const ImagesContainer = styled.div`
    ${tw`h-full`}

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;

    transition: transform 500ms ease-out;
    will-change: transform;

    > img {
        ${tw`max-h-full w-full object-cover`}
    }
`;

const Image = styled.img`
    ${tw`bg-red-500 `}
`;

const NavButtonContainer = styled.nav`
    ${tw`absolute inset-y-0 flex justify-center items-center`}

    ${props =>
        props.position === 'left'
            ? css`
                  left: 0;
                  padding-left: 5px;
              `
            : css`
                  right: 0;
                  padding-right: 5px;
              `}
`;

const NavButton = styled.button`
    ${tw`bg-gray-800 rounded-full w-5 h-5 text-white flex justify-center items-center`}

    transition: opacity 100ms ease-out;

    &:focus {
        ${tw`outline-none`}
    }

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0;
            cursor: auto;
        `}
`;

const Footer = styled.footer`
    ${tw`absolute bottom-0 inset-x-0 py-2 flex justify-center items-center`}
`;

const Dot = styled.button`
    ${tw`bg-gray-800 shadow w-3 h-3 rounded-full relative mx-1`}

    transition: background-color 200ms ease-out;

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }

    ${({ active }) => active && tw`bg-gray-500`}

    &::after {
        content: '';
        ${tw`absolute w-full h-full inset-0 rounded-full shadow-2xl opacity-0`}

        transition: all 200ms;
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }
`;

function decrementDisplayedImage({ displayedImage, setDisplayedImage }) {
    if (displayedImage <= 0) return;

    setDisplayedImage(displayedImage - 1);
}

function incrementDisplayedImage({
    imagesCount,
    displayedImage,
    setDisplayedImage,
}) {
    console.log('inc');
    if (displayedImage + 1 >= imagesCount) return;

    setDisplayedImage(displayedImage + 1);
}

export default function ImageCarousel({ images = [] }) {
    const [displayedImage, setDisplayedImage] = useState(0);

    const imagesCount = images.length;

    return (
        <Container>
            <ImagesContainer
                style={{ transform: `translateX(-${displayedImage * 100}%)` }}
            >
                {images.map(({ src }, i) => (
                    <Image key={i} src={src} />
                ))}
            </ImagesContainer>

            <NavButtonContainer position="left">
                <NavButton
                    onClick={() =>
                        decrementDisplayedImage({
                            imagesCount,
                            displayedImage,
                            setDisplayedImage,
                        })
                    }
                    disabled={displayedImage === 0}
                >
                    <FeatherIcon icon="chevron-left" size={18} />
                </NavButton>
            </NavButtonContainer>

            <NavButtonContainer position="right">
                <NavButton
                    onClick={() =>
                        incrementDisplayedImage({
                            imagesCount,
                            displayedImage,
                            setDisplayedImage,
                        })
                    }
                    disabled={displayedImage === imagesCount - 1}
                >
                    <FeatherIcon icon="chevron-right" size={18} />
                </NavButton>
            </NavButtonContainer>

            <Footer>
                {images.map((_, i) => (
                    <Dot
                        key={i}
                        onClick={() => setDisplayedImage(i)}
                        active={displayedImage === i}
                    />
                ))}
            </Footer>
        </Container>
    );
}
