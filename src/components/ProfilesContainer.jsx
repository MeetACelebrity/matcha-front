import React, { forwardRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Profile from './Profile.jsx';

const Container = styled.section`
    ${tw`p-5 overflow-y-auto`}

    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    }

    @media (min-width: 1280px) {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    grid-column-gap: 10px;
    grid-row-gap: 10px;

    transform-origin: right;

    will-change: transform;
`;

function ProfilesContainer(
    { profiles = [], preview = false, onLike = () => {} },
    ref
) {
    return (
        <Container ref={ref}>
            {profiles.map(profile => {
                const { uuid } = profile;

                return (
                    <Profile
                        {...profile}
                        key={uuid}
                        preview={preview}
                        onLike={onLike}
                    />
                );
            })}
        </Container>
    );
}

export default forwardRef(ProfilesContainer);
