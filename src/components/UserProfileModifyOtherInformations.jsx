import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import { API_ENDPOINT } from '../constants';

const intl = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
});

export default function UserProfileModifyOtherInformations({ user }) {
    const formId = 'modify-other-informations';

    const [
        birthday,
        setBirthday,
        isBirthdayValid,
        setBirthdayIsValid,
    ] = useFormField('');
    const [gender, setGender, isGenderValid, setGenderIsValid] = useFormField(
        'M'
    );
    const [
        sexualOrientation,
        setSexualOrientation,
        isSexualOrientationValid,
        setSexualOrientationIsValid,
    ] = useFormField('BISEXUAL');

    useEffect(() => {
        if (user.gender !== null) setGender(user.gender);
        if (user.sexualOrientation !== null)
            setSexualOrientation(user.sexualOrientation);
        if (user.birthday !== null) {
            setBirthday(intl.format(new Date(user.birthday)));
        }
    }, [
        setGender,
        user.gender,
        setSexualOrientation,
        user.sexualOrientation,
        setBirthday,
        user.birthday,
    ]);

    const fields = [
        {
            label: 'Birthday',
            value: birthday,
            setValue: setBirthday,
            isValid: isBirthdayValid,
            setIsValid: setBirthdayIsValid,
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
        },
        {
            label: 'Gender',
            value: gender,
            setValue: setGender,
            isValid: isGenderValid,
            setIsValid: setGenderIsValid,
            segmented: true,
            items: [
                { value: 'MALE', text: 'Male' },
                { value: 'FEMALE', text: 'Female' },
            ],
        },
        {
            label: 'Sexual Orientation',
            value: sexualOrientation,
            setValue: setSexualOrientation,
            isValid: isSexualOrientationValid,
            setIsValid: setSexualOrientationIsValid,
            segmented: true,
            items: [
                { value: 'HETEROSEXUAL', text: 'Heterosexual' },
                { value: 'HOMOSEXUAL', text: 'Homosexual' },
                { value: 'BISEXUAL', text: 'Bisexual' },
            ],
        },
    ];

    const [isValid, Form] = useForm({ fields });

    function onSubmit() {
        const date = new Date(birthday);
        fetch(`${API_ENDPOINT}/profile/extended`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                birthday: +new Date(
                    Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                    )
                ),
                gender,
                sexualOrientation,
            }),
        })
            .then(res => res.json())
            .then(console.log);
    }

    return (
        <UserProfileModifyEditionGroup
            title="Other Informations"
            formId={formId}
        >
            <Form
                id={formId}
                fields={fields}
                isValid={isValid}
                hideButton
                onSubmit={onSubmit}
            />
        </UserProfileModifyEditionGroup>
    );
}
