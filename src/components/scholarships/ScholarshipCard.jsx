export default function ScholarshipCard({ scholarship }) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <h3 className="text-xl font-semibold mb-1">{scholarship.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{scholarship.provider}</p>
      <p className="text-gray-800 mb-2">{scholarship.description}</p>
      <div className="text-xs text-gray-500">Deadline: {scholarship.deadline}</div>
    </div>
  );
}
