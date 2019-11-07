import React, { useState, useEffect } from 'react';

import { API_ENDPOINT } from '../constants';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import Combobox from './Combobox.jsx';

export default function UserProfileModifyTags({
    user,
    user: { tags = [] },
    context,
    setContext,
}) {
    const [propositions, setPropositions] = useState([]);

    useEffect(() => {
        fetch(`${API_ENDPOINT}/profile/tags`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(propositions => {
                setPropositions(propositions);
            })
            .catch(console.error);
    }, []);

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
                label="Your centers of interest"
                items={tags}
                setItems={setTags}
                propositions={propositions}
                onAddItem={addTag}
                onDeleteItem={removeTag}
            />
        </UserProfileModifyEditionGroup>
    );
}
