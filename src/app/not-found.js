import Link from "next/link";


export default function NotFound() {
  return (
    <main className="container">
        <h1>404 - Página no encontrada</h1>
        <Link href="/">
            <button className="btn btn-primary">Volver al inicio</button>
        </Link>
    </main>
  );
}
