import { ANIME_URI, KITSU_URI } from "@/utils/constants";

export default function useAnime() {
  let API = {
    recent: ANIME_URI + "/recent-episodes",
    popular: ANIME_URI + "/top-airing",
    info: ANIME_URI + "/info",
    episode: ANIME_URI + "/watch",
    server: ANIME_URI + "/servers",
    trending: KITSU_URI + "/trending/anime",
  };

  async function getRecent() {
    const data = await fetch(API.recent, {
      cache: "no-store",
    });
    return data.json();
  }

  async function getPopular() {
    const data = await fetch(API.popular);
    return data.json();
  }

  async function getInfo(id: string) {
    const data = await fetch(API.info + "/" + id, {
      next: { revalidate: 120 },
    });
    return data.json();
  }

  async function getEpisode(id: string, serverName: string = "gogocdn") {
    const data = await fetch(API.episode + "/" + id + "?server=" + serverName);
    return data.json();
  }

  async function getServers(id: string) {
    const data = await fetch(API.server + "/" + id);
    return data.json();
  }

  async function getSearch(query: string) {
    const data = await fetch(ANIME_URI + "/" + query);
    return data.json();
  }

  async function getTrending() {
    const data = await fetch(API.trending);
    return data.json();
  }

  return {
    getTrending,
    getRecent,
    getPopular,
    getInfo,
    getEpisode,
    getServers,
    getSearch,
  };
}
