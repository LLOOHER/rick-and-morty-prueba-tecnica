import { useFavorites } from '../../hooks/useFavorites'
import type { Character } from '../../types/character'
import { StarIcon } from '../icons/StarIcon'

interface FavoriteButtonProps {
    character: Character
    className?: string
}

export function FavoriteButton({ character, className = '' }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const active = isFavorite(character.id)

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(character)}
            aria-pressed={active}
            aria-label={
                active
                    ? `Quitar a ${character.name} de favoritos`
                    : `Agregar a ${character.name} a favoritos`
            }
            className={`flex size-6 cursor-pointer items-center justify-center rounded-full bg-background-2 ${className}`}
        >
            <StarIcon filled={active} className="size-3" />
        </button>
    )
}
