import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyPassword() {
    const [
        currentPassword,
        setCurrentPassword,
        isCurrentPasswordValid,
        setCurrentPasswordIsValid,
    ] = useFormField('');
    const [
        newPassword,
        setNewPassword,
        isNewPasswordValid,
        setNewPasswordIsValid,
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
            label: 'Current Password',
            name: 'current-password',
            autocomplete: 'current-password',
            value: currentPassword,
            setValue: setCurrentPassword,
            isValid: isCurrentPasswordValid,
            setIsValid: setCurrentPasswordIsValid,
            type: 'password',
            min: 6,
        },
        {
            label: 'New Password',
            name: 'new-password',
            autocomplete: 'new-password',
            value: newPassword,
            setValue: setNewPassword,
            isValid: isNewPasswordValid,
            setIsValid: setNewPasswordIsValid,
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
