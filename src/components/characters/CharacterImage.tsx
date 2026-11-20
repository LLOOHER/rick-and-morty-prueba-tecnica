import { useState } from 'react'

interface CharacterImageProps {
    src: string
    alt: string
    lazy?: boolean
}

export function CharacterImage({ src, alt, lazy = false }: CharacterImageProps) {
    const [failed, setFailed] = useState(false)

    if (failed) {
        return (
            <div
                role="img"
                aria-label={alt}
                className="flex aspect-square w-full items-center justify-center rounded bg-background-2 text-xs text-sub-black-2"
            >
                Imagen no disponible
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : undefined}
            onError={() => setFailed(true)}
            className="aspect-square w-full rounded object-cover"
        />
    )
}
