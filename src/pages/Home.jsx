import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';
import { toast } from 'react-toastify';

import MyProfile from '../components/MyProfile.jsx';
import ProfilesContainer from '../components/ProfilesContainer.jsx';
import { API_ENDPOINT, fetcher, useIsMounted } from '../constants.js';

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
    const LIMIT = 5;

    const [collapse, setCollapse] = useState(false);
    const homeViewRef = useRef(null);
    const [body, setBody] = useState({});
    const [profiles, setProfiles] = useState([]);
    const offsetsFetchedRef = useRef(new Set());
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const isMounted = useIsMounted();

    const fetchData = useCallback(
        (offset, body, hideLoader = false) => {
            if (offsetsFetchedRef.current.has(offset)) return;

            offsetsFetchedRef.current.add(offset);

            setLoading(!hideLoader);

            fetcher(`${API_ENDPOINT}/match/proposals/${LIMIT}/${offset}`, {
                credentials: 'include',
                method: 'POST',
                body,
                json: true,
            })
                .then(res => res.json())
                .then(({ result: { data, hasMore } = {}, statusCode }) => {
                    if (!isMounted.current) return;

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

                    setHasMore(hasMore);

                    if (data.length > 0) {
                        setProfiles(profiles => [...profiles, ...data]);
                        setOffset(offset => offset + data.length);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    if (!isMounted.current) return;

                    setLoading(false);
                });
        },
        [isMounted]
    );

    useEffect(() => {
        // Fetch data on first load
        fetchData(0, {});
    }, [fetchData]);

    function fetchMore() {
        fetchData(offset, body, true);
    }

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
        const matchingUser = profiles.find(
            ({ uuid: profileUuid }) => profileUuid === uuid
        );
        if (matchingUser === undefined) return;

        setProfiles(profiles =>
            profiles.filter(({ uuid: profileUuid }) => profileUuid !== uuid)
        );

        fetch(`${API_ENDPOINT}/user/like/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .catch(() => {})
            .finally(() => {
                const { username } = matchingUser;

                toast(`You liked ${username}`, {
                    type: 'success',
                });
            });
    }

    function onDismiss(uuid) {
        const matchingUser = profiles.find(
            ({ uuid: profileUuid }) => profileUuid === uuid
        );
        if (matchingUser === undefined) return;

        setProfiles(profiles =>
            profiles.filter(({ uuid: profileUuid }) => profileUuid !== uuid)
        );

        fetch(`${API_ENDPOINT}/user/not-interested/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .catch(() => {})
    }

    function onFiltersUpdate({
        sortBy,
        sortOrder,
        ageRange,
        distanceRange,
        popularityRange,
        countCommonTags,
    }) {
        const body = {
            orderBy: sortBy,
            order: sortOrder,
            minAge: ageRange[0] | 0,
            maxAge: ageRange[1] | 0,
            minDistance: distanceRange[0] | 0,
            maxDistance: distanceRange[1] | 0,
            minScore: popularityRange[0] | 0,
            maxScore: popularityRange[1] | 0,
            minCommonTags: countCommonTags[0] | 0,
            maxCommonTags: countCommonTags[1] | 0,
        };

        offsetsFetchedRef.current.clear();
        setBody(body);
        setOffset(0);
        setProfiles([]);

        fetchData(0, body, false);
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

            <ProfilesContainer
                ref={homeViewRef}
                profiles={profiles}
                onLike={onLike}
                onDismiss={onDismiss}
                onFiltersUpdate={onFiltersUpdate}
                preview={true}
                loading={loading}
                fetchMore={fetchMore}
                hasMore={hasMore}
            />
        </Container>
    );
}
