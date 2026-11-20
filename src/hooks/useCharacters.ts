import { useEffect, useState } from 'react'
import { getCharacters } from '../api/characters'
import type { CharactersResponse } from '../types/character'

type Result =
    | { key: string; data: CharactersResponse; error: null }
    | { key: string; data: null; error: string }

export function useCharacters(page = 1, name = '') {
    const [attempt, setAttempt] = useState(0)
    const requestKey = `${page}-${name}-${attempt}`
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        getCharacters(page, name, controller.signal)
            .then((data) => setResult({ key: requestKey, data, error: null }))
            .catch((err: unknown) => {
                if (controller.signal.aborted) return
                const message = err instanceof Error ? err.message : 'Error desconocido'
                setResult({ key: requestKey, data: null, error: message })
            })

        return () => controller.abort()
    }, [page, name, requestKey])

    const loading = result?.key !== requestKey

    return {
        characters: result?.data?.results ?? [],
        info: result?.data?.info ?? null,
        loading,
        error: loading ? null : (result?.error ?? null),
        retry: () => setAttempt((value) => value + 1),
    }
}
