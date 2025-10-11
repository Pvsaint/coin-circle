"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoIcon, ArrowRight, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function CreateRoscaForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    groupName: "",
    contributionAmount: "",
    token: "USDC",
    numberOfMembers: "",
    frequency: "weekly",
    collateral: "",
    description: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCycleLength = () => {
    const members = Number.parseInt(formData.numberOfMembers) || 0;
    const frequencyMap: Record<string, string> = {
      weekly: "weeks",
      "bi-weekly": "weeks",
      monthly: "months",
    };
    const multiplier = formData.frequency === "bi-weekly" ? 2 : 1;
    const duration = members * multiplier;
    return `${duration} ${frequencyMap[formData.frequency] || "periods"}`;
  };

  const totalPot = () => {
    const amount = Number.parseFloat(formData.contributionAmount) || 0;
    const members = Number.parseInt(formData.numberOfMembers) || 0;
    return (amount * members).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would interact with smart contracts
    console.log("Creating ROSCA with data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
                  step >= s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${
                    step > s ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="min-w-3xl flex justify-between text-sm">
          <span
            className={
              step >= 1
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }
          >
            Basic Info
          </span>
          <span
            className={
              step >= 2
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }
          >
            Parameters
          </span>
          <span
            className={
              step >= 3
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }
          >
            Review
          </span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Give your ROSCA group a name and description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name *</Label>
              <Input
                id="groupName"
                placeholder="e.g., Family Savings, Startup Seed Fund"
                value={formData.groupName}
                onChange={(e) => updateField("groupName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose and rules of your ROSCA group..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Help potential members understand your group's goals
              </p>
            </div>

            <Button
              type="button"
              onClick={() => setStep(2)}
              className="w-full gap-2"
              disabled={!formData.groupName}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Group Parameters</CardTitle>
            <CardDescription>
              Set the contribution amount, frequency, and member count
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contributionAmount">
                  Contribution Amount *
                </Label>
                <Input
                  id="contributionAmount"
                  type="number"
                  step="0.01"
                  placeholder="100"
                  value={formData.contributionAmount}
                  onChange={(e) =>
                    updateField("contributionAmount", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token">Token *</Label>
                <Select
                  value={formData.token}
                  onValueChange={(value) => updateField("token", value)}
                >
                  <SelectTrigger id="token">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="STRK">STRK</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="numberOfMembers">Number of Members *</Label>
                <Input
                  id="numberOfMembers"
                  type="number"
                  min="2"
                  max="20"
                  placeholder="5"
                  value={formData.numberOfMembers}
                  onChange={(e) =>
                    updateField("numberOfMembers", e.target.value)
                  }
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Between 2 and 20 members
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Contribution Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => updateField("frequency", value)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>Cycle Length:</strong> {calculateCycleLength()} for{" "}
                {formData.numberOfMembers || "all"} members
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="collateral">Collateral Amount (Optional)</Label>
              <Input
                id="collateral"
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.collateral}
                onChange={(e) => updateField("collateral", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Security deposit returned after successful completion
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 gap-2"
                disabled={
                  !formData.contributionAmount ||
                  !formData.numberOfMembers ||
                  Number.parseInt(formData.numberOfMembers) < 2
                }
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Create</CardTitle>
            <CardDescription>
              Review your ROSCA details before creating
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/50 p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {formData.groupName}
                </h3>
                {formData.description && (
                  <p className="text-sm text-muted-foreground mb-4 text-balance">
                    {formData.description}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Contribution</p>
                  <p className="text-lg font-semibold">
                    {formData.contributionAmount} {formData.token}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="text-lg font-semibold capitalize">
                    {formData.frequency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-lg font-semibold">
                    {formData.numberOfMembers}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pot</p>
                  <p className="text-lg font-semibold">
                    {totalPot()} {formData.token}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cycle Length</p>
                  <p className="text-lg font-semibold">
                    {calculateCycleLength()}
                  </p>
                </div>
                {formData.collateral && (
                  <div>
                    <p className="text-sm text-muted-foreground">Collateral</p>
                    <p className="text-lg font-semibold">
                      {formData.collateral} {formData.token}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Creating this ROSCA will deploy a smart contract on Starknet.
                Make sure all details are correct.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Create ROSCA Group
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
