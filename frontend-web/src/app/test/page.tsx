/**
 * Test Page - Kiểm tra Tailwind CSS
 */

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Kiểm tra Tailwind CSS
        </h1>
        
        {/* Test Colors */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Colors</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-500 text-white p-4 rounded-lg text-center">
              Primary
            </div>
            <div className="bg-secondary-500 text-white p-4 rounded-lg text-center">
              Secondary
            </div>
            <div className="bg-accent-500 text-white p-4 rounded-lg text-center">
              Accent
            </div>
          </div>
        </div>
        
        {/* Test Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4">
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-md hover:shadow-xl">
              Primary Button
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition">
              Outline Button
            </button>
          </div>
        </div>
        
        {/* Test Cards */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-6 rounded-xl border-2 border-primary-200 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-primary-800 mb-2">Card 1</h3>
              <p className="text-gray-700">This is a test card with gradient background</p>
            </div>
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-50 p-6 rounded-xl border-2 border-secondary-200 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-secondary-800 mb-2">Card 2</h3>
              <p className="text-gray-700">Another test card with different colors</p>
            </div>
          </div>
        </div>
        
        {/* Test Animations */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Animations</h2>
          <div className="space-y-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg animate-pulse">
              Pulse Animation
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg animate-bounce">
              Bounce Animation
            </div>
            <div className="bg-purple-500 text-white p-4 rounded-lg hover:scale-110 transition-transform">
              Hover Scale
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
