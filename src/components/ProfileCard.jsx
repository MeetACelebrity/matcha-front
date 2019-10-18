import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { Link } from 'react-router-dom';

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
    username = 'Non connu',
    givenName = 'Non connu',
    familyName = 'Non connu',
    gender = 'Non connu',
    profilePicture,
    pictures,
    children,
    className,
    preview = false,
}) {
    const [images, setImages] = useState([]);
    const {
        context: {
            user: { uuid: currentUserUuid },
        },
    } = useContext(AppContext);

    const isCurrentUser = uuid === currentUserUuid;

    console.log('current user id =', currentUserUuid, 'uuid =', uuid);

    useEffect(() => {
        if (profilePicture === undefined) {
            setImages(pictures);
        } else {
            setImages([profilePicture, ...pictures]);
        }
    }, [pictures, profilePicture]);

    const Header = (
        <TextContainer primary>
            <h2>{username}</h2>

            <Gender>{gender}</Gender>
        </TextContainer>
    );

    return (
        <Container className={className}>
            <header>
                <ImageCarousel images={images} />
            </header>

            <Section>
                {preview === true ? (
                    <Link to={`/profile/${uuid}`}>{Header}</Link>
                ) : (
                    Header
                )}

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
