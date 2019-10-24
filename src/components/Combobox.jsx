import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

import OverflowList from './OverflowList.jsx';
import InfiniteScrollContainer from './InfiniteScrollContainer.jsx';

const Container = styled.div`
    ${tw`relative`}
`;

const Label = styled.label`
    ${tw`absolute top-0 inset-x-0`}

    transition: transform 200ms;
    transform-origin: top left;

    ${({ focus }) =>
        focus &&
        css`
            transform: translateY(-18px) scale(0.75);
        `}
`;

const Selections = styled.div`
    ${tw`flex items-center`}

    transition: transform 200ms;
    transform-origin: top left;
`;

const Input = styled.input`
    ${tw`flex-1 h-8 bg-transparent`}
`;

const Propositions = styled.div`
    ${tw`absolute bottom-0 inset-x-0 z-50 bg-white`}

    transition: transform 200ms;
    transform-origin: top left;
    transform: translateY(100%);

    ${({ show }) =>
        !show &&
        css`
            transform: scaleY(0);
        `}
`;

const PropositionsItemSelectedStyles = tw`bg-gray-400`;

const PropositionsItem = styled.div`
    ${tw`flex items-center px-4 h-10`}

    transition: background-color 200ms;

    ${({ selected }) => selected && PropositionsItemSelectedStyles}
`;

export default function Combobox({
    label = 'Combobox',
    items = [],
    propositions = [],
    itemValue = 'value',
    itemText = 'text',
}) {
    const [focus, setFocus] = useState(false);
    const [propositionSelected, setPropositionSelected] = useState(-1);
    const inputId = `combobox-${Math.random() * 1000}`;

    useEffect(() => {
        if (focus === false) {
            setPropositionSelected(-1);
        }
    }, [focus, setPropositionSelected]);

    function onKeyDown({ key }) {
        switch (key) {
            case 'ArrowUp':
                if (propositionSelected < 0) return;

                setPropositionSelected(propositionSelected - 1);
                break;
            case 'ArrowDown':
                if (propositionSelected >= propositions.length - 1) return;

                setPropositionSelected(propositionSelected + 1);
                break;
        }
    }

    return (
        <Container>
            <Label htmlFor={inputId} focus={focus || items.length > 0}>
                {label}
            </Label>

            <Selections>
                {items.map(({ [itemValue]: value, [itemText]: text }) => (
                    <div key={value}>{text}</div>
                ))}

                <Input
                    id={inputId}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onKeyDown={onKeyDown}
                />
            </Selections>

            <Propositions show={focus}>
                <OverflowList maxHeight={300}>
                    <InfiniteScrollContainer>
                        {propositions.map(({ uuid, /*value,*/ text }, i) => (
                            <PropositionsItem
                                key={uuid}
                                selected={propositionSelected === i}
                            >
                                {text}
                            </PropositionsItem>
                        ))}
                    </InfiniteScrollContainer>
                </OverflowList>
            </Propositions>
        </Container>
    );
}
