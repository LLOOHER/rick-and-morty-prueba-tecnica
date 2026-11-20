import type { Character } from '../types/character'

export type FavoritesAction =
    { type: 'toggle'; character: Character } | { type: 'remove'; id: number }

export function favoritesReducer(state: Character[], action: FavoritesAction): Character[] {
    switch (action.type) {
        case 'toggle':
            return state.some((item) => item.id === action.character.id)
                ? state.filter((item) => item.id !== action.character.id)
                : [...state, action.character]
        case 'remove':
            return state.filter((item) => item.id !== action.id)
    }
}
