import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCharacters } from './characters'

function mockFetch(response: Partial<Response>) {
    const fetchMock = vi.fn().mockResolvedValue(response)
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
}

describe('getCharacters', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('pide la página y el nombre indicados', async () => {
        const fetchMock = mockFetch({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ info: {}, results: [] }),
        })

        await getCharacters(2, '  rick  ')

        const url = fetchMock.mock.calls[0][0] as string
        expect(url).toContain('/character?page=2&name=rick')
    })

    it('devuelve una lista vacía cuando la API responde 404', async () => {
        mockFetch({ ok: false, status: 404 })

        const response = await getCharacters(1, 'zzz')

        expect(response.results).toEqual([])
        expect(response.info.pages).toBe(0)
    })

    it('lanza un error con el código cuando la API falla', async () => {
        mockFetch({ ok: false, status: 500 })

        await expect(getCharacters()).rejects.toThrow('Error 500 al obtener personajes')
    })

    it('lanza un mensaje claro cuando no hay conexión', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

        await expect(getCharacters()).rejects.toThrow('No se pudo conectar con la API')
    })
})
