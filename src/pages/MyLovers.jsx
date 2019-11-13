import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { NavLink } from 'react-router-dom';

import { API_ENDPOINT } from '../constants.js';

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

export default function MyLovers() {
    const [lovers] = useState([
        {
            uuid: 'lolol',
            username: 'Coucou',
            picture:
                'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.15752-9/57226391_573895936440034_2465969397282373632_n.jpg?_nc_cat=108&_nc_oc=AQktBDi3yXSNZqUTIBrEZIScRr0eVRfwWp_cnFDUxSK43pbLolhOxpiO9obW0S2RZlPEkKkhOvmSPOYcrhpJfPvM&_nc_ht=scontent-cdt1-1.xx&oh=7100563be889ddc11d3fed8c97df0b07&oe=5E556EC9',
        },
        {
            uuid: 'leghfhg',
            username: 'POLOLO',
            picture:
                'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.15752-9/57226391_573895936440034_2465969397282373632_n.jpg?_nc_cat=108&_nc_oc=AQktBDi3yXSNZqUTIBrEZIScRr0eVRfwWp_cnFDUxSK43pbLolhOxpiO9obW0S2RZlPEkKkhOvmSPOYcrhpJfPvM&_nc_ht=scontent-cdt1-1.xx&oh=7100563be889ddc11d3fed8c97df0b07&oe=5E556EC9',
        },
    ]);
    const [isLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_ENDPOINT}/user/likes/history`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }, []);

    return (
        <Container>
            <Title>My Lovers !</Title>

            {isLoading ? (
                <div>Loading …</div>
            ) : (
                lovers.map(({ uuid, username, picture }) => (
                    <Item as={NavLink} to={`/profile/${uuid}`} key={uuid}>
                        <Picture
                            src={picture}
                            alt={`${username}'s profile picture`}
                        />

                        <Username>{username}</Username>
                    </Item>
                ))
            )}
        </Container>
    );
}
