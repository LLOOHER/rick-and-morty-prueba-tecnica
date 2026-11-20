import { useState } from 'react'
import { ROUTES } from '../routes/paths'
import { CharacterDetail } from '../components/characters/CharacterDetail'
import { CharacterGrid } from '../components/characters/CharacterGrid'
import { Modal } from '../components/ui/Modal'
import { NavButton } from '../components/ui/NavButton'
import { useFavorites } from '../hooks/useFavorites'
import type { Character } from '../types/character'
import homeIcon from '../assets/icons/home.svg'
import { useClientPagination } from '../hooks/useClientPagination'
import { Pagination } from '../components/ui/Pagination'

export function FavoritesPage() {
    const { favorites } = useFavorites()
    const { page, totalPages, pageItems, setPage } = useClientPagination(favorites)
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

    return (
        <main className="mx-auto max-w-[1168px] px-4 py-10">
            <h1 className="mb-10 text-center text-[32px] leading-tight font-bold text-black">
                Mis favoritos
            </h1>

            <div className="mb-4 flex">
                <NavButton
                    to={ROUTES.home}
                    label="Volver"
                    icon={homeIcon}
                    iconClassName="bg-primary"
                    iconPosition="start"
                />
            </div>

            {favorites.length === 0 ? (
                <p className="rounded-lg bg-background-2 p-6 text-center text-sub-black-2">
                    Aún no tienes personajes favoritos.
                </p>
            ) : (
                <>
                    <CharacterGrid characters={pageItems} onSelect={setSelectedCharacter} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}

            {selectedCharacter && (
                <Modal title={selectedCharacter.name} onClose={() => setSelectedCharacter(null)}>
                    <CharacterDetail character={selectedCharacter} />
                </Modal>
            )}
        </main>
    )
}
