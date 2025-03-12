import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ALBERTOS PIZZA",
    description: "Welcome to Don Macchiatos Coffee Shop",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
