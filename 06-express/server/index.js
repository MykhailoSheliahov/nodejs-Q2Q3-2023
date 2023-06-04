const axios = require("axios");

const API_URL_CART = "http://localhost:3000/cart";
const API_URL_PRODUCT = "http://localhost:3000/product";
const API_URL_ORDER = "http://localhost:3000/order";

(async () => {
  const getCart = await axios.get(`${API_URL_CART}/profile/cart`, {
    params: {
      userId: "user2",
    },
  });
  console.log("🚀 ~ file: index.js:4 ~ json:", getCart.data);

  const putCart = await axios.put(
    `${API_URL_CART}/profile/cart`,
    {
      id: "2",
      items: [
        {
          product: {
            id: "2",
            title: "2",
            description: "2",
            price: 0,
          },
          count: 0,
        },
      ],
    },
    {
      params: {
        userId: "user2",
      },
    }
  );
  console.log(
    "🚀 ~ file: index.js:13 ~ putCart:",
    putCart.data.data.cart.items
  );

  const deleteCart = await axios.delete(`${API_URL_CART}/profile/cart`, {
    params: {
      userId: "user2",
    },
  });
  console.log("🚀 ~ file: index.js:4 ~ json:", deleteCart.data);

  const getCart2 = await axios.get(`${API_URL_CART}/profile/cart`, {
    params: {
      userId: "user2",
    },
  });
  console.log("🚀 ~ file: index.js:4 ~ json:", getCart2.data);

  const postCart = await axios.post(
    `${API_URL_CART}/profile/cart/checkout`,
    null,
    {
      params: { userId: "user2" },
    }
  );
  console.log("🚀 ~ file: index.js:4 ~ json:", postCart.data);

  const getProducts = await axios.get(`${API_URL_PRODUCT}/products`, {
    params: { userId: "user2" },
  });
  console.log("🚀 ~ file: index.js:4 ~ json:", getProducts.data);

  const getProductById = await axios.get(
    `${API_URL_PRODUCT}/products/melonId`,
    {
      params: { userId: "user2" },
    }
  );
  console.log("🚀 ~ file: index.js:4 ~ json:", getProductById.data);

  const postOrder = await axios.post(
    `${API_URL_ORDER}/profile/cart/checkout`,
    null,
    {
      params: { userId: "user2" },
    }
  );
  console.log("🚀 ~ file: index.js:4 ~ json:", postOrder.data);
})();
