
export type ApiError = {
    message: string;
}

export enum SectionStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    DONE = 'loading',
}

export type SectionState = {
    status: SectionStatus;
    error: ApiError | null;
}
