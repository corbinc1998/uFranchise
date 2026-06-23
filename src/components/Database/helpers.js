import { db } from "./Database";

export async function getAllSeasons()
{
    const seasons = await db.seasons.toArray();
    // Convert array back to object format for compatibility
    const seasonsObj = {};
    seasons.forEach(season => {
        seasonsObj[season.id] = {
            games: season.games || [],
            name: season.name
        };
    });
    return seasonsObj
}

export async function getSeason(seasonId)
{
    const season = await db.seasons.get(seasonId);
    return season || null;
}

export async function saveSeason(seasonId, seasonData)
{
    await db.seasons.put({
        id: seasonId,
        name: seasonData.name,
        games: seasonData.games || []
    });
}


export async function saveAllSeasons(seasonsObj) {
    const seasonsArray = Object.entries(seasonsObj).map(([id, data])=> ({
        id,
        name: data.name,
        games: data.games || [],
    }));
    // 'rw' == readwrite
    await db.transaction('rw', db.seasons, async () => {
        await db.seasons.clear();
        await db.seasons.bulkPut(seasonsArray);
    });
}

export async function deleteSeason(seasonId) {
    await db.seasons.delete(seasonId);
}


// Helper functions for settings

export async function getSetting(key) {
    const setting = await db.settings.get(key);
    return setting?.value || null;
  }
  
  export async function saveSetting(key, value) {
    await db.settings.put({ key, value });
  }