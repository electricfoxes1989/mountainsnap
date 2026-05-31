import { getPhotoCount, getAllStations } from "@/sanity/queries";

// Update this to the real public launch date when the project goes live.
export const PROJECT_START_DATE = new Date("2026-03-15T00:00:00Z");

export type LiveStats = {
  daysSinceLaunch: number;
  photoCount: number;
  stationCount: number;
};

export async function getLiveStats(): Promise<LiveStats> {
  const now = new Date();
  const ms = now.getTime() - PROJECT_START_DATE.getTime();
  const daysSinceLaunch = Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)));

  const [photoCount, stations] = await Promise.all([
    getPhotoCount().catch(() => 0),
    getAllStations().catch(() => []),
  ]);

  return {
    daysSinceLaunch,
    photoCount,
    stationCount: stations.length,
  };
}
