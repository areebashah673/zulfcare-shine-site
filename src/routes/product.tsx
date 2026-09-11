import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/lib/cart";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Herbal Hair Oil 100 ml — Zulf Care" },
      {
        name: "description",
        content:
          "Zulf Care herbal hair oil, 100 ml — a powerful blend of 15+ herbal ingredients. Hair fall protection, volume, shine. Mineral oil & paraben free.",
      },
      { property: "og:title", content: "Herbal Hair Oil 100 ml — Zulf Care" },
      {
        property: "og:description",
        content: "A powerful blend of 15+ herbal ingredients. Because your hair deserves real care.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductPage,
});

// Placeholder images — final product photos to be provided
const gallery = [
  { src: "/images/bottle.webp", alt: "Zulf Care herbal hair oil bottle, 100 ml" },
  { src: "/images/box.webp", alt: "Zulf Care bottle beside its signature kraft box" },
  { src: "/images/zulfcare.webp", alt: "Glossy dark braid wrapped around a Zulf Care bottle" },
];

function ProductPage() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-primary">
            Zulf <span className="italic">Care</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">
              Shop
            </Link>
            <Link
              to="/cart"
              className="rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={gallery[active]!.src}
              alt={gallery[active]!.alt}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-4">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-colors ${
                  active === i ? "border-primary" : "border-border opacity-70 hover:opacity-100"
                }`}
              >
                <img src={g.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Zulf Care • 100 ml
          </p>
          <h1 className="mt-3 text-4xl font-medium text-primary md:text-5xl">
            Herbal <span className="italic">Hair Oil</span>
          </h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            A powerful blend of 15+ herbal ingredients, handpicked and bottled
            the traditional way. Strengthens roots, restores shine, and repairs
            dry, split ends — with zero mineral oil, parabens, or shortcuts.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
              Hair fall protection & root strengthening
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
              Visible volume and natural shine
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-primary" strokeWidth={1.5} />
              Mineral oil free • Paraben free
            </li>
            <li className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" strokeWidth={1.5} />
              Free delivery on orders over Rs. 3,000
            </li>
          </ul>

          <p className="mt-8 text-3xl font-medium text-primary">Rs. 1,499</p>

          <div className="mt-6 flex items-center gap-5">
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-3 text-muted-foreground hover:text-primary"
              >
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-3 text-muted-foreground hover:text-primary"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(
                  {
                    id: "oil-100",
                    name: "Herbal Hair Oil",
                    variant: "100 ml bottle",
                    price: 1499,
                    image: "/images/bottle.webp",
                  },
                  qty,
                );
                navigate({ to: "/cart" });
              }}
              className="flex-1 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Add to Cart — Rs. {(1499 * qty).toLocaleString()}
            </button>
          </div>

          <Link
            to="/shop"
            className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            ← Back to shop
          </Link>
        </div>
      </main>
    </div>
  );
}
