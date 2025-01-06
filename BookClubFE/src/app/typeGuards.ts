import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return error != null && typeof error === 'object' && 'status' in error;
}

export const isSerializedError = (error: unknown): error is SerializedError => {
    return typeof error === "object" && error !== null && "message" in error;
}
