import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import { API_ENDPOINT } from '../constants';

export default function UserProfileModifyBiography({ user }) {
    const formId = 'modify-biography';

    const [
        biography,
        setBiography,
        isABiographyalid,
        setBiographyIsValid,
    ] = useFormField('');

    useEffect(() => {
        if (user.biography) setBiography(user.biography);
    }, [setBiography, user.biography]);

    const fields = [
        {
            label: 'Type your biography...',
            value: biography,
            setValue: setBiography,
            isValid: isABiographyalid,
            setIsValid: setBiographyIsValid,
            textarea: true,
        },
    ];

    const [isValid, Form] = useForm({ fields });

    function onSubmit() {
        fetch(`${API_ENDPOINT}/profile/biography`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ biography }),
        })
            .then(res => res.json())
            .then(console.log);
    }

    return (
        <UserProfileModifyEditionGroup title="Biography" formId={formId}>
            <Form
                id={formId}
                fields={fields}
                isValid={isValid}
                onSubmit={onSubmit}
                hideButton
            />
        </UserProfileModifyEditionGroup>
    );
}
