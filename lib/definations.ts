declare type AuthMiddleware = 'auth' | 'guest'
export interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string
}

export interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>
    [key: string]: any
}

export interface User {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
}
