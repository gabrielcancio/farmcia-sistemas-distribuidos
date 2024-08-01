"use client"

import { FormEvent, useState } from "react";

export default function Home() {
  const [empCode, setEmpCode] = useState(0);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ id: empCode })
    });

    const json = await response.json();
    console.log(json);
  }
  return (

<div className="flex items-center justify-center h-screen bg-background">
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
    <div className="flex flex-col p-6 space-y-1 text-center">
      <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Bem vindo</h3>
      <p className="text-sm text-muted-foreground">Entre com o seu código de funcionário para fazer o login</p>
    </div>
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <span
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Código de funcionário
        </span>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          placeholder="0000000"
          required={true}
          type="text"
          onChange={(e) => setEmpCode(Number(e.target.value))}
        />
      </div>
    </div>
    <div className="flex items-center p-6">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Sign in
      </button>
    </div>
  </div>
</div>
  );
}
