# 티어 점수 시스템 및 팀 밸런싱 알고리즘

## 티어 점수 체계

리그오브레전드의 랭크 시스템을 기반으로 각 티어에 점수를 부여합니다.

| 티어 | 점수 | 설명 |
|------|------|------|
| Iron (아이언) | 1-4 | IV(1), III(2), II(3), I(4) |
| Bronze (브론즈) | 5-8 | IV(5), III(6), II(7), I(8) |
| Silver (실버) | 9-12 | IV(9), III(10), II(11), I(12) |
| Gold (골드) | 13-16 | IV(13), III(14), II(15), I(16) |
| Platinum (플래티넘) | 17-20 | IV(17), III(18), II(19), I(20) |
| Emerald (에메랄드) | 21-24 | IV(21), III(22), II(23), I(24) |
| Diamond (다이아몬드) | 25-28 | IV(25), III(26), II(27), I(28) |
| Master (마스터) | 29 | 단일 티어 |
| Grandmaster (그랜드마스터) | 30 | 단일 티어 |
| Challenger (챌린저) | 31 | 단일 티어 |

## 팀 밸런싱 알고리즘

### 목표
10명의 플레이어를 5명씩 두 팀으로 나누되, 각 팀의 총 점수 차이를 최소화합니다.

### 알고리즘: 최적화된 조합 탐색

1. **입력**: 10명의 플레이어와 각각의 티어 점수
2. **목표**: 팀 A와 팀 B의 총 점수 차이 최소화
3. **방법**: 
   - 10명 중 5명을 선택하는 모든 조합 탐색 (C(10,5) = 252가지)
   - 각 조합에 대해 팀 A와 팀 B의 점수 차이 계산
   - 점수 차이가 가장 작은 조합 선택
   - 동점일 경우 첫 번째 발견된 조합 사용

### 구현 세부사항

```typescript
interface Player {
  id: string;
  name: string;
  tier: string;
  division: string;
  score: number;
}

interface TeamResult {
  teamA: Player[];
  teamB: Player[];
  scoreA: number;
  scoreB: number;
  difference: number;
}

function balanceTeams(players: Player[]): TeamResult {
  // 10명이 아닌 경우 에러
  if (players.length !== 10) {
    throw new Error('정확히 10명의 플레이어가 필요합니다.');
  }

  let bestDifference = Infinity;
  let bestTeamA: Player[] = [];
  let bestTeamB: Player[] = [];

  // 모든 5명 조합 탐색
  const combinations = getCombinations(players, 5);
  
  for (const teamA of combinations) {
    const teamB = players.filter(p => !teamA.includes(p));
    const scoreA = teamA.reduce((sum, p) => sum + p.score, 0);
    const scoreB = teamB.reduce((sum, p) => sum + p.score, 0);
    const difference = Math.abs(scoreA - scoreB);

    if (difference < bestDifference) {
      bestDifference = difference;
      bestTeamA = teamA;
      bestTeamB = teamB;
    }
  }

  return {
    teamA: bestTeamA,
    teamB: bestTeamB,
    scoreA: bestTeamA.reduce((sum, p) => sum + p.score, 0),
    scoreB: bestTeamB.reduce((sum, p) => sum + p.score, 0),
    difference: bestDifference
  };
}
```

### 시간 복잡도
- O(252) = O(1) - 고정된 조합 수이므로 상수 시간
- 실시간 계산 가능

## UI 플로우

1. **플레이어 입력 단계**
   - 10개의 입력 필드 (이름 + 티어 선택)
   - 티어 선택 시 자동으로 점수 계산
   - 실시간으로 입력된 플레이어 수 표시

2. **팀 배정 단계**
   - "팀 나누기" 버튼 클릭
   - 알고리즘 실행 (즉시 완료)
   - 애니메이션과 함께 팀 결과 표시

3. **결과 표시**
   - 팀 A와 팀 B를 좌우로 구분
   - 각 팀의 총 점수 표시
   - 점수 차이 강조 표시
   - "다시 나누기" 버튼으로 재시작
