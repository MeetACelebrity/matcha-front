import React, { useRef, useEffect, useState } from 'react';
import places from 'places.js';

import useForm, { useFormField } from '../components/Form.jsx';
import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';

export default function UserProfileModifyAddress() {
    const [latlng, setLatlng] = useState({ lat: -1, lng: -1 });
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
            const placesAutocomplete = places({
                appId: '#',
                apiKey: '#',
                container: addressTextFieldRef.current,
                style: false,
            }).configure({
                language: 'fr',
                type: 'address',
                useDeviceLocation: true,
            });

            placesAutocomplete.on(
                'change',
                ({ suggestion: { value, latlng } }) => {
                    setAddress(value);
                    setLatlng(latlng);
                }
            );

            setPlacesAutocomplete(placesAutocomplete);
        }
    }, [placesAutocomplete, setAddress]);

    function onSubmit() {
        console.log(
            `send to the API (${latlng.lat}, ${latlng.lng}) = ${address}`
        );
    }

    return (
        <UserProfileModifyEditionGroup title="Address">
            <Form
                fields={fields}
                isValid={isValid}
                hideButton
                onSubmit={onSubmit}
            />
        </UserProfileModifyEditionGroup>
    );
}
