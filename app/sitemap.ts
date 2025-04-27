import { MetadataRoute } from 'next'

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all-posts/`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

const getThreads = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all-threads/`);
  if (!response.ok) {
    throw new Error('Failed to fetch threads');
  }
  return response.json();
}

const getValidDate = (dateString: string | null | undefined) => {
  if (!dateString) return new Date();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_ORIG_URL || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    '',
    '/blog',
    '/thread',
    '/portfolio',
    '/academy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch dynamic routes
    const [posts, threads] = await Promise.all([
      getPosts(),
      getThreads(),
    ]);

    // Blog post routes
    const postRoutes = posts.results.map((post: { slug: string; updated_at: string }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: getValidDate(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Thread routes
    const threadRoutes = threads.results.map((thread: { id: number; last_active: string }) => ({
      url: `${baseUrl}/threads/${thread.id}`,
      lastModified: getValidDate(thread.last_active),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...postRoutes,
      ...threadRoutes,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static routes if there's an error
    return staticRoutes;
  }
} 