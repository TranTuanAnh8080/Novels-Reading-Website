// src/data/fakeNovels.js
export const novels = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "John Doe",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop",
  },
  {
    id: 2,
    title: "Romance in the Air",
    author: "Jane Smith",
    cover:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=1000&fit=crop",
  },
  {
    id: 3,
    title: "Mystery of the Night",
    author: "Alex Brown",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop",
  },
  {
    id: 4,
    title: "Future Tales",
    author: "Sarah Lee",
    cover:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&h=1000&fit=crop",
  },
  {
    id: 5,
    title: "Dragon Legend",
    author: "Tom White",
    cover:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&h=1000&fit=crop",
  },
];

export const fakeNovels = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "John Doe",
    cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop",
    description: "An epic journey of discovery and survival.",
    chapters: [
      { number: 1, title: "Chapter 1: The Beginning", content: "Once upon a time in a distant land..." },
      { number: 2, title: "Chapter 2: Into the Wild", content: "The adventure continued as they ventured deeper..." },
    ],
  },
  {
    id: 2,
    title: "Romance in the Air",
    author: "Jane Smith",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=1000&fit=crop",
    description: "A heartfelt story of love and destiny.",
    chapters: [
      { number: 1, title: "Chapter 1: First Encounter", content: "Their eyes met across the crowded room..." },
      { number: 2, title: "Chapter 2: Growing Closer", content: "They began to share more moments together..." },
    ],
  },
  // ... các novel khác thêm tương tự
];
