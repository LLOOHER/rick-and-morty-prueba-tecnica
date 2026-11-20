import { describe, expect, it } from 'vitest'
import { createCharacter } from '../test/createCharacter'
import { favoritesReducer } from './favoritesReducer'

const rick = createCharacter({ id: 1, name: 'Rick Sanchez' })
const morty = createCharacter({ id: 2, name: 'Morty Smith' })

describe('favoritesReducer', () => {
    it('agrega un personaje que no estaba en favoritos', () => {
        const state = favoritesReducer([rick], { type: 'toggle', character: morty })
        expect(state).toEqual([rick, morty])
    })

    it('quita un personaje que ya estaba en favoritos', () => {
        const state = favoritesReducer([rick, morty], { type: 'toggle', character: rick })
        expect(state).toEqual([morty])
    })

    it('elimina un personaje por id', () => {
        const state = favoritesReducer([rick, morty], { type: 'remove', id: 2 })
        expect(state).toEqual([rick])
    })

    it('no modifica el arreglo original', () => {
        const original = [rick]
        favoritesReducer(original, { type: 'toggle', character: morty })
        expect(original).toEqual([rick])
    })
})
