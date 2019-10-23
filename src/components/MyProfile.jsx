import React, { useContext } from 'react';

import { AppContext } from '../app-context.js';
import ProfileCard from './ProfileCard.jsx';

export default function MyProfile(props) {
    const {
        context: {
            user: {
                uuid,
                username,
                givenName,
                familyName,
                profilePicture,
                images,
            },
        },
    } = useContext(AppContext);

    return (
        <ProfileCard
            uuid={uuid}
            username={username}
            givenName={givenName}
            familyName={familyName}
            profilePicture={profilePicture}
            pictures={images}
            {...props}
        />
    );
}
