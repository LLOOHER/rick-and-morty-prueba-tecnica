import type { Character } from '../../types/character'

interface CharacterCardProps {
    character: Character
    onSelect: (character: Character) => void
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
    return (
        <article className="relative rounded-md bg-white p-2.5 shadow-card">
            <button
                type="button"
                onClick={() => onSelect(character)}
                className="flex w-full cursor-pointer flex-col gap-2.5 text-left"
            >
                <img
                    src={character.image}
                    alt={character.name}
                    loading="lazy"
                    className="aspect-square w-full rounded object-cover"
                />
                <span className="flex h-6 items-center truncate pr-8 text-sm font-bold text-black">
                    {character.name}
                </span>
            </button>
        </article>
    )
}
