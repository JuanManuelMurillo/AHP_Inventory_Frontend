import "../../css/components/molecules/PageTitle.css";

export default function PageTitle({
    children,
    as: Tag = "h1",
}) {
    return (
        <div className="page-title-container">
            <Tag className="page-title">
                {children}
            </Tag>
        </div>
    );
}