/**
 * Neo-Brutalism Design: LOL Team Balancer Main Page
 * Bold geometric shapes, thick borders, hard shadows, diagonal composition
 * Primary: Yellow (#FFD700), Secondary: Blue (#1E3A8A), Accent: Red (#DC2626)
 */

import { Button } from "@/components/ui/button";
import { PlayerCard } from "@/components/PlayerCard";
import { TeamDisplay } from "@/components/TeamDisplay";
import { balanceTeams } from "@/lib/balancer";
import { getScore, Player, TeamResult, TIERS } from "@/lib/tiers";
import { Plus, Shuffle } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamResult, setTeamResult] = useState<TeamResult | null>(null);

  // Random rotation for neo-brutalism collage effect
  const getRotation = (index: number) => {
    const rotations = [-3, -2, -1, 0, 1, 2, 3];
    return rotations[index % rotations.length];
  };

  const addPlayer = () => {
    if (players.length >= 10) {
      toast.error("최대 10명까지만 추가할 수 있습니다.");
      return;
    }

    const newPlayer: Player = {
      id: nanoid(),
      name: "",
      tier: "",
      division: "",
      score: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
    setTeamResult(null);
  };

  const updatePlayer = (
    id: string,
    field: keyof Player,
    value: string | number
  ) => {
    setPlayers(
      players.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };

          // Auto-calculate score when tier or division changes
          if (field === "tier" || field === "division") {
            const tier = field === "tier" ? (value as string) : p.tier;
            const division =
              field === "division" ? (value as string) : p.division;

            // Auto-select first division for single-division tiers
            if (field === "tier") {
              const selectedTier = TIERS.find((t) => t.name === tier);
              if (selectedTier && selectedTier.divisions.length === 1) {
                updated.division = selectedTier.divisions[0].name;
                updated.score = selectedTier.divisions[0].score;
              } else {
                updated.division = "";
                updated.score = 0;
              }
            } else {
              updated.score = getScore(tier, division);
            }
          }

          return updated;
        }
        return p;
      })
    );
    setTeamResult(null);
  };

  const handleBalance = () => {
    if (players.length !== 10) {
      toast.error("정확히 10명의 플레이어가 필요합니다.");
      return;
    }

    const hasEmptyNames = players.some((p) => !p.name.trim());
    if (hasEmptyNames) {
      toast.error("모든 플레이어의 이름을 입력해주세요.");
      return;
    }

    const hasInvalidTiers = players.some((p) => !p.tier || p.score === 0);
    if (hasInvalidTiers) {
      toast.error("모든 플레이어의 티어를 선택해주세요.");
      return;
    }

    try {
      const result = balanceTeams(players);
      setTeamResult(result);
      toast.success("팀이 성공적으로 배정되었습니다!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "팀 배정에 실패했습니다."
      );
    }
  };

  const handleReset = () => {
    setTeamResult(null);
    setPlayers([]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/hXyJZ5wgz8PcjNxHGIeJY8/sandbox/Te8wBFDBaB1FV7AvCXozdx-img-1_1771513571000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaFh5Slo1d2d6OFBjak54SEdJZUpZOC9zYW5kYm94L1RlOHdCRkRCYUIxRlY3QXZDWG96ZHgtaW1nLTFfMTc3MTUxMzU3MTAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rpaMHSHH-GQhxr1rHAxLPECfGCoO2tOGnjXMpjSrQnpxRE950wkhlgSvnlQkUidNFvNlgimuyR22wcOJ5vd2aRaHoq2B0PfYOIdSIiJI5jaogP1Y421xj32B7HOl9Ccdg1dHBiI23dxrsRqCXrzsrbfKpFiZ1eNHZceP5kNDBEYwimcHbiv-hXJJP~wUr3rTPTPfq72hoYayrGiMSCZgDdrpKTIM26zDU~Ee3rKN~QdZK6tw7HZ~G4sqxspt6LtAhRFyFDU~qi9DvwbnB3YMLQnEhgj2B3XgzgdHM4P4JP16McGdY8kRpFPigC60aoknpEcm9Slji6rSkyn3xRF1pA__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary text-primary-foreground neo-border-thick neo-shadow-lg px-8 py-4 mb-8 transform -rotate-2">
              <h1 className="text-5xl md:text-7xl font-black">
                LOL 내전 팀 밸런서
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground max-w-2xl mx-auto">
              10명의 플레이어를 티어 기반으로 공정하게 5:5 팀으로 나눕니다
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          {!teamResult ? (
            <>
              {/* Player Input Section */}
              <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-primary text-primary-foreground neo-border-thick neo-shadow p-6 mb-8 transform rotate-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-black mb-1">
                        플레이어 입력
                      </h2>
                      <p className="text-sm font-bold opacity-90">
                        {players.length} / 10명 입력됨
                      </p>
                    </div>
                    <Button
                      onClick={addPlayer}
                      disabled={players.length >= 10}
                      size="lg"
                      className="bg-secondary text-secondary-foreground neo-border-thick neo-shadow hover:neo-shadow-lg active:translate-x-1 active:translate-y-1 active:neo-shadow-sm font-black text-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      추가
                    </Button>
                  </div>
                </div>

                {players.length === 0 ? (
                  <div className="bg-card neo-border neo-shadow-lg p-12 text-center">
                    <img
                      src="https://private-us-east-1.manuscdn.com/sessionFile/hXyJZ5wgz8PcjNxHGIeJY8/sandbox/Te8wBFDBaB1FV7AvCXozdx-img-4_1771513562000_na1fn_YmFsYW5jZS1pY29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaFh5Slo1d2d6OFBjak54SEdJZUpZOC9zYW5kYm94L1RlOHdCRkRCYUIxRlY3QXZDWG96ZHgtaW1nLTRfMTc3MTUxMzU2MjAwMF9uYTFmbl9ZbUZzWVc1alpTMXBZMjl1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FfDC4ln5jMKEWm44xLuZJVpXsXPPlhzPi8FSRWjbV-GHSoWZPFIgxLYSmRxtHuVxST3ODySdm4vcsm2F9HpO2kPaR2ThugV2YocnvIoKPTrc9bhCwpiDovdwU2jbTX~Mq4SSxzyHg8BhtlAtzpwnGRG4aTSc2xQhOgtVL9v4quyjBvtrPblgjQvjB0RuYNibwOT05dIyr~5PcA23HTpLXIuZryYY53wbAsZuScVygFjy8wFzRChi0XcGF8hWtHnZT3VQEzx~MbuCoa-S15gI2WDmsw7h~uCtWWRcn9ADNl-cl1~8pU5Pd6qdFrzpyehC4brcB9zBeWfBUxFT10ZKIQ__"
                      alt="Balance Icon"
                      className="w-32 h-32 mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-black mb-2">
                      플레이어를 추가하세요
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      "추가" 버튼을 눌러 10명의 플레이어를 입력해주세요
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {players.map((player, index) => (
                      <PlayerCard
                        key={player.id}
                        index={index}
                        name={player.name}
                        tier={player.tier}
                        division={player.division}
                        onNameChange={(value) =>
                          updatePlayer(player.id, "name", value)
                        }
                        onTierChange={(value) =>
                          updatePlayer(player.id, "tier", value)
                        }
                        onDivisionChange={(value) =>
                          updatePlayer(player.id, "division", value)
                        }
                        onRemove={() => removePlayer(player.id)}
                        rotation={getRotation(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Balance Button */}
              {players.length > 0 && (
                <div className="max-w-md mx-auto text-center">
                  <Button
                    onClick={handleBalance}
                    disabled={players.length !== 10}
                    size="lg"
                    className="w-full bg-accent text-accent-foreground neo-border-thick neo-shadow-lg hover:neo-shadow-lg hover:scale-105 active:translate-x-2 active:translate-y-2 active:neo-shadow font-black text-2xl py-8 transform -rotate-1"
                  >
                    <Shuffle className="w-8 h-8 mr-3" />
                    팀 나누기
                  </Button>
                  {players.length !== 10 && (
                    <p className="mt-4 text-sm font-bold text-muted-foreground">
                      {10 - players.length}명 더 추가해주세요
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Team Result Section */}
              <div className="max-w-6xl mx-auto">
                <div className="bg-primary text-primary-foreground neo-border-thick neo-shadow-lg p-8 mb-8 text-center transform -rotate-1">
                  <h2 className="text-4xl md:text-5xl font-black mb-2">
                    팀 배정 완료!
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-xl font-bold">
                    <span>점수 차이:</span>
                    <span className="bg-secondary text-secondary-foreground neo-border px-4 py-2 text-3xl">
                      {teamResult.difference}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <TeamDisplay
                    teamName="블루 팀"
                    players={teamResult.teamA}
                    totalScore={teamResult.scoreA}
                    bgColor="blue"
                  />
                  <TeamDisplay
                    teamName="레드 팀"
                    players={teamResult.teamB}
                    totalScore={teamResult.scoreB}
                    bgColor="red"
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleReset}
                    size="lg"
                    variant="outline"
                    className="neo-border-thick neo-shadow hover:neo-shadow-lg active:translate-x-1 active:translate-y-1 active:neo-shadow-sm font-black text-lg"
                  >
                    처음으로
                  </Button>
                  <Button
                    onClick={handleBalance}
                    size="lg"
                    className="bg-accent text-accent-foreground neo-border-thick neo-shadow hover:neo-shadow-lg active:translate-x-1 active:translate-y-1 active:neo-shadow-sm font-black text-lg"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    다시 나누기
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-4 border-border">
        <div className="container text-center">
          <p className="font-bold text-muted-foreground">
            LOL 내전 팀 밸런서 - 공정한 팀 배정을 위한 도구
          </p>
        </div>
      </footer>
    </div>
  );
}
