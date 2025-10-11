// types.ts

export interface Member {
  id: string;
  name: string;
  contribution: number; // The agreed-upon amount per round
  payoutRound: number; // The round number in which the member receives the pot
  hasReceived: boolean;
}

export interface Group {
  name: string;
  potAmount: number; // Total amount collected in one round
  members: Member[];
  totalRounds: number;
  currentRound: number;
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
}