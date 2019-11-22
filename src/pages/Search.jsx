import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import ProfilesContainer from '../components/ProfilesContainer.jsx';

const Container = styled.div`
    ${tw`w-full h-full flex flex-col`}
`;

const Title = styled.h2`
    ${tw`text-xl px-2 pb-2 pt-4`}

    font-family: 'Saira', sans-serif;
`;

const NoDataContainer = styled.p`
    ${tw`px-2 my-auto text-center text-lg`}
`;

function NoData() {
    return <NoDataContainer>The are no profiles to show</NoDataContainer>;
}

export default function Search() {
    const [results] = useState([{ uuid: 'lol' }, { uuid: 'lo2l' }]);

    function onFiltersUpdate(args) {
        console.log(args);
    }

    return (
        <Container>
            <Title>Search celebrities</Title>

            {results.length > 0 ? (
                <ProfilesContainer
                    profiles={results}
                    preview={true}
                    onFiltersUpdate={onFiltersUpdate}
                />
            ) : (
                <NoData />
            )}
        </Container>
    );
}
