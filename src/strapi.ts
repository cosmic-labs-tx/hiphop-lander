interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchStrapi<T>({ endpoint, query, wrappedByKey, wrappedByList }: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
    },
  });
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

export interface LandingPage {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    hero_highlighted: string;
    hero_title: string;
    hero_subtitle: string;
    cta_dark: string;
    cta_large: string;
    insurance_cta: string;
    faq: Faq[];
    slide: Slide[];
    feature: Feature[];
    module_card: ModuleCard[];
    feature_card: FeatureCard[];
  };
}

export interface FeatureCard {
  id: number;
  title: string;
  subtitle: string;
}

export interface Feature {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface ModuleCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
}

// createdAt: '2024-09-03T02:23:48.638Z',
// updatedAt: '2024-09-03T02:32:28.233Z',
// publishedAt: '2024-09-03T02:32:28.232Z',
// hero_title: 'Defensive Driving Course.',
// hero_subtitle: 'Join our Hip Hop Defensive Driving Course for a jam-packed blend of safety and style!',
// cta_dark: 'Complete the course in 6 hours and get your certificate instantly.',
// cta_large: 'Hop In Today!',
// insurance_cta: 'Reduce the cost of insurance.',
// hero_highlighted: '#1 Music Themed'
// "feature_card": [
//       {
//         "id": 5,
//         "title": "Instantly Download Certificate for Free",
//         "subtitle": "Your certificate will be emailed immediately upon completion."
//       },
//       {
//         "id": 6,
//         "title": "Fun and engaging videos",
//         "subtitle": "Life is short. Enjoy it!"
//       },
//       {
//         "id": 7,
//         "title": "Use any device",
//         "subtitle": "The course works on computers and smartphones."
//       },
//       {
//         "id": 8,
//         "title": "Opportunity for insurance discount",
//         "subtitle": "Verify discount eligibility with your insurance company."
//       },
//       {
//         "id": 9,
//         "title": "No stressful exams",
//         "subtitle": "Only knowledge checks along the way that can be retaken if needed."
//       },
//       {
//         "id": 10,
//         "title": "Learn at your own pace",
//         "subtitle": "Stop and start as needed to fit your schedule."
//       },
//       {
//         "id": 11,
//         "title": "Pay and Learn 100% online",
//         "subtitle": "No lectures or in-person testing at all!"
//       },
//       {
//         "id": 12,
//         "title": "Tips from Law Enforcement",
//         "subtitle": "Learn safety tips from experienced officers."
//       }
//     ],
//     "feature": [
//       {
//         "id": 1,
//         "title": "Texas TLDR Approved",
//         "subtitle": "We're legit"
//       },
//       {
//         "id": 2,
//         "title": "Guaranteed Lowest Price",
//         "subtitle": "Seriously!"
//       },
//       {
//         "id": 3,
//         "title": "Guaranteed Shortest Course",
//         "subtitle": "Required by law"
//       },
//       {
//         "id": 4,
//         "title": "Ticket Dismissed Guaranteed",
//         "subtitle": "Or your money back."
//       }
//     ],
//     "slide": [
//       {
//         "id": 1,
//         "title": "Slide 1",
//         "subtitle": "Slide 1 subtitle",
//         "description": "Slide 1 description"
//       },
//       {
//         "id": 2,
//         "title": "Slide 2 title",
//         "subtitle": "Slide 2 subtitle",
//         "description": "Slide 2 description"
//       },
//       {
//         "id": 3,
//         "title": "Slide 3 title",
//         "subtitle": "Slide 3 subtitle",
//         "description": "Slide 3 description"
//       },
//       {
//         "id": 4,
//         "title": "Slide 4 title",
//         "subtitle": "Slide 4 subtitle",
//         "description": "Slide 4 description"
//       }
//     ],
//     "faq": [
//       {
//         "id": 1,
//         "question": "What is Astro?",
//         "answer": "Astro is a new kind of static site generator that combines the simplicity of a build tool with the speed of a server.\n"
//       },
//       {
//         "id": 2,
//         "question": "What is Astro?",
//         "answer": "Astro is a new kind of static site generator that combines the simplicity of a build tool with the speed of a server."
//       },
//       {
//         "id": 3,
//         "question": "What is Astro?",
//         "answer": "Astro is a new kind of static site generator that combines the simplicity of a build tool with the speed of a server."
//       }
//     ],
//     "module_card": [
//       {
//         "id": 1,
//         "title": "A single course module",
//         "subtitle": "45 min / 12 questions",
//         "description": "Some detailed information about this class can go right here.",
//         "button_text": "Call to action"
//       },
//       {
//         "id": 2,
//         "title": "A single course module",
//         "subtitle": "45 min / 12 questions",
//         "description": "Some detailed information about this class can go right here.",
//         "button_text": "Call to action"
//       }
//     ]
//   }
