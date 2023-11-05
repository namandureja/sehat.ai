"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex items-center justify-between max-w-5xl mx-auto h-screen">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <HeartPulse className="w-8 h-8 text-blu" />
          <h1 className="text-2xl font-semibold text-blu">Sehat</h1>
        </div>
        <p className=" mt-2 text-lg text-dark-gray text-left">
          Your health, your way - harness the future of diagnostics with our AI
          disease prediction tool.
        </p>
        <Link href="/start">
          <Button className="mt-5">Get Started</Button>
        </Link>
      </div>
      <Lottie
        className="w-[600px]"
        animationData={require("../components/home.json")}
        loop
      />
    </section>
  );
}
