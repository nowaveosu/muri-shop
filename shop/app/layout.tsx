import "./globals.css";
import { ReduxProvider } from "./providers";
import Header from "./components/Header";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body>
                <ReduxProvider>
                    <Header />
                    <main className="pt-[120px]">
                        {children}
                    </main>
                </ReduxProvider>
            </body>
        </html>
    );
}