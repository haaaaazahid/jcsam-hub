import { Link, useLocation } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="page-container !py-3">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <FiHome className="w-4 h-4" /> Home
          </Link>
        </li>
        {segments.map((seg, i) => {
          const path = "/" + segments.slice(0, i + 1).join("/");
          const label = seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
          const isLast = i === segments.length - 1;
          return (
            <li key={path} className="flex items-center gap-2">
              <FiChevronRight className="w-3 h-3" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link to={path} className="hover:text-primary transition-colors">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
