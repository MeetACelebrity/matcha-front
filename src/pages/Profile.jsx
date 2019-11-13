import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import { API_ENDPOINT, fetcher } from '../constants.js';

import ProfileCard from '../components/ProfileCard.jsx';

const Container = styled.article`
    ${tw`mx-auto px-5 w-3/5`}
`;

export default function Profile() {
    const { uuid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        fetcher(`${API_ENDPOINT}/user/${uuid}`, {
            json: true,
            credentials: 'include',
        })
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
    }, [uuid]);

    function onLike() {}
    function onBlock() {}
    function onReport() {}

    if (isLoading === false && user === null) {
        return <Redirect to="/404" />;
    }

    return (
        <Container>
            {isLoading || user === null ? (
                <div>Loading …</div>
            ) : (
                <ProfileCard
                    {...user}
                    flat
                    onLike={onLike}
                    onBlock={onBlock}
                    onReport={onReport}
                />
            )}
        </Container>
    );
}
