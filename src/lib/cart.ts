export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
};

const KEY = "zulfcare-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "qty">, qty: number) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  saveCart(cart);
}

export function clearCart() {
  window.localStorage.removeItem(KEY);
}
