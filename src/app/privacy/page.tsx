import Link from 'next/link'

export const metadata = {
  title: 'プライバシーポリシー | Website Gallery',
  description: 'Website Galleryのプライバシーポリシー',
}

export default function PrivacyPolicyPage() {
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
        <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. はじめに</h2>
            <p className="text-gray-700 leading-relaxed">
              Website Gallery（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、当サイトがどのような情報を収集し、どのように利用するかについて説明します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. 収集する情報</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              当サイトは、以下の情報を収集する場合があります。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
              <li>Cookie情報</li>
              <li>管理者ログイン時の認証情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. 情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              収集した情報は、以下の目的で利用します。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>サービスの提供・運営</li>
              <li>サービスの改善・向上</li>
              <li>不正アクセスの防止</li>
              <li>利用状況の分析</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. 第三者への提供</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Cookieの使用</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、ユーザー体験の向上やログイン状態の維持のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることも可能ですが、一部の機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. アクセス解析ツール</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、アクセス解析のためにGoogle Analyticsなどのツールを使用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              本プライバシーポリシーに関するお問い合わせは、当サイトの運営者までご連絡ください。
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">制定日: 2024年1月1日</p>
        </div>
      </main>
    </div>
  )
}
