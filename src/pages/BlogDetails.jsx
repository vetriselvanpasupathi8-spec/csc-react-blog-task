import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogStore } from '../store/useBlogStore';
import Button from '../components/Button';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, customPosts } = useBlogStore();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Check local custom posts first
    const localPost = customPosts.find((p) => p.id.toString() === id.toString());
    if (localPost) {
      setPost(localPost);
      return;
    }

    // 2. Check store posts fetched from API
    const storedPost = posts.find((p) => p.id.toString() === id.toString());
    if (storedPost) {
      setPost(storedPost);
      return;
    }

    // 3. Fallback: Fetch directly from API if page is directly reloaded
    const fetchSinglePost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [id, posts, customPosts]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading post details...</div>;
  if (error) return <div className="text-center py-20 text-red-600 text-xl">Error: {error}</div>;
  if (!post) return <div className="text-center py-20 text-gray-500 text-xl">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
        ← Back to Home
      </Button>
      <article className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 capitalize leading-tight">
          {post.title}
        </h1>
        <div className="w-12 h-1 bg-blue-600 rounded mb-6"></div>
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </article>
    </div>
  );
}