import React from 'react';

export default function Wheel() {
    return (
        <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-carnival bg-cover">
            <img src="/ferris_wheel.png" alt="Ferris Wheel" className="h-[150svh] max-h-[200svw] w-screen aspect-square translate-x-[-50%]"/>
        </div>
    );
};
