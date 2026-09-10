import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Leaf, Sparkles, Droplets, ShieldCheck, HeartHandshake, ShoppingBag } from "lucide-react";

const z1Asset = { url: "/images/z1.webp" };
const z2Asset = { url: "/images/z2.webp" };
const braidAsset = { url: "/images/zulfcare.webp" };
const bottleAsset = { url: "/images/bottle.webp" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zulf Care — Herbal Hair Oil | Pure • Natural • Radiant" },
      {
        name: "description",
        content:
          "Zulf Care herbal hair oil — a powerful blend of 15+ herbal ingredients. Hair fall protection, volume and shine. Mineral oil & paraben free.",
      },
      { property: "og:title", content: "Zulf Care — Herbal Hair Oil" },
      {
        property: "og:description",
        content:
          "A powerful blend of 15+ herbal ingredients. Because your hair deserves real care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  {
    icon: ShieldCheck,
    title: "Hair Fall Protection",
    text: "Strengthens roots and reduces breakage with time-tested herbs.",
  },
  {
    icon: Sparkles,
    title: "Volume & Shine",
    text: "Restores natural lustre and body to dull, tired hair.",
  },
  {
    icon: Droplets,
    title: "Repairs Dry & Split Ends",
    text: "Deep nourishment that seals moisture into every strand.",
  },
  {
    icon: Leaf,
    title: "Pure Herbs Only",
    text: "Mineral oil free, paraben free, no harmful chemicals.",
  },
];

const steps = [
  {
    n: "01",
    title: "Warm",
    text: "Warm a few drops of oil between your palms.",
  },
  {
    n: "02",
    title: "Massage",
    text: "Gently massage into the scalp in slow, circular motions.",
  },
  {
    n: "03",
    title: "Rest",
    text: "Leave for 30 minutes or overnight, then wash as usual.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-serif text-2xl font-semibold tracking-wide text-primary">
            Zulf <span className="italic">Care</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm tracking-wide text-muted-foreground md:flex">
            <a href="#benefits" className="transition-colors hover:text-primary">Benefits</a>
            <a href="#ritual" className="transition-colors hover:text-primary">The Ritual</a>
            <a href="#ingredients" className="transition-colors hover:text-primary">Ingredients</a>
            <Link
              to="/cart"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="grid min-h-screen items-center gap-10 px-6 pt-28 pb-16 md:grid-cols-2 lg:mx-auto lg:max-w-6xl">
        <div className="fade-up">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Pure • Natural • Radiant
          </p>
          <h1 className="text-5xl font-medium leading-[1.05] text-primary md:text-7xl">
            Because your hair deserves <span className="italic">real care</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            A powerful blend of 15+ herbal ingredients, handpicked and bottled the
            traditional way — the ritual your grandmother swore by.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Shop Herbal Hair Oil
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium tracking-wide text-primary underline-offset-4 hover:underline"
            >
              Discover the blend
            </a>
          </div>
        </div>
        <div className="fade-up overflow-hidden rounded-3xl shadow-2xl" style={{ animationDelay: "0.15s" }}>
          <img
            src={z1Asset.url}
            alt="Woman with long radiant hair holding a bottle of Zulf Care herbal hair oil"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            The Blend
          </p>
          <h2 className="max-w-xl text-4xl font-medium text-primary md:text-5xl">
            Add volume <span className="italic">& shine</span> to your hair
          </h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-card p-7 transition-transform hover:-translate-y-1"
              >
                <b.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-2xl font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual — full bleed image + steps */}
      <section id="ritual" className="grid items-stretch md:grid-cols-2">
        <div className="min-h-[420px]">
          <img
            src={z2Asset.url}
            alt="Mother gently oiling her daughter's long curly hair with Zulf Care"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center bg-leaf px-8 py-20 text-leaf-foreground md:px-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] opacity-70">
            A Ritual Passed Down
          </p>
          <h2 className="text-4xl font-medium md:text-5xl">
            A powerful blend of <span className="italic">15+ herbal</span> ingredients
          </h2>
          <div className="mt-12 space-y-8">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="font-serif text-3xl italic text-gold">{s.n}</span>
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed opacity-80">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients strip */}
      <section id="ingredients" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={braidAsset.url}
                alt="A glossy dark braid wrapped around a bottle of Zulf Care herbal hair oil"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
                What's Inside
              </p>
              <h2 className="text-4xl font-medium text-primary md:text-5xl">
                With the purest form of <span className="italic">herbs</span>
              </h2>
              <ul className="mt-10 space-y-5">
                {[
                  "Handpicked natural herbs",
                  "Mineral oil free",
                  "Paraben free",
                  "No harmful chemicals",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-lg">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                      <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Shop / product */}
      <section id="shop" className="bg-cream px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              100 ml Bottle
            </p>
            <h2 className="text-4xl font-medium text-primary md:text-5xl">
              Zulf Care <span className="italic">Herbal Hair Oil</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              One bottle, fifteen herbs, zero shortcuts. Thoughtfully packed in
              our signature kraft box — because real care shows in the details.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <HeartHandshake className="h-5 w-5 text-primary" strokeWidth={1.5} />
              Made with love, in small batches
            </div>
            <Link
              to="/cart"
              className="mt-10 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Add to Cart
            </Link>
          </div>
          <div className="order-1 overflow-hidden rounded-3xl shadow-xl md:order-2">
            <img
              src={bottleAsset.url}
              alt="Zulf Care herbal hair oil bottle, 100ml, mineral oil and paraben free"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-leaf px-6 py-14 text-leaf-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <p className="font-serif text-3xl font-semibold">
            Zulf <span className="italic">Care</span>
          </p>
          <p className="text-xs uppercase tracking-[0.35em] opacity-70">
            Pure • Natural • Radiant
          </p>
          <p className="text-sm opacity-60">© {new Date().getFullYear()} Zulf Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
