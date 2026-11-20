import type { Character } from '../../types/character'
import { Chip } from '../ui/Chip'

interface CharacterDetailProps {
    character: Character
}

export function CharacterDetail({ character }: CharacterDetailProps) {
    return (
        <div className="flex flex-col gap-2.5">
            <img
                src={character.image}
                alt={character.name}
                className="aspect-square w-full rounded object-cover"
            />
            <div className="flex flex-col gap-2">
                <h2 className="text-center text-sm font-bold text-black">{character.name}</h2>
                <div className="flex flex-wrap justify-center gap-2">
                    <Chip label="Estado" value={character.status} className="bg-chip-status" />
                    <Chip label="Género" value={character.gender} className="bg-chip-gender" />
                    <Chip label="Especie" value={character.species} className="bg-chip-species" />
                    <Chip label="Origen" value={character.origin.name} className="bg-chip-origin" />
                    <Chip
                        label="Ubicación"
                        value={character.location.name}
                        className="bg-chip-location"
                    />
                </div>
            </div>
        </div>
    )
}
