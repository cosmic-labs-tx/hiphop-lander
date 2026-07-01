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
  image?: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
        caption?: string;
        name?: string;
      };
    } | null;
  };
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

export interface TermsAndConditions {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
  };
}

export interface SupportPage {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
    slug: string;
    title: string;
    description?: string;
    featured_image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
