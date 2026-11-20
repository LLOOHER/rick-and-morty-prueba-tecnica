import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
    it('no se muestra cuando solo hay una página', () => {
        const { container } = render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('deshabilita el botón anterior en la primera página', () => {
        render(<Pagination page={1} totalPages={42} onPageChange={() => {}} />)
        expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled()
        expect(screen.getByRole('button', { name: 'Página siguiente' })).toBeEnabled()
    })

    it('marca la página actual', () => {
        render(<Pagination page={2} totalPages={42} onPageChange={() => {}} />)
        expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
    })

    it('avisa la página elegida al hacer clic', async () => {
        const onPageChange = vi.fn()
        render(<Pagination page={1} totalPages={42} onPageChange={onPageChange} />)

        await userEvent.click(screen.getByRole('button', { name: '42' }))
        await userEvent.click(screen.getByRole('button', { name: 'Página siguiente' }))

        expect(onPageChange).toHaveBeenNthCalledWith(1, 42)
        expect(onPageChange).toHaveBeenNthCalledWith(2, 2)
    })
})
