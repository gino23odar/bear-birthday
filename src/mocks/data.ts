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
    'A beautiful watercolor painting of a Russian countryside cottage by a gentle river, with birds flying overhead and wildflowers in the foreground, soft pastel colors, dreamy atmosphere',
    'A whimsical illustration of tiny piglets (svinkas) exploring a magical garden with butterflies, flowers, and a small pond, cartoon style, warm and inviting',
    'A serene landscape painting of a peaceful river scene at sunset, with a wooden bridge, willow trees, and a stork standing in the water, impressionist style',
    'A cozy scene of a bear reading a book in a garden, surrounded by birds, flowers, and a teacup, warm lighting, detailed and charming',
    'A fantasy illustration of a floating island with a treehouse, connected by bridges, with birds and small animals, magical forest atmosphere, vibrant colors'
  ]
};
