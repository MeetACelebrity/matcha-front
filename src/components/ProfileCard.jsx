import React from 'react';
// import { useContext } from 'react';

// import { AppContext } from '../app-context.js';
import ImageCarousel from './ImageCarousel.jsx';

export default function ProfileCard({
    // uuid,
    // username,
    // givenName,
    // familyName,
    profilePicture,
    pictures,
}) {
    // const {
    //     user: { uuid: currentUserUuid },
    // } = useContext(AppContext);
    // const isCurrentUser = uuid === currentUserUuid;

    const images = [profilePicture, ...pictures];

    return (
        <article>
            <header>
                <ImageCarousel images={images} />
            </header>
        </article>
    );
}
