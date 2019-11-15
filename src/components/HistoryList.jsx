import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { NavLink } from 'react-router-dom';

import { API_ENDPOINT } from '../constants.js';
import InfiniteScrollContainer from './InfiniteScrollContainer.jsx';

const Container = styled.article`
    ${tw`mx-auto px-5 w-3/5 mt-6`}
`;

const Title = styled.h2`
    font-family: 'Saira', sans-serif;

    ${tw`text-3xl mb-4`}
`;

const Item = styled.div`
    ${tw`flex items-center bg-white px-3 py-2 cursor-pointer`}

    transition: background-color 200ms;

    &:first-of-type {
        ${tw`rounded-tl rounded-tr`}
    }

    &:not(:last-of-type) {
        ${tw`border-b border-gray-400`}
    }

    &:last-of-type {
        ${tw`rounded-bl rounded-br`}
    }

    &:hover {
        ${tw`bg-gray-300`}
    }
`;

const Picture = styled.img`
    ${tw`w-16 h-16 rounded-full mr-6`}
`;

const Username = styled.h3`
    ${tw`text-lg`}
`;

export default function HistoryList({ title, type, noData, dataProperty }) {
    const LIMIT = 10;

    const [lovers, setLovers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [offsetsFetched, setOffsetsFetched] = useState([]);

    const fetchLovers = useCallback(() => {
        if (offsetsFetched.includes(offset)) return;

        setOffsetsFetched([...offsetsFetched, offset]);

        return fetch(
            `${API_ENDPOINT}/user/${type}/history/${LIMIT}/${offset}`,
            {
                credentials: 'include',
            }
        )
            .then(res => res.json())
            .then(
                ({
                    [dataProperty]: {
                        data: newLovers,
                        data: { length: newLoversCount },
                        hasMore,
                    },
                }) => {
                    if (newLoversCount > 0) {
                        setLovers([...lovers, ...newLovers]);
                        setOffset(offset + newLoversCount);
                    }

                    setHasMore(hasMore);
                }
            )
            .catch(console.error);
    }, [dataProperty, lovers, offset, offsetsFetched, type]);

    useEffect(() => {
        fetchLovers();
    }, [fetchLovers]);

    return (
        <Container>
            <Title>{title}</Title>

            {lovers.length === 0 ? (
                <div>{noData}</div>
            ) : (
                <InfiniteScrollContainer
                    fetchMore={fetchLovers}
                    hasMore={hasMore}
                    useWindow
                >
                    {lovers.map(({ uuid, username, src }, i) => (
                        <Item as={NavLink} to={`/profile/${uuid}`} key={i}>
                            <Picture
                                src={src}
                                alt={`${username}'s profile picture`}
                            />

                            <Username>{username}</Username>
                        </Item>
                    ))}
                </InfiniteScrollContainer>
            )}
        </Container>
    );
}
