import React, { useState, useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

import Profile from './Profile.jsx';
import FloatingButton from './FloatingButton.jsx';
import ResultsFilters from './ResultsFilters.jsx';

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
`;

function ProfilesContainer(
    { profiles = [], preview = false, onLike = () => {} },
    ref
) {
    const [showFiltersDialog, setShowFiltersDialog] = useState(true);

    function triggerModal(e) {
        e.stopPropagation();

        setShowFiltersDialog(true);
    }

    const onHide = useCallback(() => setShowFiltersDialog(false), []);

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

            <FloatingButton onClick={triggerModal}>
                <FeatherIcon icon="sliders" />
            </FloatingButton>

            <ResultsFilters show={showFiltersDialog} onHide={onHide} />
        </Container>
    );
}

export default forwardRef(ProfilesContainer);
