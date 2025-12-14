"use client";
import { Suspense } from "react";
import HomeClient from "./components/HomeClient";

export default function Home() {

    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <HomeClient></HomeClient>
      </Suspense>
    );
}

