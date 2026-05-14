export interface Player {
  id: string;
  rank: number;
  change: number;
  name: string;
  team: string;
  tier: "Elite" | "Pro" | "Challenger" | "Rookie";
  points: number;
  winRate: string;
  gd: number;
  streak: number;
  form: string[];
  city: string;
  nationality: string;
}

export const PLAYERS: Player[] = [
  { id: 'p01', rank: 1, change: 0, name: 'WILFY-Z', team: 'Harare Thunder', tier: 'Elite', points: 3120, winRate: '90.3%', gd: 45, streak: 5, form: ['W','W','W','W','W'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p02', rank: 2, change: 1, name: 'ASH-MAR1', team: 'Bulawayo Strikers', tier: 'Elite', points: 3085, winRate: '86.8%', gd: 38, streak: 3, form: ['W','D','W','W','W'], city: 'Bulawayo', nationality: 'ZWE' },
  { id: 'p03', rank: 3, change: -1, name: 'KUNDAI', team: 'Harare Thunder', tier: 'Elite', points: 2980, winRate: '84.3%', gd: 31, streak: 4, form: ['L','W','W','W','W'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p04', rank: 4, change: 1, name: 'FARABALL2', team: 'Mutare Riders', tier: 'Elite', points: 2842, winRate: '81.6%', gd: 27, streak: 1, form: ['W','W','W','D','W'], city: 'Mutare', nationality: 'ZWE' },
  { id: 'p05', rank: 5, change: -1, name: 'MUNA101', team: 'Bulawayo Strikers', tier: 'Elite', points: 2790, winRate: '79.1%', gd: 22, streak: -1, form: ['D','W','W','W','L'], city: 'Bulawayo', nationality: 'ZWE' },
  { id: 'p06', rank: 6, change: 5, name: 'ZW_RUFA1', team: 'Gweru Falcons', tier: 'Pro', points: 2640, winRate: '75%', gd: 18, streak: -1, form: ['W','W','W','D','L'], city: 'Gweru', nationality: 'ZWE' },
  { id: 'p07', rank: 7, change: -1, name: 'TATENDOO2', team: 'Bulawayo Strikers', tier: 'Pro', points: 2588, winRate: '72.3%', gd: 15, streak: 3, form: ['W','D','W','W','W'], city: 'Bulawayo', nationality: 'ZWE' },
  { id: 'p08', rank: 8, change: -1, name: 'PANA-X1', team: 'Harare Thunder', tier: 'Pro', points: 2510, winRate: '69.9%', gd: 12, streak: 1, form: ['L','W','W','D','W'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p09', rank: 9, change: 2, name: 'SIMBA-FC1', team: 'ZW Spartans', tier: 'Pro', points: 2470, winRate: '67.5%', gd: 9, streak: 0, form: ['W','W','L','W','D'], city: 'Victoria Falls', nationality: 'ZWE' },
  { id: 'p10', rank: 10, change: -1, name: 'BLESS-92', team: 'Mutare Riders', tier: 'Pro', points: 2410, winRate: '65.1%', gd: 5, streak: 1, form: ['W','D','W','L','W'], city: 'Mutare', nationality: 'ZWE' },
  { id: 'p11', rank: 11, change: -1, name: 'TAPS1', team: 'Harare Thunder', tier: 'Pro', points: 2360, winRate: '62.7%', gd: 2, streak: -1, form: ['W','W','W','D','L'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p12', rank: 12, change: 2, name: 'NY-X1', team: 'ZW Spartans', tier: 'Challenger', points: 2280, winRate: '60.2%', gd: -3, streak: 1, form: ['W','D','W','D','W'], city: 'Mutare', nationality: 'ZWE' },
  { id: 'p13', rank: 13, change: -1, name: 'TAWA-FC1', team: 'ZW Spartans', tier: 'Challenger', points: 2210, winRate: '57.8%', gd: -5, streak: -1, form: ['L','W','W','W','L'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p14', rank: 14, change: 2, name: 'T-HOVE1', team: 'Harare Thunder', tier: 'Challenger', points: 2150, winRate: '55.4%', gd: -8, streak: 1, form: ['W','W','D','L','W'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p15', rank: 15, change: 0, name: 'TINO-X3RISER', team: 'Bulawayo Strikers', tier: 'Challenger', points: 2090, winRate: '53%', gd: -12, streak: 0, form: ['W','W','W','W','D'], city: 'Bulawayo', nationality: 'ZWE' },
  { id: 'p16', rank: 16, change: 2, name: 'ANE-SU1', team: 'Harare Thunder', tier: 'Challenger', points: 2050, winRate: '51%', gd: -15, streak: 1, form: ['W','D','W','L','W'], city: 'Harare', nationality: 'ZWE' },
  { id: 'p17', rank: 17, change: 0, name: 'ZIMSNIPER', team: 'Gweru Falcons', tier: 'Rookie', points: 1900, winRate: '48%', gd: -18, streak: -2, form: ['D','L','W','L','L'], city: 'Gweru', nationality: 'ZWE' },
  { id: 'p18', rank: 18, change: 1, name: 'K-DZAI', team: 'Mutare Riders', tier: 'Rookie', points: 1850, winRate: '45%', gd: -22, streak: 1, form: ['L','D','L','W','W'], city: 'Mutare', nationality: 'ZWE' },
];
