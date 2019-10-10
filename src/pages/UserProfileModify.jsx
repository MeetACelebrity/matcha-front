import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import FeatherIcon from 'feather-icons-react';

import useForm, { useFormField } from '../components/Form.jsx';

import remy from '../assets/remy.png';

const Container = styled.section`
    ${tw`w-full mx-auto mt-10`}

    @media (min-width: 768px) {
        ${tw`w-3/5`}
    }

    @media (min-width: 1024px) {
        ${tw`w-2/5`}
    }

    @media (min-width: 1280px) {
        ${tw`w-1/3`}
    }
`;

const Title = styled.h1`
    font-family: 'Saira', sans-serif;

    ${tw`text-3xl`}
`;

const Preferences = styled.section`
    ${tw`mt-8`}
`;

const ProfileContainer = styled.div`
    ${tw`relative w-64 h-64 mx-auto`}
`;

const Img = styled.img`
    ${tw`rounded-full object-cover h-full`}
`;

const Aside = styled.aside`
    ${tw`absolute bottom-0 inset-x-0 flex justify-end`}
`;

const ChangePictureButton = styled.button`
    ${tw`relative p-2 rounded-full bg-blue-800 text-white shadow`}

    bottom: 20px;
    right: 20px;

    &::after {
        content: '';
        transition: opacity 200ms;

        ${tw`absolute inset-0 shadow-xl opacity-0 rounded-full`}
    }

    &:hover,
    &:focus {
        ${tw`outline-none`}
    }

    &:hover::after,
    &:focus::after {
        ${tw`opacity-100`}
    }
`;

function ProfileImage({ src }) {
    return (
        <ProfileContainer>
            <Img src={src} alt="profile picture" />

            <Aside>
                <ChangePictureButton>
                    <FeatherIcon icon="edit-2" />
                </ChangePictureButton>
            </Aside>
        </ProfileContainer>
    );
}

const EditionGroupContainer = styled.article`
    ${tw`w-full mt-4`}
`;

const EditorGroupHeader = styled.header`
    ${tw`flex justify-between items-center mb-2`}

    > h2 {
        font-family: 'Saira', sans-serif;

        ${tw`text-xl`}
    }
`;

const EditorGroupSubmitButton = styled.button`
    ${tw`font-bold`}

    &:focus {
        ${tw`outline-none`}
    }
`;

function EditionGroup({ title, children }) {
    return (
        <EditionGroupContainer>
            <EditorGroupHeader>
                <h2>{title}</h2>

                <EditorGroupSubmitButton>Envoyer</EditorGroupSubmitButton>
            </EditorGroupHeader>

            <section>{children}</section>
        </EditionGroupContainer>
    );
}

export default function UserProfileModifyPage() {
    const [email, setEmail, isEmailValid, setEmailIsValid] = useFormField('');
    const [
        givenName,
        setGivenName,
        isGivenNameValid,
        setGivenNameIsValid,
    ] = useFormField('');
    const [
        familyName,
        setFamilyName,
        isFamilyNameValid,
        setFamilyNameIsValid,
    ] = useFormField('');

    const fields = [
        {
            label: 'Email',
            value: email,
            setValue: setEmail,
            isValid: isEmailValid,
            setIsValid: setEmailIsValid,
            email: true,
        },
        {
            label: 'Given name',
            value: givenName,
            setValue: setGivenName,
            isValid: isGivenNameValid,
            setIsValid: setGivenNameIsValid,
            min: 1,
        },
        {
            label: 'Family name',
            value: familyName,
            setValue: setFamilyName,
            isValid: isFamilyNameValid,
            setIsValid: setFamilyNameIsValid,
            min: 1,
        },
    ];

    const [isValid, Form] = useForm({
        fields,
    });

    return (
        <Container>
            <Title>Edit Profile</Title>

            <Preferences>
                <ProfileImage src={remy} />
            </Preferences>

            <EditionGroup title="General Preferences">
                <Form fields={fields} isValid={isValid} hideButton />
            </EditionGroup>
        </Container>
    );
}
