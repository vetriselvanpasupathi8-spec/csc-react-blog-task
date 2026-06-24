export default function Input({ label, type = 'text', value, onChange, placeholder, isTextArea = false, required = false }) {
  const baseClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
  
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      {isTextArea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} required={required} rows="5" className={baseClass} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={baseClass} />
      )}
    </div>
  );
}