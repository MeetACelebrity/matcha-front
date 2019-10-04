import React from 'react';

// import { AppContext } from '../app-context.js';
import ProfileCard from '../components/ProfileCard.jsx';

import remy from '../assets/remy.png';
import girl from '../assets/girl.png';

export default function UserProfilePage() {
    // const { user } = useContext(AppContext);

    return (
        <ProfileCard
            uuid="123456789"
            username="Kekette"
            givenName="Baptiste"
            familyName="Devessier"
            profilePicture={{ src: remy }}
            pictures={[{ src: girl }]}
        />
    );
}
