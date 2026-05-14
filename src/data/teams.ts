import { Shield } from 'lucide-react';

export interface Team {
  id: string;
  name: string;
  region: string;
  roster: string[];
  history: string;
  color: string;
  achievements: string[];
  stats: {
    winRate: string;
    totalPrize: string;
    matchesPlayed: number;
  };
}

export const TEAMS: Team[] = [
  {
    id: 't1',
    name: 'T1',
    region: 'South Korea',
    roster: ['Zeus', 'Oner', 'Faker', 'Gumayusi', 'Keria'],
    history: 'Founded in 2002 as Orion SKT T1, the organization has become the most successful in history. Led by the legendary Faker, they have defined multiple eras of competitive play with their disciplined macro and clutch performances.',
    color: 'from-red-500/20 to-red-600/5',
    achievements: ['4x World Champions', '2x MSI Champions', '10x LCK Champions'],
    stats: {
      winRate: '72%',
      totalPrize: '$8.2M',
      matchesPlayed: 1450
    }
  },
  {
    id: 'geng',
    name: 'Gen.G',
    region: 'South Korea',
    roster: ['Kiin', 'Canyon', 'Chovy', 'Peyz', 'Lehends'],
    history: 'Gen.G Esports represents the gold standard of modern efficiency. Known for their "Gen.G Classic" style of late-game dominance and impeccable objective control, they have consistently dominated regional play.',
    color: 'from-amber-500/20 to-amber-600/5',
    achievements: ['2x Worlds Semifinalists', '3x LCK Champions', 'MSI 2024 Winners'],
    stats: {
      winRate: '68%',
      totalPrize: '$4.5M',
      matchesPlayed: 890
    }
  },
  {
    id: 'blg',
    name: 'Bilibili Gaming',
    region: 'China',
    roster: ['Bin', 'Xun', 'Knight', 'Elk', 'ON'],
    history: 'Bilibili Gaming has risen to become the premier force in China. With a focus on aggressive early-game laning and explosive teamfighting, they represent the peak of high-octane mechanical skill.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    achievements: ['2x LPL Champions', 'MSI 2024 Finalists', 'Worlds 2023 Semifinalists'],
    stats: {
      winRate: '65%',
      totalPrize: '$2.8M',
      matchesPlayed: 620
    }
  },
  {
    id: 'jdg',
    name: 'JD Gaming',
    region: 'China',
    roster: ['Flandre', 'Kanavi', 'Yagao', 'Ruler', 'Missing'],
    history: 'JDG is synonymous with "The Golden Road" contenders. Their ability to find winning teamfights even from behind has earned them the reputation of being the most resilient squad in the league.',
    color: 'from-rose-500/20 to-rose-600/5',
    achievements: ['MSI 2023 Champions', '3x LPL Champions', 'Worlds 2023 Semifinalists'],
    stats: {
      winRate: '70%',
      totalPrize: '$3.9M',
      matchesPlayed: 740
    }
  },
  {
    id: 'g2',
    name: 'G2 Esports',
    region: 'Europe',
    roster: ['BrokenBlade', 'Yike', 'Caps', 'Hans Sama', 'Mikyx'],
    history: 'Europe\'s most successful export. G2 is famous for their creative drafting and "out-of-the-box" strategies that have dismantled established hierarchies for nearly a decade.',
    color: 'from-gray-500/20 to-gray-600/5',
    achievements: ['MSI 2019 Champions', '12x LEC Champions', 'Worlds 2019 Finalists'],
    stats: {
      winRate: '62%',
      totalPrize: '$5.1M',
      matchesPlayed: 1120
    }
  },
  {
    id: 'tl',
    name: 'Team Liquid',
    region: 'North America',
    roster: ['Impact', 'UmTi', 'APA', 'Yeon', 'CoreJJ'],
    history: 'A legacy organization dating back to the earliest days of StarCraft. Team Liquid brings a structured, professional approach to training and macro that has made them the most consistent NA representative.',
    color: 'from-blue-500/20 to-blue-600/5',
    achievements: ['4-Peat LCS Champions', 'MSI 2019 Finalists', 'Multiple Top 16 World Finishes'],
    stats: {
      winRate: '58%',
      totalPrize: '$3.2M',
      matchesPlayed: 980
    }
  }
];
