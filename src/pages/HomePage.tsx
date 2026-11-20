import { useState } from 'react'
import { ROUTES } from '../routes/paths'
import { CharacterGrid } from '../components/characters/CharacterGrid'
import { useCharacters } from '../hooks/useCharacters'
import { CharacterDetail } from '../components/characters/CharacterDetail'
import { Modal } from '../components/ui/Modal'
import type { Character } from '../types/character'
import starWhiteIcon from '../assets/icons/star-white.svg'
import { NavButton } from '../components/ui/NavButton'
import { Pagination } from '../components/ui/Pagination'

export function HomePage() {
    const [page, setPage] = useState(1)
    const { characters, info, loading, error, retry } = useCharacters(page)
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <main className="mx-auto max-w-[1168px] px-4 py-10">
            <header className="mb-4 text-center">
                <h1 className="text-[32px] leading-tight font-bold text-black">
                    Wubba lubba dub dub!
                </h1>
                <p className="mt-4 text-2xl leading-tight font-bold text-black">
                    Base de datos de personajes de Rick y Morty
                </p>
            </header>

            <div className="mb-4 flex items-center justify-end">
                <NavButton
                    to={ROUTES.favorites}
                    label="Mis favoritos"
                    icon={starWhiteIcon}
                    iconClassName="bg-accent"
                />
            </div>

            {error ? (
                <div
                    role="alert"
                    className="flex flex-col items-center gap-3 rounded-lg bg-background-2 p-6 text-center"
                >
                    <p className="text-danger">{error}</p>
                    <button
                        type="button"
                        onClick={retry}
                        className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                <CharacterGrid
                    characters={characters}
                    loading={loading}
                    onSelect={setSelectedCharacter}
                />
            )}

            <Pagination page={page} totalPages={info?.pages ?? 0} onPageChange={handlePageChange} />

            {selectedCharacter && (
                <Modal title={selectedCharacter.name} onClose={() => setSelectedCharacter(null)}>
                    <CharacterDetail character={selectedCharacter} />
                </Modal>
            )}
        </main>
    )
}
