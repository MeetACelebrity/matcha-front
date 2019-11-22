import React, { useState, useEffect, useRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import Media from 'react-media';

import useForm from './Form.jsx';
import Combobox from './Combobox.jsx';

const FiltersTitle = styled.h2`
    ${tw`text-xl`}

    font-family: 'Saira', sans-serif;
`;

const Subheader = styled.p`
    ${tw`mb-1`}

    font-family: 'Saira', sans-serif;
`;

const ButtonsContainer = styled.div`
    ${tw`flex items-center justify-end mt-2`}

    & > :not(:last-child) {
        ${tw`mr-2`}
    }
`;

const Button = styled.button`
    ${tw`px-3 py-1 bg-blue-700 text-white rounded shadow relative`}

    &::after {
        content: '';
        transition: opacity 200ms;

        ${tw`absolute inset-0 shadow-lg rounded opacity-0`}
    }

    &::hover::after {
        ${tw`opacity-75`}
    }

    &::focus::after {
        ${tw`outline-none opacity-100`}
    }
`;

const DialogContainerShowStyles = tw`block`;

const MobileDialogContainer = styled.div`
    --dialog-max-width: 100%;
    --dialog-height: calc(100% - 64px);

    ${tw`hidden absolute inset-x-0 bottom-0 bg-white opacity-100`}

    height: var(--dialog-height);
    width: var(--dialog-max-width);

    transition: transform 300ms;

    ${({ show }) => show === true && DialogContainerShowStyles}
`;

const DesktopDialogContainer = styled.div`
    --dialog-max-width: 800px;
    --dialog-min-height: 400px;

    ${tw`m-auto bg-white p-2`}

    min-height: var(--dialog-max-height);
    width: var(--dialog-max-width);

    transition: transform 300ms;

    ${({ show }) => show === true && DialogContainerShowStyles}
`;

const OverlayContainerShowStyles = css`
    ${tw`opacity-100`}

    z-index: 60;
`;

const OverlayContainer = styled.div`
    ${tw`flex absolute inset-0 opacity-0`}

    background-color: rgba(45, 55, 72, 0.75);

    transition: opacity 300ms, z-index 1ms;
    z-index: -1;

    ${({ show }) => show === true && OverlayContainerShowStyles}
`;

function OverlayForwarded({ children, ...props }, ref) {
    return (
        <OverlayContainer {...props} ref={ref}>
            {children}
        </OverlayContainer>
    );
}

const Overlay = forwardRef(OverlayForwarded);

export function useInterval(defaultValueMin, defaultValueMax) {
    const [range, setRange] = useState([defaultValueMin, defaultValueMax]);

    return [range, setRange];
}

function Filters({ onHide, onConfirm }) {
    const [sortBy, setSortBy] = useState('AGE');
    const [ageRange, setAgeRange] = useInterval(0, 100);
    const [distanceRange, setDistanceRange] = useInterval(0, 120);
    const [popularityRange, setPopularityRange] = useInterval(0, 1000);
    const [commonTags, setCommonTags] = useState([]);

    const propositions = [
        { uuid: 'lol', text: 'Test' },
        { uuid: 'lol1', text: 'Yolo' },
        { uuid: 'lol2', text: 'Lel' },
        { uuid: 'lol3', text: 'Ahah' },
    ];

    const fields = [
        {
            label: 'Sort by :',
            value: sortBy,
            setValue: setSortBy,
            isValid: true,
            setIsValid: () => {},
            segmented: true,
            items: [
                { value: 'AGE', text: 'Age' },
                { value: 'DISTANCE', text: 'Distance' },
                { value: 'POPULARITY', text: 'Popularity' },
                { value: 'TAGS', text: 'Common tags' },
            ],
        },
        {
            label: 'Age',
            range: ageRange,
            setRange: setAgeRange,
            max: 100,
            formatValue: value => `${value} yo`,
        },
        {
            label: 'Distance',
            range: distanceRange,
            setRange: setDistanceRange,
            max: 120,
            formatValue: value => `${value} km`,
        },
        {
            label: 'Popularity',
            range: popularityRange,
            setRange: setPopularityRange,
            max: 1000,
        },
    ];

    const [, FormSort] = useForm({ fields: fields.slice(0, 1) });
    const [, FormFilter] = useForm({ fields: fields.slice(1) });

    function confirmFilters() {
        onConfirm(
            ...fields.map(({ value, range }) => value || range),
            commonTags.map(({ uuid }) => uuid)
        );

        onHide();
    }

    return (
        <div>
            <FiltersTitle>Precise the results</FiltersTitle>

            <FormSort fields={fields.slice(0, 1)} hideButton />

            <Subheader>Criteria :</Subheader>

            <FormFilter fields={fields.slice(1)} hideButton />

            <Combobox
                label="Common tags"
                items={commonTags}
                setItems={setCommonTags}
                propositions={propositions}
                onAddItem={null}
            />

            <ButtonsContainer>
                <Button onClick={onHide}>Cancel</Button>
                <Button onClick={confirmFilters}>Apply</Button>
            </ButtonsContainer>
        </div>
    );
}

export default function ResultsFilters({ show, onHide, onConfirm }) {
    const overlayRef = useRef(null);

    useEffect(() => {
        function onClick() {
            onHide();
        }

        window.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('click', onClick);
        };
    }, [onHide]);

    return ReactDOM.createPortal(
        <Overlay show={show} ref={overlayRef}>
            <Media query="(max-width: 640px)">
                {smallDevice =>
                    smallDevice ? (
                        <MobileDialogContainer
                            show={show}
                            onClick={e => e.stopPropagation()}
                        >
                            <Filters onHide={onHide} onConfirm={onConfirm} />
                        </MobileDialogContainer>
                    ) : (
                        <DesktopDialogContainer
                            show={show}
                            onClick={e => e.stopPropagation()}
                        >
                            <Filters onHide={onHide} onConfirm={onConfirm} />
                        </DesktopDialogContainer>
                    )
                }
            </Media>
        </Overlay>,
        document.getElementById('modals-container')
    );
}
