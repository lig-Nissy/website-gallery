import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Website Gallery
          </p>
          <nav className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              このサイトについて
            </Link>
            <Link
              href="/admin-profile"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              管理者について
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              プライバシーポリシー
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
