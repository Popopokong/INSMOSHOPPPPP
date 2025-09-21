'use client';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const sp = useSearchParams();
  const orderId = sp.get('order');
  const method = sp.get('method');

  return (
    <main style={{padding:'24px', maxWidth:600, margin:'0 auto'}}>
      <h1 style={{fontSize:20, fontWeight:600, marginBottom:12}}>Order Successful 🎉</h1>
      <p>Your Order ID: <span style={{fontFamily:'Menlo, monospace'}}>{orderId}</span></p>
      <p style={{marginTop:8}}>Payment Method: {method==="cash" ? "Pay at Store" : "Online Payment"}</p>
      {method==="cash" && <p style={{marginTop:8}}>Please pay at the store when you pick up your order.</p>}
    </main>
  );
}
