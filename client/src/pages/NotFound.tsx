import React from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedLayout from "@/components/SharedLayout";

export default function NotFound() {
  return (
    <SharedLayout activeSite="lead-gen">
      <div className="container py-24 flex flex-col items-center justify-center text-center flex-1">
        <div className="bg-primary text-primary-foreground neo-border p-4 neo-shadow-black mb-6">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white uppercase tracking-tighter mb-4">
          404: Spark Extinguished
        </h1>
        <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider max-w-md mb-8">
          The coordinate you requested does not exist in our cultural conduit. Return to base before your connection drops.
        </p>
        <Link href="/">
          <Button className="font-display font-extrabold text-sm uppercase bg-accent text-accent-foreground neo-border neo-shadow-black hover:neo-shadow-pink transition-all duration-150 rounded-none h-12 px-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to yourSPRK.com
          </Button>
        </Link>
      </div>
    </SharedLayout>
  );
}
