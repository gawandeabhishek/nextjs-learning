export default function Navbar() {
    return (
        <nav className="flex gap-5 justify-between px-6 py-2">
            <h1>My React App</h1>
            <ul className="flex gap-2">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>  
    )
}