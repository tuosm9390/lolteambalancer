/**
 * Neo-Brutalism Design: Player input card with rotation effect
 * Bold colors, thick borders, hard shadows
 */

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIERS } from "@/lib/tiers";
import { X } from "lucide-react";

interface PlayerCardProps {
  index: number;
  name: string;
  tier: string;
  division: string;
  onNameChange: (value: string) => void;
  onTierChange: (value: string) => void;
  onDivisionChange: (value: string) => void;
  onRemove: () => void;
  rotation: number;
}

export function PlayerCard({
  index,
  name,
  tier,
  division,
  onNameChange,
  onTierChange,
  onDivisionChange,
  onRemove,
  rotation,
}: PlayerCardProps) {
  const selectedTier = TIERS.find((t) => t.name === tier);
  const hasDivisions = selectedTier && selectedTier.divisions.length > 1;

  return (
    <div
      className="relative bg-card neo-border neo-shadow p-4 transition-all hover:neo-shadow-lg active:translate-x-1 active:translate-y-1 active:neo-shadow-sm"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s",
      }}
    >
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-accent text-accent-foreground neo-border rounded-full p-1 hover:scale-110 transition-transform"
        aria-label="플레이어 제거"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">#{index + 1}</span>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
            소환사명
          </label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="이름 입력"
            className="neo-border bg-background font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
            티어
          </label>
          <Select value={tier} onValueChange={onTierChange}>
            <SelectTrigger className="neo-border bg-background font-medium">
              <SelectValue placeholder="티어 선택" />
            </SelectTrigger>
            <SelectContent>
              {TIERS.map((t) => (
                <SelectItem key={t.name} value={t.name}>
                  {t.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasDivisions && (
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
              디비전
            </label>
            <Select value={division} onValueChange={onDivisionChange}>
              <SelectTrigger className="neo-border bg-background font-medium">
                <SelectValue placeholder="디비전 선택" />
              </SelectTrigger>
              <SelectContent>
                {selectedTier.divisions.map((d) => (
                  <SelectItem key={d.name} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
