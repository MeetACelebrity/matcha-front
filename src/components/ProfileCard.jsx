import React, { useContext, useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { Link } from 'react-router-dom';

import { AppContext } from '../app-context.js';
import ImageCarousel from './ImageCarousel.jsx';
import ProfileCardTags from './ProfileCardTags.jsx';
import ProfileCardFloatingButton from './ProfileCardFloatingButton.jsx';
import Sex from './Sex.jsx';
import Button from './Button.jsx';

const previewContainerStyle = tw`pb-3 shadow-md`;
const notFlatContainerStyle = tw`shadow-xl`;

const Container = styled.article`
    ${tw`relative bg-white`}

    ${({ preview }) => preview && previewContainerStyle}

    ${({ flat }) => !flat && notFlatContainerStyle}

    /**
     * This creates a new layer thanks to which the floating button (position: fixed)
     * will be positioned according to this element.
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

    & > :first-child {
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

const BiographyContainer = styled.article`
    ${tw`mb-3 mx-1`}
`;

const BiographyTitle = styled.p`
    ${tw`mb-2`}
`;

const BiographyParagraph = styled.p`
    ${tw`pl-3 border-l-4 border-gray-800 text-gray-700`}
`;

const ActionsButtonsContainer = styled.div`
    ${tw`flex items-center pt-2 pb-6`}

    & > :not(:last-child) {
        ${tw`mr-2`}
    }
`;

function Biography({ biography }) {
    return (
        <BiographyContainer>
            <BiographyTitle>Biography :</BiographyTitle>

            <BiographyParagraph>{biography}</BiographyParagraph>
        </BiographyContainer>
    );
}

export default function ProfileCard({
    uuid,
    username = 'Non connu',
    givenName = 'Non connu',
    familyName = 'Non connu',
    gender = 'LOL',
    biography = '',
    profilePicture,
    pictures,
    tags = [],
    addresses = [],
    liked = false,
    onLike,
    children,
    className,
    preview = false,
    flat = false,
}) {
    const [images, setImages] = useState([]);
    const {
        context: {
            user: { uuid: currentUserUuid },
        },
    } = useContext(AppContext);

    const address = useMemo(() => {
        const currentAddress = addresses.find(({ type }) => type === 'CURRENT');
        const primaryAddress = addresses.find(({ type }) => type === 'PRIMARY');

        if (!(currentAddress || primaryAddress)) return 'Error'

        const { name, county, country } = currentAddress || primaryAddress;

        return `${name}, ${county} ${country}`;
    }, [addresses]);

    const isCurrentUser = uuid === currentUserUuid;

    useEffect(() => {
        if (profilePicture === undefined) {
            setImages(pictures);
        } else {
            setImages([profilePicture, ...pictures]);
        }
    }, [pictures, profilePicture]);

    const LinkContent = (
        <>
            <header>
                <ImageCarousel images={images} />
            </header>

            <Section>
                <TextContainer primary>
                    <h2>{username}</h2>

                    <Gender>
                        <Sex sex={gender} />
                    </Gender>
                </TextContainer>

                <TextContainer secondary>
                    <h3>
                        {givenName} {familyName}
                    </h3>

                    <h4>{'30 years old'}</h4>
                </TextContainer>

                <Address>{address}</Address>
            </Section>
        </>
    );

    return (
        <Container className={className} preview={preview === true} flat={flat}>
            {preview === true ? (
                <Link to={`/profile/${uuid}`}>{LinkContent}</Link>
            ) : (
                LinkContent
            )}

            <Section>
                {preview === false && (
                    <>
                        <ActionsButtonsContainer>
                            <Button text>Like</Button>
                            <Button text red>
                                Block
                            </Button>
                            <Button text red>
                                Report
                            </Button>
                        </ActionsButtonsContainer>
                        <Biography biography={biography} />
                    </>
                )}

                <ProfileCardTags tags={tags} mini={preview === true} />
            </Section>

            {children}

            {flat === false && (
                <ProfileCardFloatingButton
                    edit={isCurrentUser}
                    floating={preview === false}
                    liked={liked}
                    onLike={onLike}
                />
            )}
        </Container>
    );
}
