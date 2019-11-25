import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import RelativeTime from '../components/RelativeTime.jsx';

const Container = styled.article`
    ${tw`mx-auto px-5 w-full mt-6`}

    @media (min-width: 768px) {
        ${tw`w-3/5`}
    }
`;

const Title = styled.h2`
    font-family: 'Saira', sans-serif;

    ${tw`text-3xl mb-4`}
`;

const Notification = styled.div`
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

const NotificationTitle = styled.h3``;

const NotificationDescription = styled.p``;

const NotificationDate = styled(RelativeTime)`
    ${tw`text-red`}
`;

const d = +new Date();

export default function Notifications() {
    const [notifications] = useState([
        {
            uuid: 'qrdgjqdfhgjdqfg',
            title: 'LOOOL',
            description: 'Description de la notification',
            createdAt: d,
        },
    ]);

    return (
        <Container>
            <Title>Notifications</Title>

            {notifications.map(({ uuid, title, description, createdAt }) => (
                <Notification key={uuid}>
                    <NotificationTitle>{title}</NotificationTitle>

                    <NotificationDescription>
                        {description}
                    </NotificationDescription>

                    <NotificationDate datetime={createdAt} />
                </Notification>
            ))}
        </Container>
    );
}
