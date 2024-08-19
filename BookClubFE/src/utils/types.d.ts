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

export interface Club {
    ClubId?: number,
    Name: string,
    Description: string,
    ProfileImg: string
}