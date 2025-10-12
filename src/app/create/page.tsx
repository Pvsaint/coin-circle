import { Header } from "@/components/header";
import { CreateRoscaForm } from "@/components/create-rosca-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <Button variant="ghost" className="gap-2 mb-4 -ml-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Create New ROSCA Group
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            Set up your decentralized savings circle in just a few steps
          </p>
        </div>
        <CreateRoscaForm />
      </main>
    </div>
  );
}
