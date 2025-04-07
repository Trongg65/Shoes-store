import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };

  const handleUpdateQuantity = (productId, size, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, size, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-red-500 font-semibold">
                  {item.price.toLocaleString('vi-VN')} VND
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity + 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id, item.size)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
            <div className="flex justify-between mb-2">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString('vi-VN')} VND</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Phí vận chuyển:</span>
              <span>0 VND</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString('vi-VN')} VND</span>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 