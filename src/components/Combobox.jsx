import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

import OverflowList from './OverflowList.jsx';
import InfiniteScrollContainer from './InfiniteScrollContainer.jsx';

const FocusedContainerStyle = tw`border-blue-700`;

const Container = styled.div`
    ${tw`relative border-b-2 border-transparent py-1 mt-4`}

    ${({ focus }) => focus && FocusedContainerStyle}
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
    ${tw`flex items-center flex-wrap`}

    transition: transform 200ms;
    transform-origin: top left;
`;

const SelectionItem = styled.button`
    ${tw`bg-gray-400 px-3 py-1 my-1 mx-1 rounded-full relative shadow`}

    &::before {
        ${tw`mr-2`}

        content: '#';
    }

    &::after {
        content: '';

        ${tw`absolute inset-0 shadow-md opacity-0 rounded-full`}

        transition: opacity 200ms ease-out;
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

const Input = styled.input`
    ${tw`flex-1 h-8 bg-transparent`}

    &:focus,
    &:hover {
        ${tw`outline-none`}
    }
`;

const Propositions = styled.div`
    ${tw`absolute bottom-0 inset-x-0 z-50 bg-white shadow-lg`}

    transition: transform 200ms;
    transform-origin: top left;
    transform: translateY(calc(100% + 2px));

    ${({ show }) =>
        !show &&
        css`
            transform: scaleY(0);
        `}
`;

const PropositionsItemSelectedStyles = tw`bg-gray-400`;

const PropositionsItem = styled.button`
    ${tw`flex items-center px-4 h-10 w-full`}

    transition: background-color 200ms;

    ${({ selected }) => selected && PropositionsItemSelectedStyles}

    &:hover {
        ${PropositionsItemSelectedStyles}
    }

    &:focus,
    &:hover {
        ${tw`outline-none`}
    }
`;

const NoData = styled.p`
    ${tw`w-full text-center px-2 py-1`}
`;

const uglyId = (Math.random() * 1000) | 0;

export default function Combobox({
    label = 'Combobox',
    items = [],
    setItems = () => {},
    onAddItem = () => {},
    onDeleteItem = () => {},
    propositions = [],
}) {
    const inputId = `combobox-${uglyId}`;

    const [focus, setFocus] = useState(false);
    const [propositionSelected, setPropositionSelected] = useState(-1);
    const [newItem, setNewItem] = useState('');
    const inputRef = useRef(null);

    const open = useMemo(() => {
        return focus || items.length > 0 || newItem.length > 0;
    }, [focus, items.length, newItem.length]);
    const queryMatchingPropositions = useMemo(
        () =>
            propositions
                .filter(
                    ({ uuid }) =>
                        !items.some(({ uuid: itemUuid }) => itemUuid === uuid)
                )
                .filter(
                    ({ text }) =>
                        newItem === '' ||
                        text.toLowerCase().startsWith(newItem.toLowerCase())
                ),
        [propositions, items, newItem]
    );

    useEffect(() => {
        if (focus === false) {
            setPropositionSelected(-1);
        }
    }, [focus, setPropositionSelected]);

    useEffect(() => {
        const propositionsCount = queryMatchingPropositions.length;

        if (propositionSelected > propositionsCount - 1) {
            setPropositionSelected(propositionsCount - 1);
        }
    }, [
        queryMatchingPropositions,
        propositionSelected,
        setPropositionSelected,
    ]);

    function deleteItemByUuid(uuid, value) {
        setItems(items.filter(({ uuid: itemUuid }) => itemUuid !== uuid));

        onDeleteItem(value);
    }

    function onKeyDown({ key }) {
        switch (key) {
            case 'ArrowUp': {
                if (propositionSelected < 0) return;

                setPropositionSelected(propositionSelected - 1);
                break;
            }
            case 'ArrowDown': {
                if (propositionSelected >= queryMatchingPropositions.length - 1)
                    return;

                setPropositionSelected(propositionSelected + 1);
                break;
            }
            case 'Backspace':
            case 'Delete': {
                if (newItem === '') {
                    const lastItem = items[items.length - 1];

                    deleteItemByUuid(lastItem.uuid, lastItem.text);
                }

                break;
            }
            case 'Enter': {
                if (newItem === '') {
                    onPropositionSelect(propositionSelected);
                } else {
                    const item =
                        queryMatchingPropositions.length > 0
                            ? queryMatchingPropositions[propositionSelected]
                            : {
                                  uuid: (Math.random() * 1000) | 0,
                                  text: newItem,
                              };

                    setItems([...items, item]);

                    setNewItem('');

                    onAddItem(item.text);
                }

                break;
            }
            case 'Escape': {
                setFocus(false);

                if (inputRef && inputRef.current !== null) {
                    inputRef.current.blur();
                }

                break;
            }
            default:
                break;
        }
    }

    function onPropositionSelect(id) {
        console.log('click click click');

        const element = queryMatchingPropositions[id];

        if (element !== undefined) {
            setItems([...items, element]);

            onAddItem(element.text);
        }
    }

    function onTagKeyPress(uuid, text) {
        return ({ key }) => {
            switch (key) {
                case 'Backspace':
                case 'Delete': {
                    deleteItemByUuid(uuid, text);
                    break;
                }
                default:
                    break;
            }
        };
    }

    return (
        <Container focus={open}>
            <Label htmlFor={inputId} focus={open}>
                {label}
            </Label>

            <Selections>
                {items.map(({ uuid, text }) => (
                    <SelectionItem
                        key={uuid}
                        onKeyDown={onTagKeyPress(uuid, text)}
                    >
                        {text}
                    </SelectionItem>
                ))}

                <Input
                    id={inputId}
                    ref={inputRef}
                    onFocus={() => setFocus(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setFocus(false);
                        }, 50)
                    }
                    onKeyDown={onKeyDown}
                    value={newItem}
                    onChange={({ target: { value } }) => setNewItem(value)}
                />
            </Selections>

            <Propositions show={focus}>
                <OverflowList maxHeight={150}>
                    <InfiniteScrollContainer>
                        {queryMatchingPropositions.map(({ uuid, text }, i) => (
                            <PropositionsItem
                                key={uuid}
                                selected={propositionSelected === i}
                                onClick={() => onPropositionSelect(i)}
                            >
                                {text}
                            </PropositionsItem>
                        ))}

                        {queryMatchingPropositions.length === 0 && (
                            <NoData>
                                No results matching. Press enter to create a new
                                one.
                            </NoData>
                        )}
                    </InfiniteScrollContainer>
                </OverflowList>
            </Propositions>
        </Container>
    );
}
