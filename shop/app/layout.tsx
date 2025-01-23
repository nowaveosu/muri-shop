
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div>가려움없는세상</div>
        <div>
          <Link href="/">BEST</Link>
          <Link href="/lotion">보습제</Link>
          <Link href="/tonic">영양제</Link>
          <Link href="/board">게시판</Link>
        </div>
        {children}
      </body>

    </html>
  );
}
