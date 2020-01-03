import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import { API_ENDPOINT } from '../constants';

export default function UserProfileModifyPassword() {
    const formId = 'modify-password';

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
            disableValidation: true,
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

    function onSubmit() {
        fetch(`${API_ENDPOINT}/profile/password`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword }),
        })
            .then(res => res.json())
            .then(console.log)
            .catch(() => {});
    }

    return (
        <UserProfileModifyEditionGroup title="Password" formId={formId}>
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
