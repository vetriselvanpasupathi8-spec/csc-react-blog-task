import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogStore } from '../store/useBlogStore';
import Input from '../components/input';
import Button from '../components/Button';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const addPost = useBlogStore((state) => state.addPost);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setSubmitting(true);

    const newPost = {
      id: Date.now(), // Generate unique numeric ID safely locally
      title,
      body,
      userId: 1,
    };

    try {
      // Optional API POST Call simulation
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      // Save locally to Zustand state so it prepends to top of Home List
      addPost(newPost);
      navigate('/');
    } catch (err) {
      console.error("Failed to sync post with server", err);
      // Fallback: still save locally
      addPost(newPost);
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h2>
        
        <form onSubmit={handleSubmit}>
          <Input 
            label="Post Title"
            placeholder="Enter a captivating title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input 
            label="Post Content"
            placeholder="Write your story here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            isTextArea
            required
          />
          
          <div className="flex gap-4 mt-6 justify-end">
            <Button variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className={submitting ? 'opacity-50 pointer-events-none' : ''}>
              {submitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}