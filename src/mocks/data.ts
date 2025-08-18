import { MockData } from '@/types';

export const mockData: MockData = {
  birds: [
    {
      id: '1',
      name: 'European Robin',
      description: 'A cheerful little bird with a red breast, often seen in Russian gardens',
      imageUrl: '/assets/robin.svg',
      habitat: 'Gardens and woodlands'
    },
    {
      id: '2',
      name: 'Common Nightingale',
      description: 'Famous for its beautiful song, a symbol of Russian poetry and romance',
      imageUrl: '/assets/nightingale.svg',
      habitat: 'Dense thickets near water'
    },
    {
      id: '3',
      name: 'White Stork',
      description: 'Large elegant bird that nests on rooftops, bringing good fortune',
      imageUrl: '/assets/stork.svg',
      habitat: 'Villages and wetlands'
    },
    {
      id: '4',
      name: 'Swallow',
      description: 'Graceful flyer that returns each spring, heralding warmer days',
      imageUrl: '/assets/swallow.svg',
      habitat: 'Barns and open skies'
    }
  ],
  svinkas: [
    {
      id: '1',
      name: 'Masha',
      description: 'A curious little pig who loves to explore the garden',
      imageUrl: '/assets/svinka1.svg',
      personality: 'Adventurous and sweet'
    },
    {
      id: '2',
      name: 'Boris',
      description: 'A gentle giant who enjoys sunbathing by the river',
      imageUrl: '/assets/svinka2.svg',
      personality: 'Calm and peaceful'
    },
    {
      id: '3',
      name: 'Nina',
      description: 'The smallest of the bunch, always finding the best flowers',
      imageUrl: '/assets/svinka3.svg',
      personality: 'Delicate and observant'
    },
    {
      id: '4',
      name: 'Vasya',
      description: 'A playful piglet who loves swimming in shallow waters',
      imageUrl: '/assets/svinka4.svg',
      personality: 'Energetic and joyful'
    }
  ],
  fortuneMessages: [
    {
      message: 'The river will bring you wisdom, and birds will sing your praises',
      theme: 'Nature & Wisdom'
    },
    {
      message: 'Your love for words will open new worlds, like a key to hidden gardens',
      theme: 'Language & Discovery'
    },
    {
      message: 'Tiny hooves will lead you to unexpected joy in the countryside',
      theme: 'Adventure & Joy'
    },
    {
      message: 'The beach will whisper secrets of the sea, and you will understand',
      theme: 'Intuition & Knowledge'
    },
    {
      message: 'Your philologist\'s heart will find poetry in every rustling leaf',
      theme: 'Poetry & Nature'
    }
  ],
  samplePrompts: [
    'Write a short, lyrical birthday message in Russian and English, each 3–4 lines, that references birds, the countryside, and a river. Use sophisticated but tender language suitable for a philologist.',
    'Create a poetic description of a morning by the river, with birds singing and the gentle sound of water. Use rich, evocative language.',
    'Write a birthday wish that incorporates the theme of tiny piglets (svinkas) exploring a Russian garden, with a touch of whimsy and warmth.',
    'Compose a short verse about swimming in a river, with references to nature and the joy of being immersed in the countryside.',
    'Generate a birthday message that celebrates both the intellectual depth of a philologist and the simple pleasures of nature and friendship.'
  ]
};
