import { useEffect, useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { IoStarHalfOutline } from "react-icons/io5"

// json data
const productsData = [
  { name: 'Purple', class: 'bg-[#6e5fb2]', image: 'https://i.postimg.cc/Fzy6W0nJ/product-gallery.png', label: 'S', price: ' $69' },
  { name: 'Cyan', class: 'bg-[#1FCEC9]', image: 'https://i.postimg.cc/t4CckZdY/cyan.png', label: 'M', price: '$79' },
  { name: 'Blue', class: 'bg-[#4B97D3]', image: 'https://i.postimg.cc/nc15qYDy/blue.png', label: 'L', price: '$89' },
  { name: 'Black', class: 'bg-[#3B4747]', image: 'https://i.postimg.cc/gkpQwBny/black.png', label: 'XL', price: '$99' },
];


function App() {

  // useState
  const [selectedSize, setSelectedSize] = useState('S')
  const [selectedPrice, setSelectedPrice] = useState('$69')
  const [quantity, setQuantity] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productsData[0].name);
  const [currentImage, setCurrentImage] = useState(productsData[0].image);
  const [cartData, setCartData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Modal Close
  const closeModal = () => {
    setIsOpen(false);
  };

  // Color Change handle
  const handleImageChange = (color) => {
    setSelectedColor(color.name);
    setCurrentImage(color.image);
  };

  // LocalStorage data add
  const handleAddButton = () => {
    const newData = {
      size: selectedSize,
      price: selectedPrice,
      quantity,
      color: selectedColor,
      image: currentImage,
    };

    //Data Added localStorage  
    const existingCartData = JSON.parse(localStorage.getItem('cartData')) || [];

    //Check if the data already exists
    const isDuplicate = existingCartData.some(
      (item) =>
        item.size === newData.size &&
        item.price === newData.price &&
        item.quantity === newData.quantity &&
        item.color === newData.color &&
        item.image === newData.image
    );

    if (!isDuplicate) {
      const updatedCartData = [...existingCartData, newData];
      localStorage.setItem('cartData', JSON.stringify(updatedCartData));
      setCartData(updatedCartData);
    } else {
      // console.log("Data already add")
      console.log("This item already exists in the cart.");
    }
  };
  // console.log(cartData)

  // Load Data in LocalStorage
  useEffect(() => {
    const savedCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartData(savedCartData);
  }, []);
  console.log(cartData)


  // Total Amount & Total quantity Calculation
  const total = (cartData && cartData.length > 0) ?
    cartData.reduce(
      (acc, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        acc.totalPrice += price + item.quantity;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    )
    :
    { totalPrice: 0, totalQuantity: 0 };


  return (
    <div className="min-h-screen flex justify-center items-center bg-white py-12" >

      <div>

        <div className="flex gap-10" onClick={closeModal}>
          {/* Right Side ----- Product Image*/}

          <div className=" overflow-hidden rounded-lg shadow-md">
            <img src={currentImage} alt="" />
          </div>

          {/* Left Side ----- Product Details*/}
          <div className="flex justify-center items-center" >
            <div>
              {/* Title */}
              <h1 className="text-4xl text-[#364A63] font-bold mb-4">Classy Modern Smart watch</h1>
              {/* Rating */}
              <div className="flex items-center mb-4">

                <FaStar className="w-5 h-5 text-yellow-400" />
                <FaStar className="w-5 h-5 text-yellow-400 ml-1" />
                <FaStar className="w-5 h-5 text-yellow-400 ml-1" />
                <IoStarHalfOutline className="w-5 h-5 text-yellow-400 ml-1" />
                <FaRegStar className="w-5 h-5 text-yellow-400 ml-1" />

                <span className="text-[#8091A7] ml-2">(2 Reviews)</span>
              </div>
              {/* Price */}
              <div className="flex">
                <p className="text-xl text-[#8091A7] mt-1 line-through">$99.00</p>
                <p className="text-2xl text-[#6576FF] font-semibold ml-2">$79.00</p>
              </div>
              {/* Description */}
              <div className="mt-5">
                <p className="text-[#8091A7] text-[18px]">I must explain to you how all this mistaken idea of denoun cing ple praising <br /> pain was born and I will give you a complete account of the system, and <br /> expound the actual teaching.</p>
              </div>

              <div className="flex gap-8 mt-5">
                {/* Watch Type */}
                <div>
                  <p className="text-[#8091A7] text-[14px]">Type</p>
                  <p className="text-[#364A63] text-[16px] font-bold">Watch</p>
                </div>
                {/* Watch Model */}
                <div>
                  <p>Model Number</p>
                  <p className="text-[#364A63] text-[16px] font-bold">Forerunner 290XT</p>
                </div>
              </div>

              {/* Band Color */}
              <div className="mt-5">
                <h2 className="text-[18px] font-bold text-[#364A63] ">Band Color</h2>

                <div className="flex space-x-5">
                  {productsData.map((color, i) => (
                    <button
                      key={color.name}

                      className={`w-4 h-4 rounded-full mt-3  ${color.class} ${selectedColor === color.name ? `ring-2 ring-offset-2 ring-[#6e5fb2] ${currentImage === i ? "border-blue-500" : "border-gray-200"}` : ''
                        }`}
                      onClick={() => handleImageChange(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Wrist Size */}
              <div className="mt-6">
                <h2 className="text-[18px] font-bold text-[#364A63]">Wrist Size</h2>
                <div className="flex col-span-4 gap-3   justify-start">
                  {productsData.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size.label)}
                      className={`py-2 w-24  rounded-md mt-3 ${selectedSize === size.label
                        ? ' border border-[#6576FF] text-[#6576FF]'
                        : ' border text-gray-900 hover:text-[#6576FF]'
                        }`}

                    >
                      <span className='text-sm font-bold' onClick={() => setSelectedPrice(size.price)}>{size.label}</span> <span>{size.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* quantity && Add Button   */}

              <div className="flex  items-center space-x-4 mt-6">
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-3  text-[#8091A7] text-[18px]"
                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center border-x px-3 p-2 bg-white text-black"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                  <button
                    className="px-3 text-[#8091A7] text-[18px]"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-[#6576FF] text-white py-2 px-6 rounded-md " onClick={handleAddButton}>
                  Add to Cart
                </button>
                <button className=" w-96 text-[#6576FF]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

              </div>
            </div>
          </div>


          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10" >
              <div className="fixed inset-0 bg-[#11121B8C] bg-opacity-40   animate-fadeIn"></div>
              <div className="relative p-8 bg-white   rounded-2xl  shadow-lg z-20  animate-fadeIn">


                <div className="overflow-x-auto  rounded-lg">

                  <h1 className="text-[#364A63] text-[22px] font-bold">Your Cart</h1>

                  <table className="divide-y-2   bg-white  ">
                    <thead className="ltr:text-left rtl:text-right ">
                      <tr>
                        <th className="text-[#8091A7] text-left">Item</th>
                        <th className=" px-4 py-2 text-[#8091A7] ">Color</th>
                        <th className=" px-4 py-2 text-[#8091A7] ">Size</th>
                        <th className=" px-4 py-2 text-[#8091A7] ">Qnt</th>
                        <th className="text-right text-[#8091A7]">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">

                      {
                        cartData.map(cart => (
                          <tr key={cart.name} className="">
                            <td>
                              <div className="flex items-center gap-4 my-2">
                                <div className="">
                                  <div className="h-10 w-9 ">
                                    <img
                                      className="rounded-md"
                                      src={cart.image}
                                      alt={cart.name} />
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[14px] text-[#364A63] text-center">Classy Modern Smart watch</div>
                                </div>
                              </div>
                            </td>
                            <td className="text-[#364A63] text-[14px] text-center">{cart.color}</td>
                            <td className="text-[#364A63] text-[14px] font-bold text-center">{cart.size}</td>
                            <td className="text-[#364A63] text-[14px] font-bold text-center">{cart.quantity}</td>
                            <td className="text-[#364A63] text-[14px] font-bold text-center">{cart.price}.00</td>
                          </tr>
                        ))
                      }

                    </tbody>


                    <tfoot className="h-16 items-center ">
                      <tr className="mt-10 ">
                        <th className="text-start text-[#373737] text-xl">Total</th>
                        <th></th>
                        <th></th>
                        <th className="text-[#364A63]">{total.totalQuantity}</th>
                        <th className="text-[#364A63] font-bold text-xl">${total.totalPrice}.00</th>
                      </tr>
                    </tfoot>

                  </table>


                </div>


                <div className="flex justify-end gap-4 my-4">
                  <button className="bg-white text-[#364A63] border border-[#DBDFEA] p-2  rounded-md">Continue Shopping</button>
                  <button className=" bg-[#6576FF] text-white p-2 w-24 rounded-md">Checkout</button>
                </div>

              </div>
            </div>
          )}


        </div>

        {/* Check out Button  */}
        <div className="flex justify-center items-center mt-16">
          <button className="bg-[#FFBB5A] py-2 px-6 rounded-3xl text-[#364A63] font-bold " onClick={() => setIsOpen(true)}>Checkout <span className="bg-[#FFFFFF] px-2 py-1 rounded-lg">{cartData?.length}</span></button>
        </div>
      </div>



    </div>
  )
}

export default App