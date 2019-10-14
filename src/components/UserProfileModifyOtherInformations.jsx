import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyOtherInformations() {
    const [age, setAge, isAgeValid, setAgeIsValid] = useFormField('');
    const [gender, setGender, isGenderValid, setGenderIsValid] = useFormField(
        'M'
    );
    const [
        sexualOrientation,
        setSexualOrientation,
        isSexualOrientationValid,
        setSexualOrientationIsValid,
    ] = useFormField('BI');

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
                { value: 'HETE', text: 'Heterosexual' },
                { value: 'HOMO', text: 'Homosexual' },
                { value: 'BI', text: 'Bisexual' },
            ],
        },
    ];

    const [isValid, Form] = useForm({
        fields,
    });

    return (
        <UserProfileModifyEditionGroup title="Other Informations">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
