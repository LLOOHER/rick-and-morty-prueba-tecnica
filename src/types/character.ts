export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface CharacterLocation {
    name: string
    url: string
}

export interface Character {
    id: number
    name: string
    status: CharacterStatus
    species: string
    type: string
    gender: CharacterGender
    origin: CharacterLocation
    location: CharacterLocation
    image: string
    episode: string[]
    url: string
    created: string
}

export interface PaginationInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

export interface CharactersResponse {
    info: PaginationInfo
    results: Character[]
}
