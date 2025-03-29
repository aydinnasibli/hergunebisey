
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="max-w-6xl mx-auto px-8">
            {/* Main content */}
            {children}
        </main>
    )
}