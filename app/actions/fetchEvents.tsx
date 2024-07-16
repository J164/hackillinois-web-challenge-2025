"use server";

export type Events = Array<{
    eventId: string,
    name: string,
    description: string,
    startTime: number,
    endTime: number,
    locations: Array<{
        description: string,
        tags: string[],
        latitude: number,
        logitude: number
    }>,
    eventType: string,
    points: number,
    isAsync: boolean,
    mapImageUrl: string
}>;

// NOTE: hack to work around CORS policy.
// Fetches the data on the server and forwards it to the client rather than the client fetching directly
// this function would be located in the Schedule component and not be a server function if the CORS policy on the API allowed it
export async function fetchData() {
    const req = await fetch('https://adonix.hackillinois.org/event/');
    const { events } = await req.json() as { events: Events};

    return events
        .sort((first, second) => first.startTime - second.startTime);
}