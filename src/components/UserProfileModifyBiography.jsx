import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyBiography() {
    const [
        biography,
        setBiography,
        isABiographyalid,
        setBiographyIsValid,
    ] = useFormField('');

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

    return (
        <UserProfileModifyEditionGroup title="Biography">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
