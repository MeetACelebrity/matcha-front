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

    function onLike() {
        const isLikingTheProfile = ['VIRGIN', 'HAS_LIKED_US'].includes(
            user.likeStatus
        );
        const action = isLikingTheProfile ? 'like' : 'unlike';

        let newStatus = '';

        switch (user.likeStatus) {
            case 'VIRGIN':
                newStatus = 'LIKED_IT';
                break;
            case 'HAS_LIKED_US':
                newStatus = 'MATCH';
                break;
            case 'LIKED_IT':
                newStatus = 'VIRGIN';
                break;
            case 'MATCH':
                newStatus = 'HAS_LIKED_US';
                break;
        }

        setUser(user => ({
            ...user,
            likeStatus: newStatus,
        }));

        fetch(`${API_ENDPOINT}/user/${action}/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }

    function onBlock() {
        fetch(`${API_ENDPOINT}/user/block/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }

    function onReport() {
        fetch(`${API_ENDPOINT}/user/report/${uuid}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }

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
