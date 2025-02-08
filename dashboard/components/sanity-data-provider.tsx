import { useEffect, useState } from "react";
import { client } from "../lib/sanity";

export type SanityData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: {
    name: string;
    logo: string;
    plan: string;
  }[];
  navMain: {
    title: string;
    url: string;
    icon: string;
    isActive: boolean;
    items: {
      title: string;
      url: string;
    }[];
  }[];
  projects: {
    name: string;
    url: string;
    icon: string;
  }[];
};

export function useSanityData() {
  const [data, setData] = useState<SanityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(`
          {
            "user": *[_type == "user"][0] {
              name,
              email,
              "avatar": avatar.asset->url
            },
            "teams": *[_type == "team"] {
              name,
              "logo": logo.asset->url,
              plan
            },
            "navMain": *[_type == "navItem"] {
              title,
              url,
              "icon": icon.asset->url,
              isActive,
              "items": items[] {
                title,
                url
              }
            },
            "projects": *[_type == "project"] {
              name,
              url,
              "icon": icon.asset->url
            }
          }
        `);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
