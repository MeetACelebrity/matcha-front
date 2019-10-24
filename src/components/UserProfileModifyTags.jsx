import React, { useState } from 'react';

import UserProfileModifyEditionGroup from './UserProfileModifyEditionGroup.jsx';
import Combobox from './Combobox.jsx';

export default function UserProfileModifyTags() {
    const [tags] = useState([{ uuid: 'fagafdg', value: 'Cats' }]);
    const [propositions] = useState([
        { uuid: 'adfgadfg', value: 'Cats', text: 'Cats' },
        { uuid: 'adfadfgadfg', value: 'Dogs', text: 'Dogs' },
        { uuid: 'adfgawr23dfg', value: 'Sex', text: 'Sex' },
    ]);

    return (
        <UserProfileModifyEditionGroup title="Centers of interest" noButton>
            <Combobox
                items={tags}
                itemText="value"
                propositions={propositions}
            />
        </UserProfileModifyEditionGroup>
    );
}
