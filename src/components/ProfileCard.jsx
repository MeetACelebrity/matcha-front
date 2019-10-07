import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

// import { AppContext } from '../app-context.js';
import ImageCarousel from './ImageCarousel.jsx';
import ProfileCardTags from './ProfileCardTags.jsx';
import ProfileCardFloatingButton from './ProfileCardFloatingButton.jsx';

const Container = styled.article`
    ${tw`overflow-x-hidden h-full relative`}
`;

const Section = styled.section`
    ${tw`px-5 py-2`}
`;

const Gender = styled.aside`
    ${tw`text-blue-600`}
`;

const TextContainer = styled.div`
    ${tw`flex items-center flex-wrap text-2xl mx-1`}

    $ > :first-child {
        ${({ primary }) =>
            primary &&
            css`
                font-family: 'Saira', sans-serif;
            `}
    }

    & > :not(:first-child) {
        ${({ secondary }) => secondary && tw`text-gray-700`}
    }

    ${({ secondary }) => secondary && tw`text-xl`}

    & > :first-child::after {
        content: '•';

        ${tw`mx-2`}
    }
`;

export default function ProfileCard({
    // uuid,
    username,
    givenName,
    familyName,
    profilePicture,
    pictures,
}) {
    /*const {
        user: { uuid: currentUserUuid },
    } = useContext(AppContext);*/
    // const isCurrentUser = uuid === currentUserUuid;
    const isCurrentUser = true;

    const images = [profilePicture, ...pictures];

    return (
        <Container>
            <header>
                <ImageCarousel images={images} />
            </header>

            <Section>
                <TextContainer primary>
                    <h2>{username}</h2>

                    <Gender>H</Gender>
                </TextContainer>

                <TextContainer secondary>
                    <h3>
                        {givenName} {familyName}
                    </h3>

                    <h4>{'30 years old'}</h4>
                </TextContainer>

                <ProfileCardTags
                    tags={[
                        'chiens',
                        'chattes',
                        'vinyles',
                        'sexe',
                        'cristaline',
                        'philosophie',
                    ]}
                />
            </Section>

            <footer>
                <ProfileCardFloatingButton edit={isCurrentUser} />
            </footer>
        </Container>
    );
}
