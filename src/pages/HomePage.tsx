import { useState } from 'react'
import { ROUTES } from '../routes/paths'
import { CharacterGrid } from '../components/characters/CharacterGrid'
import { useCharacters } from '../hooks/useCharacters'
import { CharacterDetail } from '../components/characters/CharacterDetail'
import { Modal } from '../components/ui/Modal'
import type { Character } from '../types/character'
import starWhiteIcon from '../assets/icons/star-white.svg'
import { NavButton } from '../components/ui/NavButton'

export function HomePage() {
    const { characters, loading, error } = useCharacters()
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

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

            {error && (
                <p role="alert" className="text-center text-red-600">
                    {error}
                </p>
            )}

            <CharacterGrid
                characters={characters}
                loading={loading}
                onSelect={setSelectedCharacter}
            />

            {selectedCharacter && (
                <Modal title={selectedCharacter.name} onClose={() => setSelectedCharacter(null)}>
                    <CharacterDetail character={selectedCharacter} />
                </Modal>
            )}
        </main>
    )
}
