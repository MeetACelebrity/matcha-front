import React, { useContext, useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { Link } from 'react-router-dom';
import FeathersIcon from 'feather-icons-react';

import { formatAddress } from '../constants.js';
import { AppContext } from '../app-context.js';
import ImageCarousel from './ImageCarousel.jsx';
import ProfileCardTags from './ProfileCardTags.jsx';
import ProfileCardFloatingButton from './ProfileCardFloatingButton.jsx';
import Sex from './Sex.jsx';
import Button from './Button.jsx';
import RelativeTime from './RelativeTime.jsx';

const previewContainerStyle = tw`pb-3 shadow-md`;
const notFlatContainerStyle = tw`shadow-xl`;

const Container = styled.article`
    ${tw`relative bg-white flex flex-col justify-between h-full`}

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

    ${({ small }) =>
        small && tw`text-base`}

    & > :first-child:not(svg)::after {
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

const LinksContainer = styled.div`
    ${tw`flex items-center justify-around flex-wrap py-4`}
`;

const OnLineStatusContainerOnlineStyle = tw`bg-green-600`;

const OnLineStatusContainer = styled.div`
    ${tw`flex items-center m-1 text-gray-600`}

    &::before {
        ${tw`w-2 h-2 rounded-full bg-red-600 mr-2`}

        content: '';

        ${({ isOnline }) =>
            isOnline === true && OnLineStatusContainerOnlineStyle}
    }
`;

function OnLineStatus({ isOnline, lastSeen }) {
    const text =
        isOnline === true
            ? 'Online'
            : lastSeen === null
            ? 'Offline'
            : 'Last seen:';

    return (
        <OnLineStatusContainer isOnline={isOnline}>
            {text}

            {!isOnline && lastSeen && (
                <RelativeTime datetime={+new Date(lastSeen)} className="ml-1" />
            )}
        </OnLineStatusContainer>
    );
}

function Biography({ biography }) {
    return (
        <BiographyContainer>
            <BiographyTitle>Biography :</BiographyTitle>

            <BiographyParagraph>
                {biography || 'Non remplie'}
            </BiographyParagraph>
        </BiographyContainer>
    );
}

function LikeButton({ onLike, profilePicturesCount, likeStatus }) {
    let text = '';

    switch (likeStatus) {
        case 'HAS_LIKED_US':
            text = 'Liked us';
            break;
        case 'LIKED_IT':
            text = 'Liked';
            break;
        case 'MATCH':
            text = 'Matched';
            break;
        default:
            text = 'Like';
            break;
    }

    return (
        <Button text onClick={onLike} disabled={profilePicturesCount === 0}>
            {text}
        </Button>
    );
}

export default function ProfileCard({
    uuid,
    username = 'Non connu',
    givenName = 'Non connu',
    familyName = 'Non connu',
    gender = 'LOL',
    age = 30,
    biography = '',
    profilePicture,
    images: profileImages = [],
    pictures = profileImages,
    tags = [],
    addresses = [],
    distance,
    likeStatus = 'VIRGIN',
    isOnline,
    lastSeen,
    score,
    onLike,
    onBlock,
    onReport,
    children,
    className,
    preview = false,
    flat = false,
}) {
    const [images, setImages] = useState([]);
    const {
        context: {
            user: {
                uuid: currentUserUuid,
                images: { length: profilePicturesCount },
            },
        },
    } = useContext(AppContext);

    const isCurrentUser = uuid === currentUserUuid;

    const address = useMemo(() => {
        if (distance !== undefined) {
            const intDistance = distance | 0;
            if (intDistance < 0.05) return 'Near to you';

            if (intDistance < 1) return `At ${intDistance * 10e3}m`;

            return `At ${intDistance}km`;
        }

        const currentAddress = addresses.find(({ type }) => type === 'CURRENT');
        const primaryAddress = addresses.find(({ type }) => type === 'PRIMARY');

        if (!(currentAddress || primaryAddress)) return 'Error';

        const { name, county, country, city } =
            currentAddress || primaryAddress;

        return formatAddress({ name, county, country, city });
    }, [addresses, distance]);

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

                    <h4>{age} years old</h4>
                </TextContainer>

                {typeof score === 'number' && (
                    <TextContainer secondary small>
                        <FeathersIcon
                            icon="zap"
                            title={`${username} score`}
                            className="mr-2 fill-current stroke-current text-blue-700"
                        />
                        <span className="text-gray-700">{score}</span>
                    </TextContainer>
                )}

                <Address>{address}</Address>

                {preview === false && !isCurrentUser && (
                    <OnLineStatus isOnline={isOnline} lastSeen={lastSeen} />
                )}
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
                {preview === false && !isCurrentUser && (
                    <ActionsButtonsContainer>
                        <LikeButton
                            onLike={onLike}
                            profilePicturesCount={profilePicturesCount}
                            likeStatus={likeStatus}
                        />
                        <Button text red onClick={onBlock}>
                            Block
                        </Button>
                        <Button text red onClick={onReport}>
                            Report
                        </Button>
                    </ActionsButtonsContainer>
                )}

                {preview === false && <Biography biography={biography} />}

                <ProfileCardTags tags={tags} mini={preview === true} />

                {isCurrentUser && preview === false && (
                    <LinksContainer>
                        <Button text to="/my-visitors">
                            My visitors
                        </Button>
                        <Button text to="/my-lovers">
                            My lovers
                        </Button>
                    </LinksContainer>
                )}
            </Section>

            {children}

            {flat === false && (
                <ProfileCardFloatingButton
                    edit={isCurrentUser}
                    floating={preview === false}
                    disabled={profilePicturesCount === 0}
                    likeStatus={likeStatus}
                    onLike={onLike}
                />
            )}
        </Container>
    );
}
