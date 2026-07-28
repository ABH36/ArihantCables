import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Trail after "Home", which is always prepended automatically. */
  items: Crumb[];
  /** "bar" renders the full-width bordered strip used on product detail pages. */
  variant?: "inline" | "bar";
  /** Extra classes for the "inline" variant's <nav> (e.g. spacing below it). */
  className?: string;
}

function Trail({ items }: { items: Crumb[] }) {
  return (
    <>
      <Link href="/" className="hover:text-primary-700 transition-colors">
        Home
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.name}-${i}`} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-300" />
            {isLast || !item.href ? (
              <span
                className={
                  isLast
                    ? "text-primary-700 font-medium truncate max-w-[200px]"
                    : "text-slate-500"
                }
              >
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-primary-700 transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </>
  );
}

export default function Breadcrumbs({ items, variant = "inline", className = "mb-8" }: BreadcrumbsProps) {
  if (variant === "bar") {
    return (
      <nav className="bg-slate-50 border-b border-slate-100 py-3" aria-label="Breadcrumb">
        <div className="section-container">
          <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <Trail items={items} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`flex items-center gap-2 text-sm text-slate-500 flex-wrap ${className}`} aria-label="Breadcrumb">
      <Trail items={items} />
    </nav>
  );
}
