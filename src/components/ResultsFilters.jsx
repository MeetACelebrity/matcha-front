import React, { useEffect, useRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import Media from 'react-media';

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
                        />
                    ) : (
                        <DesktopDialogContainer
                            show={show}
                            onClick={e => e.stopPropagation()}
                        />
                    );
                }}
            </Media>
        </Overlay>,
        document.getElementById('modals-container')
    );
}
