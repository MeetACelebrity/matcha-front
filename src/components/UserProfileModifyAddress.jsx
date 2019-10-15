import React, { useRef, useEffect, useState } from 'react';
import places from 'places.js';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyAddress() {
    const [
        address,
        setAddress,
        isAAddressalid,
        setAddressIsValid,
    ] = useFormField('');

    const addressTextFieldRef = useRef(null);
    const [placesAutocomplete, setPlacesAutocomplete] = useState(null);

    const addressTextFieldId = 'address-text-field';

    const fields = [
        {
            id: addressTextFieldId,
            label: 'Address',
            value: address,
            setValue: setAddress,
            isValid: isAAddressalid,
            setIsValid: setAddressIsValid,
        },
    ];

    const [isValid, Form] = useForm({ fields });

    useEffect(() => {
        addressTextFieldRef.current = document.getElementById(
            addressTextFieldId
        );

        if (placesAutocomplete === null) {
            setPlacesAutocomplete(
                places({
                    appId: '#',
                    apiKey: '#',
                    container: addressTextFieldRef.current,
                    style: false,
                }).configure({
                    language: 'fr',
                })
            );
        }
    }, [placesAutocomplete]);

    return (
        <UserProfileModifyEditionGroup title="Address">
            <Form fields={fields} isValid={isValid} hideButton />
        </UserProfileModifyEditionGroup>
    );
}
