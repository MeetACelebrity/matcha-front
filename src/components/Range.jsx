import React, { useRef, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.div``;

const Title = styled.p`
    ${tw`mb-1 mx-2`}
`;

const RangeAsideContainer = styled.div`
    ${tw`items-center`}

    display: grid;

    grid-template-columns: 4rem auto 4rem;
`;

const AsideData = styled.aside`
    ${tw`text-center`}
`;

const RangeContainer = styled.div`
    ${tw`mx-4 my-3 relative`}
`;

const SliderContainer = styled.div`
    ${tw`w-full relative h-1`}
`;

const SliderBackground = styled.div`
    ${tw`bg-blue-300 h-full`}
`;

const SliderTrack = styled.div`
    ${tw`absolute bg-blue-700 h-full inset-y-0`}
`;

const SliderThumb = styled.div`
    --size: 1rem;
    --left: 0;

    ${tw`absolute rounded-full bg-blue-800 left-0 cursor-pointer`}

    width: var(--size);
    height: var(--size);

    top: -0.375rem;

    transition: transform 0s;

    transform-origin: center center;
    transform: translateX(calc(var(--left, 0) - var(--size) / 2));
`;

export default function Range({
    label,
    range,
    setRange,
    max = 100,
    formatValue = value => value,
}) {
    const STEPS = 100;

    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(0);
    const [lowerBoundPercentage, setLowerBoundPercentage] = useState(0);
    const [upperBoundPercentage, setUpperBoundPercentage] = useState(0);
    const containerRef = useRef(null);
    const rect = useMemo(() => {
        if (containerRef.current === null) return null;
        return containerRef.current.getBoundingClientRect();
    }, [containerRef.current]);

    useEffect(() => {
        const width = rect === null ? max : rect.width;

        const lowPercent = ((range[0] || 0) * 100) / max;
        const upPercent = ((range[1] || 0) * 100) / max;

        setLowerBound((lowPercent * width) / 100);
        setUpperBound((upPercent * width) / 100);
        setLowerBoundPercentage(lowPercent);
        setUpperBoundPercentage(upPercent);
    }, [max, range, rect]);

    function onDown(type) {
        function onMove(e) {
            let diff = e.clientX - rect.x;

            if (diff < 0) diff = 0;
            else if (diff > rect.width) diff = rect.width;

            const doneSteps = Math.trunc((diff * STEPS) / rect.width);
            const newValue = (doneSteps * max) / STEPS;

            switch (type) {
                case 'left':
                    setRange(([, upperBound]) => [newValue, upperBound]);
                    break;
                case 'right':
                    setRange(([lowerBound]) => [lowerBound, newValue]);
                    break;
                default:
                    break;
            }
        }

        return () => {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('touchmove', onMove);

            window.addEventListener('mouseup', function onMouseUp() {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onMouseUp);
            });
            window.addEventListener('touchend', function onTouchEnd() {
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', onTouchEnd);
            });
        };
    }

    return (
        <Container>
            <Title>{label}</Title>
            <RangeAsideContainer>
                <AsideData>{formatValue(range[0])}</AsideData>
                <RangeContainer ref={containerRef}>
                    <input type="hidden" readOnly={true} value={range[0]} />
                    <input type="hidden" readOnly={true} value={range[1]} />

                    <SliderContainer>
                        <SliderBackground />
                        <SliderTrack
                            style={{
                                left: `${lowerBoundPercentage}%`,
                                width: `${upperBoundPercentage -
                                    lowerBoundPercentage}%`,
                            }}
                        />
                    </SliderContainer>

                    <SliderThumb
                        style={{ '--left': `${lowerBound}px` }}
                        onTouchStart={onDown('left')}
                        onMouseDown={onDown('left')}
                    />
                    <SliderThumb
                        style={{ '--left': `${upperBound}px` }}
                        onTouchStart={onDown('right')}
                        onMouseDown={onDown('right')}
                    />
                </RangeContainer>
                <AsideData>{formatValue(range[1])}</AsideData>
            </RangeAsideContainer>
        </Container>
    );
}
