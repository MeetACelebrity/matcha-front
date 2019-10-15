import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyPassword() {
    const [
        password,
        setPassword,
        isPasswordValid,
        setPasswordIsValid,
    ] = useFormField('');

    const fields = [
        {
            label: '',
            value: '',
            name: 'username',
            autocomplete: 'username',
            hidden: true,
        },
        {
            label: 'New Password',
            name: 'new-password',
            autocomplete: 'new-password',
            value: password,
            setValue: setPassword,
            isValid: isPasswordValid,
            setIsValid: setPasswordIsValid,
            type: 'password',
            min: 6,
        },
    ];

    const [isValid, Form] = useForm({ fields });

    return (
        <UserProfileModifyEditionGroup title="Password">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
