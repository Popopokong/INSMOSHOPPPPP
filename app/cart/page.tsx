'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';

export default function CartPage() {
  const sp = useSearchParams();
  const cart = useMemo(() => JSON.parse(sp.get('c') ?? '{}'), [sp]);
  const [loading, setLoading] = useState(false);

  const items = Object.entries(cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id===id)!, qty: Number(qty) }))
    .filter(x => x.product && x.qty>0);

  const total = items.reduce((s,x)=>s+x.product.price*x.qty,0);

  const payOnline = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ total, method:"online", items }),
    });
    const data = await res.json();
    if (data.url) window.location.href=data.url;
  };

  const payAtStore = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method:'POST',
      body: JSON.stringify({ total, method:"cash", items }),
    });
    const data = await res.json();
    window.location.href = `/success?order=${data.orderId}&method=cash`;
  };

  return (
    <main style={{padding:'24px', maxWidth: 700, margin:'0 auto'}}>
      <h2 style={{fontSize:20, fontWeight:600, marginBottom:16}}>Your Cart</h2>
      <ul style={{display:'grid', gap:8}}>
        {items.map(x=>(
          <li key={x.product.id} style={{display:'flex', justifyContent:'space-between', border:'1px solid #e5e7eb', borderRadius:12, padding:'8px 12px'}}>
            <div>{x.product.name} × {x.qty}</div>
            <div>{((x.product.price*x.qty)/100).toFixed(2)} THB</div>
          </li>
        ))}
      </ul>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:12, fontSize:18}}>
        <div>Total</div><div>{(total/100).toFixed(2)} THB</div>
      </div>

      <div style={{marginTop:24, display:'grid', gap:12}}>
        <button onClick={payOnline} disabled={loading||total<=0}
          style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:12, padding:'12px 16px'}}>
          Pay Online
        </button>
        <button onClick={payAtStore} disabled={loading||total<=0}
          style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:12, padding:'12px 16px'}}>
          Pay at Store
        </button>
      </div>
    </main>
  );
}
