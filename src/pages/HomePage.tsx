import { CharacterGrid } from '../components/characters/CharacterGrid'
import { useCharacters } from '../hooks/useCharacters'

export function HomePage() {
    const { characters, loading, error } = useCharacters()

    return (
        <main className="mx-auto max-w-[1168px] px-4 py-10">
            <header className="mb-6 text-center">
                <h1 className="text-[32px] leading-tight font-bold text-black">
                    Wubba lubba dub dub!
                </h1>
                <p className="mt-4 text-2xl leading-tight font-bold text-black">
                    Base de datos de personajes de Rick y Morty
                </p>
            </header>

            {error && (
                <p role="alert" className="text-center text-red-600">
                    {error}
                </p>
            )}

            {loading && characters.length === 0 && (
                <p className="text-center text-sub-black-2">Cargando personajes…</p>
            )}

            <CharacterGrid
                characters={characters}
                onSelect={(character) => console.log(character)}
            />
        </main>
    )
}
