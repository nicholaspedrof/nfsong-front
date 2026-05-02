const BASE_URL = "https://striveschool-api.herokuapp.com/api/deezer/search";

export async function searchMusic(query) {
  const response = await fetch(`${BASE_URL}?q=${query}`);
  const data = await response.json();
  return data.data;
}