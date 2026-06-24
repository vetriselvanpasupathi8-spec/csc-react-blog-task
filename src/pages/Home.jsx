import { useEffect } from 'react';
import { useBlogStore } from '../store/useBlogStore';
import Card from '../components/Card';
import Input from '../components/input';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Home() {
  const { fetchPosts, loading, error, searchQuery, setSearchQuery, getFilteredPosts } = useBlogStore();
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = getFilteredPosts();

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading blog posts...</div>;
  if (error) return <div className="text-center py-20 text-red-600 text-xl">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Latest Blogs</h1>
        <Link to="/create">
          <Button variant="primary">+ Create New Post</Button>
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="mb-8">
        <Input 
          placeholder="🔍 Search posts by title real-time..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No posts found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} id={post.id} title={post.title} body={post.body} />
          ))}
        </div>
      )}
    </div>
  );
}