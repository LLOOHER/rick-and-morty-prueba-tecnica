import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import chevronRightIcon from '../../assets/icons/chevron-right.svg'
import { getPageItems } from '../../utils/pagination'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

const BASE = 'flex size-8 items-center justify-center rounded border text-sm font-bold'
const ARROW = `${BASE} cursor-pointer border-page-border bg-white disabled:cursor-not-allowed disabled:border-transparent disabled:bg-page-disabled disabled:opacity-50`

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <nav
            aria-label="Paginación"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
            <button
                type="button"
                aria-label="Página anterior"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className={ARROW}
            >
                <img src={chevronLeftIcon} alt="" className="size-6" />
            </button>

            {getPageItems(page, totalPages).map((item, index) =>
                item === 'ellipsis' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className={`${BASE} border-page-border bg-white text-dark-grey-400`}
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        aria-current={item === page ? 'page' : undefined}
                        onClick={() => onPageChange(item)}
                        className={`${BASE} cursor-pointer bg-white ${
                            item === page
                                ? 'border-page-active text-page-active'
                                : 'border-page-border text-dark-grey-400'
                        }`}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                aria-label="Página siguiente"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className={ARROW}
            >
                <img src={chevronRightIcon} alt="" className="size-6" />
            </button>
        </nav>
    )
}
