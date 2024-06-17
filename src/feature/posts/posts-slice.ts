import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Post, PostsState } from './types';
import dayjs from 'dayjs';
const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'ansar',
      text: 'serikbayev',
      createdAt: new Date('2024-03-22').toISOString(),
    },
    {
      id: '2',
      title: 'cristiano',
      text: 'ronaldo',
      createdAt: new Date('2024-02-15').toISOString(),
    },
    {
      id: '3',
      title: 'ansar',
      imageUrls: [
        'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg',
      ],
      createdAt: new Date('2024-05-29').toISOString(),
    },
    {
      id: '4',
      title: "Google's New AI",
      text: 'Google has announced a new AI model that is expected to revolutionize the tech industry.',
      createdAt: new Date('2024-04-10').toISOString(),
    },
    {
      id: '5',
      title: 'Mount Everest',
      imageUrls: [
        'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg',
      ],
      createdAt: new Date('2024-05-05').toISOString(),
    },
    {
      id: '6',
      title: 'Interesting Blog Post',
      linkUrl: 'https://example.com/blog/interesting-post',
      createdAt: new Date('2024-03-12').toISOString(),
    },
    {
      id: '7',
      title: "Tesla's New Car Model",
      text: 'Tesla has just unveiled its new electric car model which features advanced autonomous driving capabilities.',
      createdAt: new Date('2024-01-20').toISOString(),
    },
    {
      id: '8',
      title: 'Amazing Sunset',
      imageUrls: ['https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_640.jpg'],
      createdAt: new Date('2024-05-30').toISOString(),
    },
    {
      id: '9',
      title: 'Learn TypeScript',
      linkUrl: 'https://www.typescriptlang.org/',
      text: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      createdAt: new Date('2024-03-18').toISOString(),
    },
    {
      id: '10',
      title: 'Beach Vacation',
      text: 'Planning a vacation to the beach this summer. Any recommendations for the best spots?',
      createdAt: new Date('2024-06-01').toISOString(),
    },
    {
      id: '11',
      title: 'New York City',
      text: 'The city that never sleeps!',
      imageUrls: [
        'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg',
      ],
      createdAt: new Date('2024-05-25').toISOString(),
    },
    {
      id: '12',
      title: 'JavaScript Tips',
      text: 'Here are some cool tips to write better JavaScript code.',
      createdAt: new Date('2024-02-20').toISOString(),
    },
    {
      id: '13',
      title: 'Healthy Eating',
      text: 'A guide to healthy eating habits.',
      createdAt: new Date('2024-03-15').toISOString(),
    },
    {
      id: '14',
      title: 'Space Exploration',
      text: 'The future of space exploration looks bright with new technologies.',
      createdAt: new Date('2024-04-22').toISOString(),
    },
    {
      id: '15',
      title: 'Programming Languages',
      text: 'Which programming language should you learn in 2024?',
      createdAt: new Date('2024-01-10').toISOString(),
    },
    {
      id: '16',
      title: 'Art in the Modern World',
      text: 'How modern art is evolving with technology.',
      imageUrls: ['https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_640.jpg'],
      createdAt: new Date('2024-05-20').toISOString(),
    },
    {
      id: '17',
      title: 'Top 10 Beaches',
      text: 'Here are the top 10 beaches to visit this summer.',
      createdAt: new Date('2024-06-02').toISOString(),
    },
    {
      id: '18',
      title: 'World Cuisine',
      text: 'Explore the diverse and rich world of global cuisine.',
      createdAt: new Date('2024-02-14').toISOString(),
    },
    {
      id: '19',
      title: 'Fitness Tips',
      text: 'Stay fit and healthy with these tips.',
      createdAt: new Date('2024-03-25').toISOString(),
    },
    {
      id: '20',
      title: 'Travel Guide',
      text: 'Your guide to traveling around the world on a budget.',
      createdAt: new Date('2024-04-15').toISOString(),
    },
    {
      id: '21',
      title: 'Music Festivals',
      text: 'The best music festivals to attend this year.',
      createdAt: new Date('2024-05-10').toISOString(),
    },
    {
      id: '22',
      title: 'Photography Tips',
      text: 'Improve your photography skills with these tips.',
      imageUrls: [
        'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg',
      ],
      createdAt: new Date('2024-05-12').toISOString(),
    },
    {
      id: '23',
      title: 'Cooking Recipes',
      text: 'Delicious recipes to try at home.',
      createdAt: new Date('2024-02-10').toISOString(),
    },
    {
      id: '24',
      title: 'Gaming News',
      text: 'The latest news in the gaming world.',
      createdAt: new Date('2024-03-28').toISOString(),
    },
    {
      id: '25',
      title: 'Book Recommendations',
      text: 'Must-read books for 2024.',
      createdAt: new Date('2024-01-25').toISOString(),
    },
    {
      id: '26',
      title: 'Tech Gadgets',
      text: 'The coolest tech gadgets to look out for.',
      createdAt: new Date('2024-04-05').toISOString(),
    },
    {
      id: '27',
      title: 'Movie Reviews',
      text: 'The best movies of 2024 reviewed.',
      createdAt: new Date('2024-05-01').toISOString(),
    },
    {
      id: '28',
      title: 'Fitness Challenges',
      text: 'Take on these fitness challenges to stay in shape.',
      createdAt: new Date('2024-03-10').toISOString(),
    },
    {
      id: '29',
      title: 'Gardening Tips',
      text: 'Grow your own garden with these tips.',
      imageUrls: ['https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_640.jpg'],
      createdAt: new Date('2024-06-01').toISOString(),
    },
    {
      id: '30',
      title: 'Work-Life Balance',
      text: 'Tips to maintain a healthy work-life balance.',
      createdAt: new Date('2024-02-01').toISOString(),
    },
  ],
};
export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (
        postType: 'text' | 'image' | 'link',
        content: string | string[], // Change content to accept an array for image URLs
        title: string,
      ) => {
        const id = nanoid();
        const createdAt = new Date().toISOString();
        let post: Post;

        switch (postType) {
          case 'text':
            post = { id, createdAt, title, text: content as string };
            break;
          case 'image':
            post = { id, createdAt, title, imageUrls: content as string[] }; // Cast to string[]
            break;
          case 'link':
            post = { id, createdAt, title, linkUrl: content as string };
            break;
          default:
            throw new Error('Invalid post type');
        }

        return { payload: post };
      },
    },
    deletePost(state, action: PayloadAction<{ postId: string }>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload.postId);
    },
    sortByName(state, action: PayloadAction<{ asc: boolean }>) {
      if (action.payload.asc === true) {
        state.posts = state.posts.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        state.posts = state.posts.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    sortByDate(state, action: PayloadAction<{ dateAsc: boolean }>) {
      const { dateAsc } = action.payload;
      state.posts = state.posts.sort((a, b) => {
        if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
          return dateAsc ? -1 : 1;
        }
        if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
          return dateAsc ? 1 : -1;
        }
        return 0;
      });
    },
    resetState() {
      return initialState;
    },
  },
});

export const { addPost, sortByName, sortByDate, resetState } = postsSlice.actions;
export default postsSlice.reducer;
