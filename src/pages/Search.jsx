import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import ProfilesContainer from '../components/ProfilesContainer.jsx';
import { API_ENDPOINT, fetcher } from '../constants.js';

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
    const LIMIT = 10;

    const [offset] = useState(0);
    const [results, setResults] = useState([{ uuid: 'lol' }, { uuid: 'lo2l' }]);

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

        fetcher(
            `${API_ENDPOINT}/match/search/${searchText}/${LIMIT}/${offset}`,
            {
                credentials: 'include',
                method: 'POST',
                body: {
                    location,
                    tagsArray: commonTags,
                    orderBy: sortBy,
                    order: sortOrder,
                    minAge: ageRange[0],
                    maxAge: ageRange[1],
                    minDistance: distanceRange[0],
                    maxDistance: distanceRange[1],
                    minScore: popularityRange[0],
                    maxScore: popularityRange[1],
                    minCommonTags: countCommonTags[0],
                    maxCommonTags: countCommonTags[1],
                },
                json: true,
            }
        )
            .then(res => res.json())
            .then(({ results: { datas } }) => {
                setResults(datas);
            })
            .catch(console.error);
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
