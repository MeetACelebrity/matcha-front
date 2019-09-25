import React from 'react';

export default function BottomBar() {
    return (
        <nav>
            {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                <button key={i}>{letter}</button>
            ))}
        </nav>
    );
}
