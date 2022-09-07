export interface IBand {
    logo: string,
    description: string,
    name: string,
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

export interface ISingerAvatar {
    image: string,
    singerId: number
}

export interface ISocialLinkLogo{
    image: string,
    socialLinkId: number
}




