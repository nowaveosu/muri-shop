import "./globals.css";
import Link from "next/link";
import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko"
    suppressHydrationWarning>
      <body>
        <header className="border-b-2 mb-8 border-gray-500">
          <div className="flex justify-center items-center mt-12">
            <Image src="/logo.png" width={300} height={64} alt="logo" />
          </div>

          <nav className="mt-9 mb-6 flex justify-center space-x-40 text-lg">
            <Link href="/">BEST</Link>
            <Link href="/lotion">보습제</Link>
            <Link href="/tonic">영양제</Link>
            <Link href="/board">게시판</Link>
          </nav>
        </header>

        {children}
      </body>

    </html>
  );
}
