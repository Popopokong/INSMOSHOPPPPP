'use client';
import { useSearchParams } from 'next/navigation';

export default function Cancel() {
  const sp = useSearchParams();
  const orderId = sp.get('order');

  return (
    <main style={{padding:'24px', maxWidth:600, margin:'0 auto'}}>
      <h1 style={{fontSize:20, fontWeight:600, marginBottom:12}}>Payment canceled</h1>
      <p>Order ID: <span style={{fontFamily:'Menlo, monospace'}}>{orderId}</span></p>
      <p>You can go back and try again.</p>
    </main>
  );
}
