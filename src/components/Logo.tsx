import { useState } from 'react'

interface LogoProps {
  /** Altura em px. */
  size?: number
  /** Força o uso do wordmark textual, ignorando o arquivo oficial. */
  forceWordmark?: boolean
  className?: string
}

/**
 * Renderiza a logo oficial em `/logo.svg` (coloque o arquivo do Guia de Marca
 * em `public/logo.svg`). Enquanto o arquivo não existir, cai num wordmark
 * textual "young." no estilo da marca (Space Grotesk + laranja).
 */
export function Logo({ size = 32, forceWordmark = false, className = '' }: LogoProps) {
  const [useFallback, setUseFallback] = useState(forceWordmark)

  if (!useFallback) {
    return (
      <img
        src="/logo.svg"
        alt="Young Empreendimentos"
        height={size}
        style={{ height: size, width: 'auto' }}
        className={className}
        onError={() => setUseFallback(true)}
      />
    )
  }

  return (
    <span
      className={`font-display font-bold leading-none tracking-tight ${className}`}
      style={{ fontSize: size * 0.9 }}
    >
      <span className="text-young-gray-lighter">young</span>
      <span className="text-young-orange">.</span>
    </span>
  )
}
