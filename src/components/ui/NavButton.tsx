import { Link } from 'react-router'

interface NavButtonProps {
    to: string
    label: string
    icon: string
    iconClassName: string
    iconPosition?: 'start' | 'end'
}

export function NavButton({
    to,
    label,
    icon,
    iconClassName,
    iconPosition = 'end',
}: NavButtonProps) {
    const iconBox = (
        <span className={`flex items-center justify-center rounded-[5px] p-1.5 ${iconClassName}`}>
            <img src={icon} alt="" className="size-5" />
        </span>
    )

    const padding = iconPosition === 'start' ? 'pr-2.5 pl-1' : 'pr-1 pl-2.5'

    return (
        <Link
            to={to}
            className={`flex items-center gap-[18px] rounded-lg bg-background-2 py-1 text-base text-black ${padding}`}
        >
            {iconPosition === 'start' && iconBox}
            {label}
            {iconPosition === 'end' && iconBox}
        </Link>
    )
}
