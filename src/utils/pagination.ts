export type PageItem = number | 'ellipsis'

export function getPageItems(current: number, total: number): PageItem[] {
    const visible = new Set<number>()

    for (const page of [1, 2, total - 1, total, current - 1, current, current + 1]) {
        if (page >= 1 && page <= total) visible.add(page)
    }

    const pages = [...visible].sort((a, b) => a - b)
    const items: PageItem[] = []

    pages.forEach((page, index) => {
        const previous = pages[index - 1]
        if (previous !== undefined && page - previous === 2) items.push(previous + 1)
        if (previous !== undefined && page - previous > 2) items.push('ellipsis')
        items.push(page)
    })

    return items
}
