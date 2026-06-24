import { Link } from 'react-router-dom';
import Button from './Button';

export default function Card({ id, title, body }) {
  // Helper to limit description to 30 words max
  const truncateWords = (text, limit) => {
    const words = text.split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4">{truncateWords(body, 30)}</p>
      </div>
      <Link to={`/post/${id}`}>
        <Button variant="primary" className="w-full sm:w-auto">Read More</Button>
      </Link>
    </div>
  );
}