import { useEffect, useReducer, type ReactNode } from 'react'
import type { Character } from '../types/character'
import { FavoritesContext } from './FavoritesContext'
import { favoritesReducer } from './favoritesReducer'

const STORAGE_KEY = 'rick-and-morty:favorites'

function loadFavorites(): Character[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? (JSON.parse(stored) as Character[]) : []
    } catch {
        return []
    }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, dispatch] = useReducer(favoritesReducer, [], loadFavorites)

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        } catch {
            return
        }
    }, [favorites])

    const value = {
        favorites,
        isFavorite: (id: number) => favorites.some((item) => item.id === id),
        toggleFavorite: (character: Character) => dispatch({ type: 'toggle', character }),
        removeFavorite: (id: number) => dispatch({ type: 'remove', id }),
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
