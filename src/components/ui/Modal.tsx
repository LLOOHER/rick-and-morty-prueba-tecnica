import { useEffect, type ReactNode } from 'react'
import closeIcon from '../../assets/icons/close.svg'

interface ModalProps {
    title: string
    onClose: () => void
    children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="flex w-full max-w-[260px] flex-col gap-2.5 rounded-md bg-white p-2.5 shadow-card"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-danger-bg px-2 py-1 text-[10px] font-bold text-danger"
                    >
                        CERRAR
                        <img src={closeIcon} alt="" className="size-3.5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
