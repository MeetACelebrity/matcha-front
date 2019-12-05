import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import ProfilesContainer from '../components/ProfilesContainer.jsx';
// import { API_ENDPOINT, fetcher } from '../constants.js';

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
    // const LIMIT = 10;

    // const [offset, setOffset] = useState(0);
    const [results] = useState([{ uuid: 'lol' }, { uuid: 'lo2l' }]);

    function onFiltersUpdate({
        searchText,
        location,
        coordinates,
        sortBy,
        sortOrder,
        ageRange,
        distanceRange,
        popularityRange,
        countCommonTags,
        commonTags,
    }) {
        console.log(
            'fetch',
            searchText,
            location,
            coordinates,
            sortBy,
            sortOrder,
            ageRange,
            distanceRange,
            popularityRange,
            countCommonTags,
            commonTags
        );
        // fetcher(`${API_ENDPOINT}/match/search/${searchText}/${LIMIT}/${offset}`, {
        //     credentials: 'include',
        //     method: 'POST'
        // })
        //     .then()
    }

    return (
        <Container>
            <Title>Search celebrities</Title>

            {results.length > 0 ? (
                <ProfilesContainer
                    search
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
