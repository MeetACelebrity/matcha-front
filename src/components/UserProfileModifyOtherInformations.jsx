import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

const intl = new Intl.DateTimeFormat('en-GB');

export default function UserProfileModifyOtherInformations({ user }) {
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
                { value: 'M', text: 'Male' },
                { value: 'F', text: 'Female' },
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

    return (
        <UserProfileModifyEditionGroup title="Other Informations">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
