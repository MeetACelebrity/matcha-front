import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import { API_ENDPOINT, fetcher } from '../constants';

export default function UserProfileModifyBiography({ user }) {
    const formId = 'modify-biography';

    const [
        biography,
        setBiography,
        isABiographyValid,
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
            isValid: isABiographyValid,
            setIsValid: setBiographyIsValid,
            textarea: true,
        },
    ];

    const [isValid, Form] = useForm({ fields });

    function onSubmit() {
        fetcher(`${API_ENDPOINT}/profile/biography`, {
            method: 'PUT',
            credentials: 'include',
            body: { biography },
            json: true,
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
