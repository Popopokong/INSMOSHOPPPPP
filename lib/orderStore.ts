function genOrderId() {
  const now = new Date();
  const ymd = now.toISOString().slice(0,10).replace(/-/g,"");
  const rand = Math.random().toString(36).substring(2,8).toUpperCase();
  return `ORD-${ymd}-${rand}`;
}

type Order = { id: string; status: "created"|"paid"|"canceled"|"cash"; amount: number };
const orders = new Map<string, Order>();

export const OrderStore = {
  create(amount: number) {
    const id = genOrderId();
    orders.set(id, { id, status: "created", amount });
    return id;
  },
  markPaid(id: string) { if (orders.has(id)) orders.get(id)!.status="paid"; },
  markCash(id: string) { if (orders.has(id)) orders.get(id)!.status="cash"; },
  get(id: string) { return orders.get(id); },
};
