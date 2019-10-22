import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyGeneral({ user }) {
    const [email, setEmail, isEmailValid, setEmailIsValid] = useFormField('');
    const [
        givenName,
        setGivenName,
        isGivenNameValid,
        setGivenNameIsValid,
    ] = useFormField('');
    const [
        familyName,
        setFamilyName,
        isFamilyNameValid,
        setFamilyNameIsValid,
    ] = useFormField('');

    useEffect(() => {
        setEmail(user.email);
        setGivenName(user.givenName);
        setFamilyName(user.familyName);
    }, [
        setEmail,
        user.email,
        setGivenName,
        user.givenName,
        setFamilyName,
        user.familyName,
    ]);

    const fields = [
        {
            label: 'Email',
            value: email,
            setValue: setEmail,
            isValid: isEmailValid,
            setIsValid: setEmailIsValid,
            email: true,
        },
        {
            label: 'Given name',
            value: givenName,
            setValue: setGivenName,
            isValid: isGivenNameValid,
            setIsValid: setGivenNameIsValid,
            min: 1,
        },
        {
            label: 'Family name',
            value: familyName,
            setValue: setFamilyName,
            isValid: isFamilyNameValid,
            setIsValid: setFamilyNameIsValid,
            min: 1,
        },
    ];

    const [isValid, Form] = useForm({
        fields,
    });

    return (
        <UserProfileModifyEditionGroup title="General Preferences">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
