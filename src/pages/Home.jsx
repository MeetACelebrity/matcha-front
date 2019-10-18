import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

import remy from '../assets/remy.png';
import girl from '../assets/girl.png';

import ProfileCard from '../components/ProfileCard.jsx';
import ProfilesContainer from '../components/ProfilesContainer.jsx';
import { AppContext } from '../app-context';

const ClosingContainer = styled.button`
    ${tw`absolute py-2 w-6 flex justify-center items-center bg-blue-700 text-white rounded-r opacity-25`}

    transition: opacity 200ms ease-out;

    &:hover {
        ${tw`opacity-100`}
    }

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }

    > svg {
        transition: transform 200ms ease-out;

        &.reverse {
            transform: rotate3d(0, 1, 0, 180deg);
        }
    }

    top: 20px;
    right: -24px;
`;

const Container = styled.section`
    ${tw`w-full`}

    display: grid;
    grid-template-columns: repeat(10, 1fr);

    & > :first-child {
        ${tw`hidden`}

        transition: transform 200ms ease-out;

        &.collapse {
            transform: translateX(-100%);
        }

        @media (min-width: 768px) {
            ${tw`block z-20`}

            grid-column: 1 / span 3;
            grid-row: 1;
        }
    }

    & > :nth-child(2) {
        grid-column: 1 / span 10;
        grid-row: 1;

        @media (min-width: 768px) {
            ${tw`z-10 mx-8`}

            grid-column: 4 / 11;
            grid-row: 1;

            &.expand {
                grid-column: 2 / span 8;
            }
        }
    }
`;

export default function Home() {
    const {
        context: {
            user: { uuid },
        },
    } = useContext(AppContext);

    const [collapse, setCollapse] = useState(false);
    const homeViewRef = useRef(null);

    function toggleCollapse() {
        const newValue = !collapse;
        const homeView = homeViewRef.current;

        setCollapse(newValue);

        if (homeView === null) return;

        if (newValue === true) {
            homeView.classList.add('expand');
        } else {
            homeView.classList.remove('expand');
        }
    }

    return (
        <Container>
            <ProfileCard
                uuid={uuid}
                username="Kekette"
                givenName="Baptiste"
                familyName="Devessier"
                profilePicture={{ src: remy }}
                pictures={[{ src: girl }]}
                className={collapse ? 'collapse' : ''}
            >
                <ClosingContainer
                    name="expand-collapse"
                    onClick={toggleCollapse}
                >
                    <FeatherIcon
                        icon="chevron-left"
                        className={collapse ? 'reverse' : ''}
                    />
                </ClosingContainer>
            </ProfileCard>

            <ProfilesContainer
                ref={homeViewRef}
                profiles={[{ id: 'lol' }]}
                preview={true}
            />
        </Container>
    );
}
