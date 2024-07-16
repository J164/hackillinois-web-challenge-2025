"use client";
import React, { useEffect, useState } from 'react';
import { Events, fetchData } from '../actions/fetchEvents';
import ScheduleEvent from './schedule-event';

export default function Schedule() {
    const [events, setEvents] = useState<Events>([]);

    useEffect(() => {
        fetchData()
            .then(response => setEvents(response))
            .catch(error => console.error(error));
    }, []);

    const timeOptions = {
        hour: "numeric",
        minute: "2-digit"
    } as const;

    const colors = ["#8ec4f7", "#ff9ccb", "#ffd365"]
    let idx = 0;

    return (
        <div className="flex flex-col items-center gap-32">
            {events.map(({ eventId, name, points, startTime, endTime, description, locations }) => {
                const start = new Date(startTime * 1000).toLocaleTimeString("en-US", timeOptions);
                const end =  new Date(endTime * 1000).toLocaleTimeString("en-US", timeOptions)
                idx = (idx + 1) % colors.length;

                return (
                    <ScheduleEvent key={eventId} eventName={name} color={colors[idx]} startTime={start} endTime={end} points={points} description={description} location={locations.at(0)?.description ?? ""} />
                )
            })}
        </div>
    );
};