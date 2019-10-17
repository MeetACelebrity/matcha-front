import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Profile from './Profile.jsx';

const Container = styled.section`
    display: grid;

    grid-auto-rows: min-content;
    grid-template-columns: repeat(4, 1fr);

    grid-column-gap: 10px;
    grid-row-gap: 10px;

    transform-origin: right;

    will-change: transform;
`;

function ProfilesContainer({ profiles = [] }, ref) {
    return (
        <Container ref={ref}>
            {profiles.map(profile => {
                const { id } = profile;

                return <Profile {...profile} key={id} />;
            })}
        </Container>
    );
}

export default forwardRef(ProfilesContainer);
