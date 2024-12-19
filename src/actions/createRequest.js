'use server';

import Request from "@/models/RequestModel";
import connectDB from "../../config/database";

export default async function createRequest({ userId, songId, requestType, message }) {
    try {
        await connectDB();        
        const request = await Request.create({
            userId,
            songId,
            requestType,
            message,
            status: 'PENDING'
        });
        console.log(request);
        return request;
    } catch (error) {
        console.error('Error creating request:', error);
        throw new Error('Failed to create request');
    }
} 