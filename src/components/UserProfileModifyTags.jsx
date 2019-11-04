import React from 'react';

import { API_ENDPOINT } from '../constants';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import Combobox from './Combobox.jsx';

export default function UserProfileModifyTags({
    user,
    user: { tags = [] },
    context,
    setContext,
}) {
    const propositions = [
        { uuid: 'adfgqertawr23dfg', value: 'TypeScript', text: 'TypeScript' },
        { uuid: 'adfgqertadfg', value: 'CSS', text: 'CSS' },
        { uuid: 'adfafgdfgadfg', value: 'France', text: 'France' },
        { uuid: 'adfgqetadfg', value: 'Humour', text: 'Humour' },
        { uuid: 'adfadxvcbfga245dfg', value: 'Business', text: 'Business' },
        {
            uuid: '54654',
            value: 'Marketing Mania',
            text: 'Marketing Mania',
        },
        { uuid: '0d4957aa-3612-4f41-8d78-a0e124de67fb', text: 'Golang' },
        { uuid: 'bd0c5330-a174-47ba-ba30-ad440098914e', text: 'Sex' },
        { uuid: '6e5f748d-dd84-4c02-b28d-bc1b9fad96c9', text: 'Coca-cola' },
        { uuid: 'ef5dc4a0-8834-4450-b583-617aa97da04e', text: 'JavaScript' },
    ];

    function addTag(tag) {
        console.log('add tag lol ?', tag);
        fetch(`${API_ENDPOINT}/profile/tags/add`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({
                tag,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(console.log)
            .catch(console.error);
    }

    function removeTag(tag) {
        console.log('remove tag', tag);
        fetch(`${API_ENDPOINT}/profile/tags/delete`, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({
                tag,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(console.log)
            .catch(console.error);
    }

    function setTags(tags) {
        setContext({
            ...context,
            user: {
                ...user,
                tags,
            },
        });
    }

    return (
        <UserProfileModifyEditionGroup title="Centers of interest" noButton>
            <Combobox
                items={tags}
                setItems={setTags}
                propositions={propositions}
                onAddItem={addTag}
                onDeleteItem={removeTag}
            />
        </UserProfileModifyEditionGroup>
    );
}
