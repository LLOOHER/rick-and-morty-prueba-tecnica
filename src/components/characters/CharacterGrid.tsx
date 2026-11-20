import type { Character } from '../../types/character'
import { CharacterCard } from './CharacterCard'
import { CharacterCardSkeleton } from './CharacterCardSkeleton'

const SKELETON_COUNT = 20

interface CharacterGridProps {
    characters: Character[]
    onSelect: (character: Character) => void
    loading?: boolean
}

export function CharacterGrid({ characters, onSelect, loading = false }: CharacterGridProps) {
    return (
        <section
            aria-busy={loading}
            className="grid grid-cols-1 gap-6 rounded-lg bg-background-2 p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            {loading
                ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
                      <CharacterCardSkeleton key={index} />
                  ))
                : characters.map((character) => (
                      <CharacterCard key={character.id} character={character} onSelect={onSelect} />
                  ))}
        </section>
    )
}
