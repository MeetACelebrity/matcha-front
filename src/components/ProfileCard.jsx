import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

import { AppContext } from '../app-context.js';
import ImageCarousel from './ImageCarousel.jsx';
import ProfileCardTags from './ProfileCardTags.jsx';
import ProfileCardFloatingButton from './ProfileCardFloatingButton.jsx';

const Container = styled.article`
    ${tw`relative shadow-xl`}

    /**
     * This creates a new layer thanks to which the floating button (position: fixed)
     * will be positioned according to this new layer.
    */
    transform: translate(0);
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

const Address = styled.p`
    ${tw`text-gray-600 mx-1`}
`;

export default function ProfileCard({
    uuid,
    username,
    givenName,
    familyName,
    profilePicture,
    pictures,
    children,
    className,
}) {
    const {
        user: { uuid: currentUserUuid },
    } = useContext(AppContext);
    const isCurrentUser = uuid === currentUserUuid;

    const images = pictures;

    if (profilePicture !== undefined) images.unshift(profilePicture);

    return (
        <Container className={className}>
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

                <Address>
                    {
                        '10 Rue de Penthievre, Paris 8e Arrondissement, Île-de-France, France'
                    }
                </Address>

                <ProfileCardTags
                    tags={['chiens', 'cristaline', 'philosophie']}
                />
            </Section>

            {children}

            <ProfileCardFloatingButton edit={isCurrentUser} />
        </Container>
    );
}
