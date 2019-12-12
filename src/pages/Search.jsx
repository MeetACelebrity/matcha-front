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

export default function Search() {
    const LIMIT = 10;

    const [offset] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function onFiltersUpdate({
        searchText,
        location,
        sortBy,
        sortOrder,
        ageRange,
        distanceRange,
        popularityRange,
        countCommonTags,
        commonTags,
    }) {
        setLoading(true);

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
            .then(({ result: { datas } }) => {
                setResults(datas);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }

    return (
        <Container>
            <Title>Search celebrities</Title>

            <ProfilesContainer
                search
                profiles={results}
                preview={true}
                onFiltersUpdate={onFiltersUpdate}
                loading={loading}
            />
        </Container>
    );
}
