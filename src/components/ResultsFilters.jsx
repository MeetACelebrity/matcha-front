import React, { useState, useEffect, useRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import Media from 'react-media';

import useForm from './Form.jsx';

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
    --dialog-height: 400px;

    ${tw`m-auto bg-white`}

    height: var(--dialog-height);
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

function Filters() {
    const [sortBy, setSortBy] = useState('AGE');
    const [ageRange, setAgeRange] = useInterval(0, 100);
    const [distanceRange, setDistanceRange] = useInterval(0, 120);
    const [popularityRange, setPopularityRange] = useInterval(0, 1000);

    const fields = [
        {
            label: 'Sort by',
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

    const [, Form] = useForm({ fields });

    return <Form fields={fields} hideButton />;
}

export default function ResultsFilters({ show, onHide }) {
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
                {smallDevice => {
                    console.log('render', show);
                    return smallDevice ? (
                        <MobileDialogContainer
                            show={show}
                            onClick={e => e.stopPropagation()}
                        >
                            <Filters />
                        </MobileDialogContainer>
                    ) : (
                        <DesktopDialogContainer
                            show={show}
                            onClick={e => e.stopPropagation()}
                        >
                            <Filters />
                        </DesktopDialogContainer>
                    );
                }}
            </Media>
        </Overlay>,
        document.getElementById('modals-container')
    );
}
