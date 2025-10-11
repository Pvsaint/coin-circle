import { Header } from "@/components/header";
import { CreateRoscaForm } from "@/components/create-rosca-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 px-32">
        <Button variant="ghost" className="gap-2 mb-4" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Create New ROSCA Group
          </h1>
          <p className="text-lg text-muted-foreground">
            Set up your decentralized savings circle in just a few steps
          </p>
        </div>
        <CreateRoscaForm />
      </main>
    </div>
  );
}
