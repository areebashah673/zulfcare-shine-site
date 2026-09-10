import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Minus,
  Plus,
  Trash2,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Banknote,
  Landmark,
  Copy,
  Check,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Zulf Care Herbal Hair Oil" },
      {
        name: "description",
        content:
          "Review your Zulf Care herbal hair oil order — 100ml bottles of pure, mineral oil free hair oil with free delivery over Rs. 3000.",
      },
      { property: "og:title", content: "Your Cart — Zulf Care" },
      {
        property: "og:description",
        content: "Review your Zulf Care herbal hair oil order and checkout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

const initialItems = [
  {
    id: "oil-100",
    name: "Herbal Hair Oil",
    variant: "100 ml bottle",
    price: 1450,
    qty: 1,
    image: "/images/bottle.webp",
  },
  {
    id: "gift-box",
    name: "Signature Kraft Gift Box",
    variant: "Oil + wooden comb",
    price: 2200,
    qty: 1,
    image: "/images/box.webp",
  },
];

const rupees = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

const BANK_DETAILS = {
  bank: "Habib Bank Limited (HBL)",
  title: "Zulf Care",
  account: "12345678901234",
  iban: "PK36HABL0000123456789012",
};

type PaymentMethod = "cod" | "bank";

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  address: z.string().trim().min(8, "Please enter your full address").max(300),
  zip: z
    .string()
    .trim()
    .regex(/^\d{4,10}$/, "Enter a valid zip / postal code"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[+0-9][0-9\s-]{8,17}$/, "Enter a valid WhatsApp number"),
});

type Details = z.infer<typeof detailsSchema>;

const emptyDetails: Details = {
  name: "",
  email: "",
  address: "",
  zip: "",
  whatsapp: "",
};

function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [placed, setPlaced] = useState(false);

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    );

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );
  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 250;
  const bankDiscount = paymentMethod === "bank" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - bankDiscount;

  const copyToClipboard = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleCheckout = () => {
    const result = detailsSchema.safeParse(details);
    if (!result.success) {
      const next: Partial<Record<keyof Details, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Details;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      document
        .getElementById("delivery-details")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setErrors({});
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-primary">
              Zulf <span className="italic">Care</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf text-gold">
            <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
          </div>
          <h1 className="mt-8 font-serif text-4xl font-semibold text-primary md:text-5xl">
            Your order has been <span className="italic">placed</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Thank you, {details.name.split(" ")[0]}. Our agent will contact you shortly on your
            WhatsApp number to confirm the delivery.
          </p>

          <div className="mt-10 w-full rounded-3xl border border-border bg-card p-8 text-left">
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">WhatsApp</dt>
                <dd className="flex items-center gap-2 font-medium">
                  <MessageCircle className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  {details.whatsapp}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Payment</dt>
                <dd className="font-medium">
                  {paymentMethod === "bank" ? "Bank Transfer (10% off)" : "Cash on Delivery"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Delivering to</dt>
                <dd className="max-w-[60%] text-right font-medium">
                  {details.address}, {details.zip}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <dt className="text-muted-foreground">Total</dt>
                <dd className="font-serif text-2xl text-primary">{rupees(total)}</dd>
              </div>
            </dl>
            {paymentMethod === "bank" && (
              <p className="mt-6 rounded-2xl bg-muted p-4 text-xs text-muted-foreground">
                Please share your transfer receipt with our agent on WhatsApp so we can dispatch
                your order.
              </p>
            )}
          </div>

          <Link
            to="/"
            className="mt-10 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-serif text-2xl font-semibold tracking-wide text-primary">
            Zulf <span className="italic">Care</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Continue shopping
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Your Selection
        </p>
        <h1 className="text-4xl font-medium text-primary md:text-5xl">
          Shopping <span className="italic">Cart</span>
        </h1>

        {items.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-border bg-card p-16 text-center">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/"
              className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Browse the oil
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 sm:flex-row sm:items-center"
                >
                  <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={`${item.name} — ${item.variant}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-semibold text-foreground">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{item.variant}</p>
                    <p className="mt-3 text-lg text-primary">{rupees(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-border px-3 py-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.id, -1)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <span className="w-5 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(item.id, 1)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${item.name}`}
                      onClick={() => remove(item.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit space-y-6">
              <div className="rounded-3xl bg-leaf p-8 text-leaf-foreground">
                <h2 className="font-serif text-3xl font-semibold">Order Summary</h2>
                <dl className="mt-8 space-y-4 text-sm">
                  <div className="flex justify-between opacity-80">
                    <dt>Subtotal</dt>
                    <dd>{rupees(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <dt>Delivery</dt>
                    <dd>{shipping === 0 ? "Free" : rupees(shipping)}</dd>
                  </div>
                  {bankDiscount > 0 && (
                    <div className="flex justify-between text-gold">
                      <dt>Bank transfer discount (10%)</dt>
                      <dd>-{rupees(bankDiscount)}</dd>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between border-t border-leaf-foreground/20 pt-5 text-lg">
                    <dt className="font-medium">Total</dt>
                    <dd className="font-serif text-2xl text-gold">
                      {rupees(total)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] opacity-70">
                    Choose payment method
                  </p>

                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                      paymentMethod === "cod"
                        ? "border-gold bg-gold/10"
                        : "border-leaf-foreground/20 bg-leaf-foreground/5 hover:bg-leaf-foreground/10"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        paymentMethod === "cod" ? "bg-gold text-leaf" : "bg-leaf-foreground/10"
                      }`}
                    >
                      <Banknote className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-xs opacity-70">Pay when your order arrives</p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "cod"
                          ? "border-gold bg-gold"
                          : "border-leaf-foreground/40"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <Check className="h-3.5 w-3.5 text-leaf" strokeWidth={3} />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                      paymentMethod === "bank"
                        ? "border-gold bg-gold/10"
                        : "border-leaf-foreground/20 bg-leaf-foreground/5 hover:bg-leaf-foreground/10"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        paymentMethod === "bank" ? "bg-gold text-leaf" : "bg-leaf-foreground/10"
                      }`}
                    >
                      <Landmark className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-xs opacity-70">Get 10% off — pay via bank deposit</p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "bank"
                          ? "border-gold bg-gold"
                          : "border-leaf-foreground/40"
                      }`}
                    >
                      {paymentMethod === "bank" && (
                        <Check className="h-3.5 w-3.5 text-leaf" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                </div>

                {paymentMethod === "bank" && (
                  <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-5">
                    <p className="mb-4 text-sm font-medium text-gold">
                      Transfer the total to this account and share the receipt on WhatsApp:
                    </p>
                    <dl className="space-y-3 text-sm">
                      {[
                        { label: "Bank", value: BANK_DETAILS.bank, key: "bank" },
                        { label: "Account Title", value: BANK_DETAILS.title, key: "title" },
                        { label: "Account Number", value: BANK_DETAILS.account, key: "account" },
                        { label: "IBAN", value: BANK_DETAILS.iban, key: "iban" },
                      ].map(({ label, value, key }) => (
                        <div
                          key={key}
                          className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <dt className="opacity-70">{label}</dt>
                          <dd className="flex items-center gap-2 font-medium">
                            <span className="break-all">{value}</span>
                            <button
                              onClick={() => copyToClipboard(key, value)}
                              aria-label={`Copy ${label}`}
                              className="shrink-0 text-gold transition-opacity hover:opacity-70"
                            >
                              {copiedField === key ? (
                                <Check className="h-4 w-4" strokeWidth={2} />
                              ) : (
                                <Copy className="h-4 w-4" strokeWidth={1.5} />
                              )}
                            </button>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <button className="mt-8 w-full rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-leaf transition-transform hover:-translate-y-0.5">
                  {paymentMethod === "bank" ? "I’ve Paid via Bank Transfer" : "Place Order (COD)"}
                </button>

                <ul className="mt-8 space-y-3 text-sm opacity-75">
                  <li className="flex items-center gap-3">
                    <Truck className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    Free delivery on orders over Rs. 3,000
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    Cash on delivery available
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>

      <footer className="bg-leaf px-6 py-14 text-leaf-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
          <p className="font-serif text-3xl font-semibold">
            Zulf <span className="italic">Care</span>
          </p>
          <p className="text-xs uppercase tracking-[0.35em] opacity-70">
            Pure • Natural • Radiant
          </p>
        </div>
      </footer>
    </div>
  );
}
