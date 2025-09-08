const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export default newsApiBaseUrl;

export async function fetchNews(query, apiKey) {
  if (!query) throw new Error("Please enter a keyword");

  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const toDate = new Date().toISOString().split("T")[0];

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}&from=${fromDate}&to=${toDate}&pageSize=100`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch news");
  return response.json();
}
