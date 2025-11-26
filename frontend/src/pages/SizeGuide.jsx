import React from 'react';

const SizeGuide = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Size Guide
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect fit with our comprehensive size guide
          </p>
        </div>

        {/* Size Guide Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button className="px-6 py-4 text-lg font-semibold text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                Clothing
              </button>
              <button className="px-6 py-4 text-lg font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                Shoes
              </button>
              <button className="px-6 py-4 text-lg font-semibold text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                Accessories
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Size Chart */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Size</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Chest (inches)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Waist (inches)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">XS</td>
                    <td className="border border-gray-300 px-4 py-3">32-34</td>
                    <td className="border border-gray-300 px-4 py-3">24-26</td>
                    <td className="border border-gray-300 px-4 py-3">34-36</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">S</td>
                    <td className="border border-gray-300 px-4 py-3">34-36</td>
                    <td className="border border-gray-300 px-4 py-3">26-28</td>
                    <td className="border border-gray-300 px-4 py-3">36-38</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">M</td>
                    <td className="border border-gray-300 px-4 py-3">36-38</td>
                    <td className="border border-gray-300 px-4 py-3">28-30</td>
                    <td className="border border-gray-300 px-4 py-3">38-40</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">L</td>
                    <td className="border border-gray-300 px-4 py-3">38-40</td>
                    <td className="border border-gray-300 px-4 py-3">30-32</td>
                    <td className="border border-gray-300 px-4 py-3">40-42</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">XL</td>
                    <td className="border border-gray-300 px-4 py-3">40-42</td>
                    <td className="border border-gray-300 px-4 py-3">32-34</td>
                    <td className="border border-gray-300 px-4 py-3">42-44</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Measure</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📏</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Chest</h3>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your chest, keeping the tape horizontal.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📐</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Waist</h3>
                  <p className="text-gray-600 text-sm">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📏</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hips</h3>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your hips, keeping the tape horizontal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Size Tips</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 mt-1">•</span>
              <span>If you're between sizes, we recommend sizing up for a more comfortable fit.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 mt-1">•</span>
              <span>Our sizes run true to standard sizing, but please check the specific product measurements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-300 mt-1">•</span>
              <span>Still unsure? Contact our customer service team for personalized recommendations.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;