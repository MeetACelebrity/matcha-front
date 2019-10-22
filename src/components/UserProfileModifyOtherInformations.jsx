import React, { useEffect } from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyOtherInformations({ user }) {
    const [age, setAge, isAgeValid, setAgeIsValid] = useFormField('');
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
        if (user.age !== null)
            setAge(new Intl.DateTimeFormat('en-GB').format(user.age));
    }, [
        setGender,
        user.gender,
        setSexualOrientation,
        user.sexualOrientation,
        setAge,
        user.age,
    ]);

    const fields = [
        {
            label: 'Birthday',
            value: age,
            setValue: setAge,
            isValid: isAgeValid,
            setIsValid: setAgeIsValid,
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
