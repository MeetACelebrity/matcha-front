import React, { useContext, useMemo } from 'react';

import { AppContext } from '../app-context.js';
import ProfileCard from './ProfileCard.jsx';

export default function MyProfile(props) {
    const {
        context: {
            user: { images, birthday, ...informations },
        },
    } = useContext(AppContext);

    const age = useMemo(() => {
        function calculateAge(birthday) {
            const ageDifMs = Date.now() - birthday;
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return calculateAge(new Date(birthday));
    }, [birthday]);

    return (
        <ProfileCard pictures={images} {...informations} {...props} age={age} />
    );
}
