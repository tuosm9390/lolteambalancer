/**
 * Neo-Brutalism Design: LOL Team Balancer
 * Tier system types and constants
 */

export interface Tier {
  name: string;
  displayName: string;
  divisions: Division[];
  color: string;
}

export interface Division {
  name: string;
  score: number;
}

export interface Player {
  id: string;
  name: string;
  tier: string;
  division: string;
  score: number;
}

export interface TeamResult {
  teamA: Player[];
  teamB: Player[];
  scoreA: number;
  scoreB: number;
  difference: number;
}

// LOL Tier System with scores
export const TIERS: Tier[] = [
  {
    name: "IRON",
    displayName: "아이언",
    color: "#71797E",
    divisions: [
      { name: "IV", score: 1 },
      { name: "III", score: 2 },
      { name: "II", score: 3 },
      { name: "I", score: 4 },
    ],
  },
  {
    name: "BRONZE",
    displayName: "브론즈",
    color: "#CD7F32",
    divisions: [
      { name: "IV", score: 5 },
      { name: "III", score: 6 },
      { name: "II", score: 7 },
      { name: "I", score: 8 },
    ],
  },
  {
    name: "SILVER",
    displayName: "실버",
    color: "#C0C0C0",
    divisions: [
      { name: "IV", score: 9 },
      { name: "III", score: 10 },
      { name: "II", score: 11 },
      { name: "I", score: 12 },
    ],
  },
  {
    name: "GOLD",
    displayName: "골드",
    color: "#FFD700",
    divisions: [
      { name: "IV", score: 13 },
      { name: "III", score: 14 },
      { name: "II", score: 15 },
      { name: "I", score: 16 },
    ],
  },
  {
    name: "PLATINUM",
    displayName: "플래티넘",
    color: "#00CED1",
    divisions: [
      { name: "IV", score: 17 },
      { name: "III", score: 18 },
      { name: "II", score: 19 },
      { name: "I", score: 20 },
    ],
  },
  {
    name: "EMERALD",
    displayName: "에메랄드",
    color: "#50C878",
    divisions: [
      { name: "IV", score: 21 },
      { name: "III", score: 22 },
      { name: "II", score: 23 },
      { name: "I", score: 24 },
    ],
  },
  {
    name: "DIAMOND",
    displayName: "다이아몬드",
    color: "#B9F2FF",
    divisions: [
      { name: "IV", score: 25 },
      { name: "III", score: 26 },
      { name: "II", score: 27 },
      { name: "I", score: 28 },
    ],
  },
  {
    name: "MASTER",
    displayName: "마스터",
    color: "#9D4EDD",
    divisions: [{ name: "", score: 29 }],
  },
  {
    name: "GRANDMASTER",
    displayName: "그랜드마스터",
    color: "#DC143C",
    divisions: [{ name: "", score: 30 }],
  },
  {
    name: "CHALLENGER",
    displayName: "챌린저",
    color: "#F77F00",
    divisions: [{ name: "", score: 31 }],
  },
];

// Helper function to get score from tier and division
export function getScore(tierName: string, divisionName: string): number {
  const tier = TIERS.find((t) => t.name === tierName);
  if (!tier) return 0;

  const division = tier.divisions.find((d) => d.name === divisionName);
  return division?.score || 0;
}

// Helper function to get tier display name
export function getTierDisplayName(tierName: string): string {
  const tier = TIERS.find((t) => t.name === tierName);
  return tier?.displayName || tierName;
}
