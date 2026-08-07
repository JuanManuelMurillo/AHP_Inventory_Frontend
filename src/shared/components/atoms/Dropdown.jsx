export default function Dropdown({
    title,
    items = [],
    variant = "secondary",
}) {
    return (
        <div className="dropdown">
            <button
                className={`btn btn-${variant} dropdown-toggle`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {title}
            </button>

            <ul className="dropdown-menu">
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            className="dropdown-item"
                            onClick={item.onClick}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}