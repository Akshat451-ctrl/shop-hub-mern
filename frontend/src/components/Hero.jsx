import React from 'react'

const Hero = () => {
  const scrollToProducts = () => {
    const el = document.querySelector('#products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="absolute inset-0 opacity-30 mix-blend-multiply">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" fillOpacity="0.04" d="M0,128L48,160C96,192,192,256,288,261.3C384,267,480,213,576,176C672,139,768,117,864,112C960,107,1056,117,1152,117.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-6">Limited time — Free shipping on orders over $50</div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Find what you love,
              <br />
              <span className="text-yellow-300">shop with confidence</span>
            </h1>

            <p className="text-lg text-white/90 max-w-xl mb-8">Curated products, unbeatable prices, and personalized recommendations to help you discover favorites faster.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={scrollToProducts} className="btn-primary">Shop Now</button>
              <button className="px-6 py-3 rounded-md bg-white bg-opacity-10 border border-white/20 hover:bg-white/20 transition text-white">See Deals</button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-white/80">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-white/80">Avg. rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src="https://media.istockphoto.com/id/1174598609/photo/set-of-contemporary-house-appliances-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bBMILbCpLkhIxbL7sAAXaFOaFaSXFCt80ccHgl7iiWM=" alt="promo" className="w-full h-56 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhlcyUyMHNob3B8ZW58MHx8MHx8fDA%3D" alt="promo" className="w-full h-56 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src="https://img.freepik.com/premium-photo/sport-equipment-black-background_1016675-2219.jpg?semt=ais_hybrid&w=740&q=80" alt="promo" className="w-full h-56 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src="https://img.freepik.com/free-vector/flat-accessories-collection_1284-23697.jpg?semt=ais_hybrid&w=740&q=80" alt="promo" className="w-full h-56 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
