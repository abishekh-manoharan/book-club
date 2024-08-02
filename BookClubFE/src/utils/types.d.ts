export interface RegistrationFormData {
    Username: string,
    Fname: string,
    LName: string,
    Email: string,
    password: string
}

export interface AuthContext {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}