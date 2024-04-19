export type ResponseLoginTypes = {
    data: {
        token: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        role?: string
    },
    status: number,
    message: string
}