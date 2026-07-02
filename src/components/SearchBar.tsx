import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-young-gray-light/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar aplicação…"
        className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-9 text-sm text-young-gray-lighter placeholder:text-young-gray-light/35 focus:border-young-orange focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-young-gray-light/40 hover:text-young-orange"
          title="Limpar"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
