// src/utils/api.js

export function getItems() {
  // Simulate fetching saved articles
  return new Promise((resolve) =>
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85",
        title: "Some news article",
        url: "https://news.example.com/article1",
        imageUrl: "https://news.example.com/image1.jpg",
      },
      {
        _id: "65f7368dfb74bd6a92114c86",
        title: "Another news article",
        url: "https://news.example.com/article2",
        imageUrl: "https://news.example.com/image2.jpg",
      },
    ])
  );
}

export function saveArticle(article) {
  // Simulate saving an article
  return new Promise((resolve) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0",
      url: article.url,
      title: article.title,
      imageUrl: article.imageUrl,
    });
  });
}

export function deleteArticle(articleId) {
  // Simulate deleting an article
  return new Promise((resolve) => {
    resolve({ success: true, deletedId: articleId });
  });
}
