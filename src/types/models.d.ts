export interface IBand {
    logo: File,
    description: string,
    extra: string,
}

export interface ISinger {
    name: string,
    instrument: string,
    orbitLength: number,
    color: string,
    biography: string,
    id: number,
}

export interface ISocialLink {
    name: string,
    link: string,
    id: number,
}

export interface IUser {
    name: string,
    password: string,
}




