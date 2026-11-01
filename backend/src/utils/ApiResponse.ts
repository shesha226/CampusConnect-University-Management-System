export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}

export const successResponce = <T>(
    message: string,
    data?: T,
): ApiResponse<T> => {
    return {
        success: true,
        message,
        data,
    };
};