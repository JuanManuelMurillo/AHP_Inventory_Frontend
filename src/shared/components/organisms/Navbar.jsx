import Image from "next/image";
import Link from "next/link";
import "../../css/components/organisms/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-container">
            <div className="container">

                <Link href="/" className="navbar-brand">
                    <Image 
                        src="/assets/AHP_logo.png" 
                        alt="AHP Logo" 
                        width={150} 
                        height={65}
                        priority
                    />
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link 
                                className="nav-link active" 
                                href="/"
                            >
                                Nosotros
                            </Link>
                        </li>


                        <li className="nav-item dropdown">

                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Catálogo
                            </Link>


                            <ul className="dropdown-menu">

                                <li>
                                    <Link 
                                        className="dropdown-item"
                                        href="/inventory/printers/catalog"
                                    >
                                        Impresoras
                                    </Link>
                                </li>

                                <li>
                                    <Link 
                                        className="dropdown-item"
                                        href="/inventory/toner/catalog"
                                    >
                                        Tóners
                                    </Link>
                                </li>

                                <li>
                                    <Link 
                                        className="dropdown-item"
                                        href="/catalog/spare-parts/catalog"
                                    >
                                        Refacciones
                                    </Link>
                                </li>

                            </ul>

                        </li>


                        <li className="nav-item">
                            <Link 
                                className="nav-link"
                                href="/contact"
                            >
                                Contacto
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
}