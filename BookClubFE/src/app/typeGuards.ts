import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { RegistrationAllowanceError } from '@/features/auth/authSlice';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return error != null && typeof error === 'object' && 'status' in error;
}

export const isSerializedError = (error: unknown): error is SerializedError => {
    return typeof error === "object" && error !== null && "message" in error;
}

export const isRegistrationAllowanceError = (error: unknown): error is RegistrationAllowanceError => {
    return typeof error === "object" && error !== null && "kind" in error && error.kind === "registrationError";
}
