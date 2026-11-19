import type { Character } from '../../types/character'
import { CharacterCard } from './CharacterCard'

interface CharacterGridProps {
    characters: Character[]
    onSelect: (character: Character) => void
}

export function CharacterGrid({ characters, onSelect }: CharacterGridProps) {
    return (
        <section className="grid grid-cols-1 gap-6 rounded-lg bg-background-2 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((character) => (
                <CharacterCard key={character.id} character={character} onSelect={onSelect} />
            ))}
        </section>
    )
}
