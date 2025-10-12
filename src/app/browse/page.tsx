import { Header } from "@/components/header";
import { RoscaCard } from "@/components/rosca-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function BrowsePage() {
  // Mock data - in production, this would come from smart contracts
  const allGroups = [
    {
      id: "1",
      name: "Family Savings Circle",
      contributionAmount: "100",
      token: "USDC",
      members: 3,
      maxMembers: 5,
      frequency: "weekly",
      status: "open" as const,
      description: "Save together for family goals and emergencies",
    },
    {
      id: "2",
      name: "Startup Seed Fund",
      contributionAmount: "0.05",
      token: "ETH",
      members: 7,
      maxMembers: 10,
      frequency: "monthly",
      status: "open" as const,
      description: "Pool resources for entrepreneurial ventures",
    },
    {
      id: "3",
      name: "Community Development",
      contributionAmount: "50",
      token: "USDC",
      members: 8,
      maxMembers: 8,
      frequency: "bi-weekly",
      status: "full" as const,
      description: "Supporting local community projects together",
    },
    {
      id: "4",
      name: "Education Fund",
      contributionAmount: "200",
      token: "USDC",
      members: 4,
      maxMembers: 6,
      frequency: "monthly",
      status: "open" as const,
      description: "Saving for educational expenses and courses",
    },
    {
      id: "5",
      name: "Emergency Reserve",
      contributionAmount: "150",
      token: "DAI",
      members: 10,
      maxMembers: 10,
      frequency: "weekly",
      status: "active" as const,
      description: "Building emergency funds as a community",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Browse CoinCircle Groups
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Find and join savings circles that match your goals
          </p>
        </div>

        <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-9 h-10 sm:h-11" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-tokens">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-tokens">All Tokens</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="dai">DAI</SelectItem>
                <SelectItem value="strk">STRK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allGroups.map((group) => (
            <RoscaCard key={group.id} {...group} />
          ))}
        </div>
      </main>
    </div>
  );
}