'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import Link from 'next/link';

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const add = (id: string) =>
    setCart(c => ({ ...c, [id]: (c[id] ?? 0) + 1 }));

  const totalQty = Object.values(cart).reduce((a,b)=>a+b,0);

  return (
    <main style={{padding:'24px', maxWidth: 900, margin: '0 auto'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24}}>
        <h1 style={{fontSize: 20, fontWeight: 600}}>My Mini Shop</h1>
        <Link href={{ pathname: '/cart', query: { c: JSON.stringify(cart) } }}>
          Cart ({totalQty})
        </Link>
      </header>

      <ul style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16}}>
        {PRODUCTS.map(p => (
          <li key={p.id} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
            <div style={{fontWeight:500}}>{p.name}</div>
            <div style={{opacity:0.7, marginBottom:12}}>{(p.price/100).toFixed(2)} THB</div>
            <button onClick={()=>add(p.id)} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:'8px 12px'}}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
