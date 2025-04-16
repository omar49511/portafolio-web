export default function SkeletonExperience() {
    return (
        <div className="animate-pulse space-y-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="h-6 bg-gray-700 rounded w-2/3" />
                    <div className="h-4 bg-gray-600 rounded w-1/2" />
                    <div className="h-4 bg-gray-600 rounded w-1/3" />
                    <div className="h-20 bg-gray-800 rounded w-full" />
                    {i !== 2 && <hr className="border-gray-700 border-b-1 mt-4" />}
                </div>
            ))}
        </div>
    );
}