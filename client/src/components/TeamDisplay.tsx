/**
 * Neo-Brutalism Design: Team result display
 * Shows balanced teams with scores
 */

import { Player } from "@/lib/tiers";
import { getTierDisplayName } from "@/lib/tiers";

interface TeamDisplayProps {
  teamName: string;
  players: Player[];
  totalScore: number;
  bgColor: "blue" | "red";
}

export function TeamDisplay({
  teamName,
  players,
  totalScore,
  bgColor,
}: TeamDisplayProps) {
  const bgClass = bgColor === "blue" ? "bg-secondary" : "bg-accent";
  const textClass =
    bgColor === "blue" ? "text-secondary-foreground" : "text-accent-foreground";

  return (
    <div className="space-y-4">
      <div
        className={`${bgClass} ${textClass} neo-border-thick neo-shadow-lg p-6 text-center`}
      >
        <h2 className="text-4xl font-black mb-2">{teamName}</h2>
        <div className="text-6xl font-black">{totalScore}</div>
        <div className="text-sm font-bold uppercase tracking-wider mt-1">
          Total Score
        </div>
      </div>

      <div className="space-y-3">
        {players.map((player, idx) => (
          <div
            key={player.id}
            className="bg-card neo-border neo-shadow-sm p-4 hover:neo-shadow transition-all"
            style={{
              transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-bold text-lg">{player.name}</div>
                <div className="text-sm text-muted-foreground font-medium">
                  {getTierDisplayName(player.tier)}{" "}
                  {player.division && player.division}
                </div>
              </div>
              <div className="bg-primary text-primary-foreground neo-border px-4 py-2 font-black text-2xl">
                {player.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
