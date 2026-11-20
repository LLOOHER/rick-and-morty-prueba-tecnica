import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCharacters } from '../api/characters'
import { FavoritesProvider } from '../context/FavoritesProvider'
import { createCharacter } from '../test/createCharacter'
import { HomePage } from './HomePage'

vi.mock('../api/characters', () => ({
    getCharacters: vi.fn(),
}))

const mockedGetCharacters = vi.mocked(getCharacters)

function renderHomePage() {
    return render(
        <MemoryRouter>
            <FavoritesProvider>
                <HomePage />
            </FavoritesProvider>
        </MemoryRouter>,
    )
}

describe('HomePage', () => {
    beforeEach(() => {
        mockedGetCharacters.mockReset()
    })

    it('muestra los personajes que devuelve la API', async () => {
        mockedGetCharacters.mockResolvedValue({
            info: { count: 2, pages: 1, next: null, prev: null },
            results: [
                createCharacter({ id: 1, name: 'Rick Sanchez' }),
                createCharacter({ id: 2, name: 'Morty Smith' }),
            ],
        })

        renderHomePage()

        expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument()
        expect(screen.getByText('Morty Smith')).toBeInTheDocument()
    })

    it('abre el modal con el detalle al hacer clic en una tarjeta', async () => {
        mockedGetCharacters.mockResolvedValue({
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [createCharacter({ name: 'Rick Sanchez', status: 'Alive' })],
        })

        renderHomePage()
        await userEvent.click(await screen.findByText('Rick Sanchez'))

        const dialog = screen.getByRole('dialog', { name: 'Rick Sanchez' })
        expect(dialog).toHaveTextContent('Estado: Alive')
    })

    it('muestra un mensaje y permite reintentar cuando falla la API', async () => {
        mockedGetCharacters.mockRejectedValueOnce(new Error('No se pudo conectar con la API.'))
        mockedGetCharacters.mockResolvedValue({
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [createCharacter({ name: 'Rick Sanchez' })],
        })

        renderHomePage()

        expect(await screen.findByRole('alert')).toHaveTextContent(
            'No se pudo conectar con la API.',
        )
        await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
        expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument()
    })

    it('busca personajes por nombre al dejar de escribir', async () => {
        mockedGetCharacters.mockResolvedValue({
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [createCharacter({ name: 'Rick Sanchez' })],
        })

        renderHomePage()
        await screen.findByText('Rick Sanchez')

        await userEvent.type(
            screen.getByRole('searchbox', { name: 'Buscar personajes por nombre' }),
            'morty',
        )

        await waitFor(() => {
            expect(mockedGetCharacters).toHaveBeenLastCalledWith(
                1,
                'morty',
                expect.any(AbortSignal),
            )
        })
        expect(mockedGetCharacters).not.toHaveBeenCalledWith(1, 'mo', expect.anything())
    })

    it('muestra un mensaje cuando la búsqueda no tiene resultados', async () => {
        mockedGetCharacters.mockResolvedValueOnce({
            info: { count: 1, pages: 1, next: null, prev: null },
            results: [createCharacter({ name: 'Rick Sanchez' })],
        })
        mockedGetCharacters.mockResolvedValue({
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
        })

        renderHomePage()
        await screen.findByText('Rick Sanchez')

        await userEvent.type(screen.getByRole('searchbox'), 'zzz')

        expect(
            await screen.findByText('No se encontraron personajes con el nombre “zzz”.'),
        ).toBeInTheDocument()
    })
})
