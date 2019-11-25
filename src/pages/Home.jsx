import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';
import { toast } from 'react-toastify';

import MyProfile from '../components/MyProfile.jsx';
import ProfilesContainer from '../components/ProfilesContainer.jsx';
import { API_ENDPOINT } from '../constants.js';

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
    ${tw`w-full h-full`}

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
            ${tw`z-10 ml-8`}

            grid-column: 4 / 11;
            grid-row: 1;

            &.expand {
                grid-column: 1 / span 10;
            }
        }
    }
`;

export default function Home() {
    const LIMIT = 10;

    const [collapse, setCollapse] = useState(false);
    const homeViewRef = useRef(null);
    const [profiles, setProfiles] = useState([]);
    const offsetsFetchedRef = useRef([]);
    const [offset, setOffset] = useState(0);
    const [, setHasMore] = useState(false);
    const [mustFetch, setMustFetch] = useState(true);

    useEffect(() => {
        if (mustFetch === false || offsetsFetchedRef.current.includes(offset))
            return;

        setMustFetch(false);

        offsetsFetchedRef.current.push(offset);

        fetch(`${API_ENDPOINT}/match/proposals/${LIMIT}/${offset}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(({ result: { data, hasMore } = {}, statusCode }) => {
                if (typeof statusCode === 'string') {
                    if (statusCode === 'INCOMPLETE_PROFILE') {
                        toast('Complete your profile guy! 😛', {
                            type: 'info',
                        });

                        return;
                    }

                    toast('An error occured during suggestions fetching', {
                        type: 'error',
                    });

                    return;
                }

                setProfiles(profiles => [...profiles, ...data]);
                setOffset(offset => offset + data.length);
                setHasMore(hasMore);
            })
            .catch(console.error);
    }, [mustFetch, offset]);

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

    function onLike(uuid) {
        setProfiles(profiles =>
            profiles.filter(({ uuid: profileUuid }) => profileUuid !== uuid)
        );

        fetch(`${API_ENDPOINT}/user/like/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }

    return (
        <Container>
            <MyProfile className={collapse ? 'collapse' : ''}>
                <ClosingContainer
                    name="expand-collapse"
                    onClick={toggleCollapse}
                >
                    <FeatherIcon
                        icon="chevron-left"
                        className={collapse ? 'reverse' : ''}
                    />
                </ClosingContainer>
            </MyProfile>

            {profiles.length === 0 ? (
                <div>AHAH NO DATA</div>
            ) : (
                <ProfilesContainer
                    ref={homeViewRef}
                    profiles={profiles}
                    onLike={onLike}
                    preview={true}
                />
            )}
        </Container>
    );
}
