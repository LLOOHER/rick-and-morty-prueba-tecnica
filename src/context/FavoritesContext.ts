import { createContext } from 'react'
import type { Character } from '../types/character'

export interface FavoritesContextValue {
    favorites: Character[]
    isFavorite: (id: number) => boolean
    toggleFavorite: (character: Character) => void
    removeFavorite: (id: number) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
