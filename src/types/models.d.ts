export interface IBand {
    logo: File,
    description: string,
    extra: string,
}

export interface ISinger {
    name: string,
    instrument: string,
    orbit_length: number,
    color: string,
    biography: string,
    id: number,
}

export interface ISocialLink {
    image: Buffer,
    name: string,
    link: string,
}

export interface IUser {
    name: string,
    password: string,
}




