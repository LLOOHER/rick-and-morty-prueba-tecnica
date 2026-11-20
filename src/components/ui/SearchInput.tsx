import searchIcon from '../../assets/icons/search.svg'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) {
    return (
        <label className="flex w-full items-center gap-1.5 rounded-lg border border-transparent bg-background-2 py-2 pr-2.5 pl-2 focus-within:border-primary focus-within:bg-white sm:w-[200px]">
            <img src={searchIcon} alt="" className="size-4" />
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                aria-label="Buscar personajes por nombre"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-placeholder"
            />
        </label>
    )
}
