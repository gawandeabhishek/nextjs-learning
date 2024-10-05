"use client"

interface ErrorPageProps {
    error: Error,
    reset: () => void
}

export default function Error({reset} : ErrorPageProps) {
    return (
        <div>
            <h1>Error 404 - Page Not Found</h1>
            <p>The requested page was not found.</p>
            <button onClick={reset}>Go back to home</button>
        </div>
    )
}