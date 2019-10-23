import React, { useContext } from 'react';

import { AppContext } from '../app-context.js';
import ProfileCard from './ProfileCard.jsx';

export default function MyProfile(props) {
    const {
        context: {
            user: { images, ...informations },
        },
    } = useContext(AppContext);

    return <ProfileCard pictures={images} {...informations} {...props} />;
}
