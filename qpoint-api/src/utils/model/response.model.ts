export interface ResponseModel<> {
    status: string
    data?: any
    statusCode?: number,
    path?: string,
    errorMessage?: string,
}