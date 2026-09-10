import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Star } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Zulf Care Herbal Hair Oil" },
      {
        name: "description",
        content:
          "Shop the Zulf Care herbal hair oil — a powerful blend of 15+ herbal ingredients for hair fall protection, volume and shine.",
      },
      { property: "og:title", content: "Shop — Zulf Care Herbal Hair Oil" },
      {
        property: "og:description",
        content: "One bottle, fifteen herbs, zero shortcuts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-primary">
            Zulf <span className="italic">Care</span>
          </Link>
          <Link
            to="/cart"
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Cart
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          The Collection
        </p>
        <h1 className="text-4xl font-medium text-primary md:text-5xl">
          One oil. <span className="italic">Everything your hair needs.</span>
        </h1>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/product"
            className="group overflow-hidden rounded-3xl border border-border bg-card transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Placeholder image — real product photos to be provided */}
            <div className="aspect-square overflow-hidden">
              <img
                src="/images/bottle.webp"
                alt="Zulf Care herbal hair oil, 100ml bottle"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                Herbal Hair Oil — 100 ml
              </h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
                15+ herbal ingredients
              </p>
              <p className="mt-4 text-lg font-medium text-primary">Rs. 1,499</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
