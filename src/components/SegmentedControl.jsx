import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const SegmentedContainer = styled.div`
    ${tw`my-2`}
`;

const ItemsContainer = styled.div`
    ${tw`w-full flex items-stretch`}
`;

const Label = styled.p`
    ${tw`mb-2`}

    font-family: 'Saira',sans-serif;
`;

const Item = styled.button`
    ${tw`border border-blue-700 text-blue-700 flex-1`}

    transition: all 200ms;

    &:first-child {
        ${tw`rounded-bl rounded-tl`}
    }

    &:last-child {
        ${tw`rounded-br rounded-tr`}
    }

    ${({ selected }) => selected === true && tw`bg-blue-700 text-white`}

    &:focus {
        ${tw`outline-none`}
    }
`;

export default function SegmentedControl({
    label = 'test',
    value,
    items = [],
    setValue,
}) {
    const index = items.findIndex(
        ({ value: itemValue }) => itemValue === value
    );

    const [selected, setSelected] = useState(index > -1 ? index : 0);

    useEffect(() => {
        const value = items[selected].value;

        setValue(value);
    }, [selected, items, setValue]);

    return (
        <SegmentedContainer>
            <Label>{label}</Label>

            <ItemsContainer>
                {items.map(({ value, text }, i) => (
                    <Item
                        key={value}
                        value={value}
                        selected={selected === i}
                        onClick={e => {
                            e.preventDefault();

                            setSelected(i);
                        }}
                    >
                        {text}
                    </Item>
                ))}
            </ItemsContainer>
        </SegmentedContainer>
    );
}
