import { useState } from 'react'
import { PAGE_SIZE } from '../constants/pagination'

export function useClientPagination<T>(items: T[], pageSize = PAGE_SIZE) {
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(items.length / pageSize)
    const currentPage = Math.min(page, Math.max(totalPages, 1))
    const pageItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return { page: currentPage, totalPages, pageItems, setPage }
}
