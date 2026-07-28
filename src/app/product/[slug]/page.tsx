import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Phone, CheckCircle2 } from "lucide-react";
import { getProductDetail } from "@/lib/catalogue";
import Reveal from "@/components/ui/Reveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductDetail(params.slug);
  if (!product) return { title: "Product — Arihant Cables" };
  return {
    title: `${product.name} — Arihant Cables Mumbai`,
    description:
      product.shortDescription ||
      product.description ||
      `${product.name} available at Arihant Cables — Authorised Polycab Distributor, Mumbai.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductDetail(params.slug);
  if (!product) notFound();

  return (
    <>
      <Breadcrumbs
        variant="bar"
        items={[...product.breadcrumb, { name: product.name }]}
      />

      {/* Product */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <Reveal zoom className="rounded-2xl border border-slate-100 bg-slate-50 p-8 flex items-center justify-center aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </Reveal>

            {/* Info */}
            <Reveal delay="delay-150">
              <h1 className="text-2xl md:text-3xl font-heading font-black text-navy-950 mb-3 leading-tight">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-primary-600 font-semibold mb-5">{product.shortDescription}</p>
              )}

              {(product.size || product.length) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.size && <span className="badge-primary">{product.size}</span>}
                  {product.length && <span className="badge-primary">{product.length}</span>}
                </div>
              )}

              {product.description && (
                <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
              )}

              {product.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-navy-950 mb-3">Highlights</h2>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-2">
                <Link href="/contact#inquiry" className="btn-primary">
                  Request Quote <ArrowRight size={16} />
                </Link>
                <a href="tel:+919819898469" className="btn-secondary">
                  <Phone size={16} /> Call Now
                </a>
                {product.datasheetUrl && (
                  <a
                    href={product.datasheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Download size={16} /> Data Sheet
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Specifications */}
          {product.specs.length > 0 && (
            <Reveal className="mt-16 max-w-2xl">
              <h2 className="font-heading font-bold text-navy-950 text-xl mb-4">Specifications</h2>
              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={`${s.label}-${i}`} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                        <th className="text-left font-semibold text-navy-950 px-5 py-3 w-1/3">
                          {s.label}
                        </th>
                        <td className="px-5 py-3 text-slate-600">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
