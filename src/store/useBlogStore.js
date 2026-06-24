import { create } from 'zustand';

export const useBlogStore = create((set, get) => ({
  posts: [],
  customPosts: [], // Holds posts created by the user
  loading: false,
  error: null,
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  // Fetch initial posts from API
  fetchPosts: async () => {
    // Avoid refetching if we already have data
    if (get().posts.length > 0) return;

    set({ loading: true, error: null });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      set({ posts: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Combine custom posts (at the top) with API posts, then filter by search query
  getFilteredPosts: () => {
    const { posts, customPosts, searchQuery } = get();
    const allPosts = [...customPosts, ...posts];
    if (!searchQuery.trim()) return allPosts;
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },

  // Add a new post locally to the top
  addPost: (newPost) => set((state) => ({
    customPosts: [newPost, ...state.customPosts]
  }))
}));