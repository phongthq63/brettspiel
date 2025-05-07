import {v4} from "uuid"


export const generateUUID = () => {
    return v4()
}

export const getTimestampUTC = () => {
    return Date.now()
}

export const wait = (ms: number) => {
    return new Promise((r) => setTimeout(r, ms))
}

export const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // Get the payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix base64 format
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((char) => `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload); // Parse JSON string to object
}

export const getRandomColor = () => {
    const randomValue = () => Math.floor(Math.random() * 256);
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
}