"use client";
import React, { useLayoutEffect, useRef } from 'react';

export type ScheduleEventParams = {
    color: string,
    eventName: string,
    startTime: string,
    endTime: string,
    points: number,
    description: string,
    location: string
}

export default function ScheduleEvent({ color, eventName, startTime, endTime, points, description, location }: ScheduleEventParams) {
    const ref = useRef<HTMLDivElement>(null);
    const dampingFactor = 0.8;

    useLayoutEffect(() => {
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    })

    const onScroll = () => {
        if (!ref.current) {
            return;
        }

        const { top, bottom } = ref.current.getBoundingClientRect();
        const y = (top + bottom) / 2
        const radius = Math.max(window.innerWidth, window.innerHeight) / 2;

        const distance = Math.abs(y - (window.innerHeight / 2));
        const angle = Math.asin(distance / radius * dampingFactor);
        const x = radius * Math.cos(angle) - radius;

        ref.current.style.transform = `translate(${x}px)`;
    }

    const max = 80;
    const pointsToColor = (points: number) => {
        const value = Math.min(points, max);

        const ratio = value / max;
        const adjust = Math.floor((0.5 - Math.abs(ratio - 0.5)) * 255)

        const red = Math.floor(255 * ratio) + adjust;
        const green = Math.floor(255 * (1 - ratio)) + adjust;

        return `#${((1 << 24) + (red << 16) + (green << 8) + 145).toString(16).slice(1)}`;
    }

    return (
        <div className="bg-white flex flex-col items-center min-w-[300px] max-w-[50%] min-h-[240px] rounded-md text-black text-center text-lg" ref={ref}>
            <div className="rounded-t-md w-full text-3xl p-2 font-bold" style={{ backgroundColor: color }}>{eventName}</div>
            <div className="grid grid-cols-[4fr_1fr_4fr] min-h-32 w-full items-center">
                <div className="p-4 h-fit">
                    <p className={"text-xl font-bold"}>{startTime}</p>
                    <p>{endTime}</p>
                </div>
                <div className="h-full" style={{ backgroundColor: color }}></div>
                <div className="p-4 h-fit"><p className="bg-black rounded-lg p-1 font-bold" style={{ backgroundColor: pointsToColor(points) }}>{`${points} points`}</p></div>
            </div>
            <div className="p-4 rounded-md" style={{ backgroundColor: color }}>
                <p>{description}</p>
                <br />
                <p>{location}</p>
            </div>
        </div>
    );
};