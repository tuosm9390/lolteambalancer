/**
 * Neo-Brutalism Design: LOL Team Balancer
 * Team balancing algorithm
 */

import { Player, TeamResult } from "./tiers";

// Generate all combinations of k elements from array
function getCombinations<T>(array: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (k > array.length) return [];

  const result: T[][] = [];

  function backtrack(start: number, current: T[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < array.length; i++) {
      current.push(array[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// Balance teams to minimize score difference
export function balanceTeams(players: Player[]): TeamResult {
  if (players.length !== 10) {
    throw new Error("정확히 10명의 플레이어가 필요합니다.");
  }

  let bestDifference = Infinity;
  let bestTeamA: Player[] = [];
  let bestTeamB: Player[] = [];
  let bestScoreA = 0;
  let bestScoreB = 0;

  // Get all combinations of 5 players for team A
  const combinations = getCombinations(players, 5);

  for (const teamA of combinations) {
    // Remaining players form team B
    const teamB = players.filter((p) => !teamA.includes(p));

    const scoreA = teamA.reduce((sum, p) => sum + p.score, 0);
    const scoreB = teamB.reduce((sum, p) => sum + p.score, 0);
    const difference = Math.abs(scoreA - scoreB);

    if (difference < bestDifference) {
      bestDifference = difference;
      bestTeamA = teamA;
      bestTeamB = teamB;
      bestScoreA = scoreA;
      bestScoreB = scoreB;
    }
  }

  return {
    teamA: bestTeamA,
    teamB: bestTeamB,
    scoreA: bestScoreA,
    scoreB: bestScoreB,
    difference: bestDifference,
  };
}
