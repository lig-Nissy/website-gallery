'use client'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function AdminPagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages: (number | 'ellipsis')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 border border-zinc-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-700 text-zinc-300"
      >
        ←
      </button>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-zinc-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border rounded-lg ${
              currentPage === page
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-zinc-600 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 border border-zinc-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-700 text-zinc-300"
      >
        →
      </button>
    </div>
  )
}
