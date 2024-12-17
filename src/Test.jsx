import { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { IoStarHalfOutline } from 'react-icons/io5'

function App() {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('purple')
  const [quantity, setQuantity] = useState(0)

  const sizes = [
    { label: 'S', price: '$69' },
    { label: 'M', price: '$79' },
    { label: 'L', price: '$89' },
    { label: 'XL', price: '$99' },
  ]

  const colors = [
    { name: 'purple', class: 'bg-[#6e5fb2]' },
    { name: 'teal', class: 'bg-teal-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'black', class: 'bg-black' },
  ]

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl  mx-auto">


        <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="  p-8 flex items-center justify-center">
            <img
              src="https://i.postimg.cc/Fzy6W0nJ/product-gallery.png"
              alt="Smart Watch"
              className="w-full max-w-md"
            />
          </div>

          {/* Product Details */}
          <div className="p-8">


            <h1 className="text-3xl font-bold text-[#364A63] mb-4">
              Classy Modern Smart watch
            </h1>

            <div className="flex items-center mb-4">

              <FaStar className="w-5 h-5 text-yellow-400"/>
              <FaStar className="w-5 h-5 text-yellow-400"/>
              <FaStar className="w-5 h-5 text-yellow-400"/>
              <IoStarHalfOutline className="w-5 h-5 text-yellow-400" />
              <FaRegStar className="w-5 h-5 text-yellow-400" />


              <span className="text-gray-500 ml-2">(2 Reviews)</span>
            </div>

            <div className="flex items-center mb-6">
              <p className="ml-2 text-gray-500 line-through text-xl">$99.00</p>
              <p className="text-3xl font-bold  text-[#7466BD] ml-2">$79.00</p>
            </div>

            <div className="mb-8">
              <p className="text-gray-600">
                I must explain to you how all this mistaken idea of denouncing pleasure praising pain was born and I will give you a complete account of the system, and expound the actual teaching.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Band Color</h2>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? `ring-2 ring-offset-2 ring-blue-500` : ''
                      }`}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Wrist Size</h2>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    className={`py-2 px-4  rounded-md ${selectedSize === size.label
                      ? 'bg-blue-600 text-white'
                      : ' border text-gray-900 hover:bg-gray-200'
                      }`}
                    onClick={() => setSelectedSize(size.label)}
                  >
                    <span className='text-sm font-medium'>{size.label}</span> <span>{size.price}</span>
                  </button>
                ))}
              </div>
            </div>


            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="p-2 text-gray-600 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 text-center border-x p-2 bg-white text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                />
                <button
                  className="p-2 text-gray-600 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App