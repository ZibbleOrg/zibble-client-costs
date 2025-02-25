import type React from "react";
import Header from "@/app/components/Header";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header/>
            {children}
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>&copy; {new Date().getFullYear()} Zibble. All rights reserved.</p>
            </footer>
        </div>
    )
}