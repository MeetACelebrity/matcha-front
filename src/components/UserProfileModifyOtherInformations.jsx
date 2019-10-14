import React from 'react';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyOtherInformations() {
    const [age, setAge, isAgeValid, setAgeIsValid] = useFormField('');
    const [gender, setGender, isGenderValid, setGenderIsValid] = useFormField(
        ''
    );
    const [
        sexualOrientation,
        setSexualOrientation,
        isSexualOrientationValid,
        setSexualOrientationIsValid,
    ] = useFormField('');

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
        },
        {
            label: 'Sexual orientation',
            value: sexualOrientation,
            setValue: setSexualOrientation,
            isValid: isSexualOrientationValid,
            setIsValid: setSexualOrientationIsValid,
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
