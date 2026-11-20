import { describe, expect, it } from 'vitest'
import { getPageItems } from './pagination'

describe('getPageItems', () => {
    it('muestra todas las páginas cuando son pocas', () => {
        expect(getPageItems(1, 4)).toEqual([1, 2, 3, 4])
    })

    it('muestra las primeras, las últimas y puntos suspensivos en la página 1', () => {
        expect(getPageItems(1, 42)).toEqual([1, 2, 'ellipsis', 41, 42])
    })

    it('muestra la página actual con sus vecinas y puntos suspensivos a ambos lados', () => {
        expect(getPageItems(20, 42)).toEqual([1, 2, 'ellipsis', 19, 20, 21, 'ellipsis', 41, 42])
    })

    it('muestra el número en lugar de puntos suspensivos cuando solo falta una página', () => {
        expect(getPageItems(5, 42)).toEqual([1, 2, 3, 4, 5, 6, 'ellipsis', 41, 42])
    })

    it('devuelve una sola página cuando el total es 1', () => {
        expect(getPageItems(1, 1)).toEqual([1])
    })

    it('muestra las primeras, las últimas y puntos suspensivos en la última página', () => {
        expect(getPageItems(42, 42)).toEqual([1, 2, 'ellipsis', 41, 42])
    })

    it('muestra la vecina anterior cuando está en la penúltima página', () => {
        expect(getPageItems(41, 42)).toEqual([1, 2, 'ellipsis', 40, 41, 42])
    })
})
