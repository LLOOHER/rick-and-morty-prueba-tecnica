import type { CharactersResponse } from '../types/character'

const API_URL = import.meta.env.VITE_API_URL || 'https://rickandmortyapi.com/api'

const EMPTY_RESPONSE: CharactersResponse = {
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
}

export async function getCharacters(
    page = 1,
    name = '',
    signal?: AbortSignal,
): Promise<CharactersResponse> {
    const params = new URLSearchParams({ page: String(page) })
    if (name.trim()) params.set('name', name.trim())

    let response: Response
    try {
        response = await fetch(`${API_URL}/character?${params}`, { signal })
    } catch (error) {
        if (signal?.aborted) throw error
        throw new Error('No se pudo conectar con la API. Intenta de nuevo en unos segundos.', {
            cause: error,
        })
    }

    if (response.status === 404) return EMPTY_RESPONSE
    if (!response.ok) throw new Error(`Error ${response.status} al obtener personajes`)

    return response.json()
}
