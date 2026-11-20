import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FavoritesProvider } from '../../context/FavoritesProvider'
import { createCharacter } from '../../test/createCharacter'
import { FavoriteButton } from './FavoriteButton'

describe('FavoriteButton', () => {
    it('agrega y quita el personaje de favoritos', async () => {
        render(
            <FavoritesProvider>
                <FavoriteButton character={createCharacter()} />
            </FavoritesProvider>,
        )

        const button = screen.getByRole('button', { name: 'Agregar a Rick Sanchez a favoritos' })
        expect(button).toHaveAttribute('aria-pressed', 'false')

        await userEvent.click(button)
        expect(button).toHaveAttribute('aria-pressed', 'true')
        expect(button).toHaveAccessibleName('Quitar a Rick Sanchez de favoritos')

        await userEvent.click(button)
        expect(button).toHaveAttribute('aria-pressed', 'false')
    })

    it('guarda los favoritos en localStorage', async () => {
        render(
            <FavoritesProvider>
                <FavoriteButton character={createCharacter()} />
            </FavoritesProvider>,
        )

        await userEvent.click(screen.getByRole('button'))

        const stored = JSON.parse(localStorage.getItem('rick-and-morty:favorites') ?? '[]')
        expect(stored).toHaveLength(1)
        expect(stored[0].name).toBe('Rick Sanchez')
    })
})
