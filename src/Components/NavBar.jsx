import Link from 'next/link';
 
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg 
                         navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    Crypto Price Tracker
                </Link>
                <div className="collapse navbar-collapse"
                    id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    </ul>
                </div>
            </div>
        </nav>
    );
};
 
export default Navbar;