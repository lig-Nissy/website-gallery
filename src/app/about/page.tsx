import Link from 'next/link'

export const metadata = {
  title: 'このサイトについて | Website Gallery',
  description: 'Website Galleryについての説明',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-xl font-bold hover:opacity-70">
            Website Gallery
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">このサイトについて</h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">Website Galleryとは</h2>
            <p className="text-gray-700 leading-relaxed">
              Website Galleryは、優れたWebサイトを収集・紹介するギャラリーサイトです。デザインの参考やインスピレーションを得るためのリソースとしてご活用ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">特徴</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>カテゴリ別にサイトを閲覧できます</li>
              <li>タグで絞り込み検索が可能です</li>
              <li>キーワード検索でお探しのサイトを見つけられます</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">掲載について</h2>
            <p className="text-gray-700 leading-relaxed">
              サイトの掲載をご希望の方、または掲載の削除をご希望の方は、運営者までお問い合わせください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトに掲載されている情報の正確性には万全を期しておりますが、その内容を保証するものではありません。掲載サイトへのアクセスは、ご自身の責任において行ってください。
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
