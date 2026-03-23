'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())

      if (page > 1) {
        params.set('page', String(page))
      } else {
        params.delete('page')
      }

      router.push(`/?${params.toString()}`)
    },
    [router, searchParams]
  )

  if (totalPages <= 1) return null

  const pages: (number | 'ellipsis')[] = []

  // ページ番号の生成ロジック
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
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 border rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        ←
      </button>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-2 border rounded-lg ${
              currentPage === page
                ? 'bg-foreground text-background'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 border rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        →
      </button>
    </div>
  )
}
