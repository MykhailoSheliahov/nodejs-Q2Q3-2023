const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "./../../", ".env") });

const API_URL_CART = "http://localhost:3000/cart";
const API_URL_PRODUCT = "http://localhost:3000/product";
const API_URL_ORDER = "http://localhost:3000/order";
const API_URL_REGISTER = "http://localhost:3000/register";
const API_URL_LOGIN = "http://localhost:3000/login";
const AuthStr = "Bearer " + process.env.TOKEN_KEY;

(async () => {
  // const putCart = await axios.put(
  //   `${API_URL_CART}`,
  //   {
  //     items: [
  //       {
  //         product: {
  //           title: "Kiwi",
  //           description: "Kiwi description",
  //           price: 100,
  //         },
  //         count: 5,
  //       },
  //     ],
  //   },
  //   {
  //     params: {
  //       userId: process.env.CURRENT_USER,
  //     },
  //   }
  // );
  // console.log(
  //   "🚀 ~ file: index.js:13 ~ putCart:",
  //   putCart.data
  // );

  // const deleteCart = await axios.delete(`${API_URL_CART}`, {
  //   params: {
  //     userId: process.env.CURRENT_USER,
  //   },
  // });
  // console.log("🚀 ~ file: index.js:4 ~ json:", deleteCart.data);

  // const getCart3 = await axios.get(`${API_URL_CART}`, {
  //   params: {
  //     userId: process.env.CURRENT_USER,
  //   },
  // });
  // console.log("🚀 ~ file: index.js:4 ~ json:", getCart3.data);

  // const postCart = await axios.post(
  //   `${API_URL_CART}/checkout`,
  //   null,
  //   {
  //     params: { userId: process.env.CURRENT_USER },
  //   }
  // );
  // console.log("🚀 ~ file: index.js:4 ~ json:", postCart.data);

  // const getProducts = await axios.get(`${API_URL_PRODUCT}`);
  // console.log("🚀 ~ file: index.js:4 ~ json:", getProducts.data);

  // const getProductById = await axios.get(
  //   `${API_URL_PRODUCT}/3`,);
  // console.log("🚀 ~ file: index.js:4 ~ json:", getProductById.data);

  // const postOrder = await axios.post(
  //   `${API_URL_ORDER}/checkout`,
  //   null,
  //   {
  //     params: { userId: process.env.CURRENT_USER },
  //   }
  // );
  // console.log("🚀 ~ file: index.js:4 ~ json:", postOrder.data);

  // const postCart = await axios.post(`${API_URL_REGISTER}/`, {
  //   params: {
  //     first_name: "John",
  //     last_name: "Snow",
  //     email: "johnsnow@gmail.com1",
  //     password: "johnsnow",
  //     isCartOwner: true,
  //   },
  // });

  // const getCart = await axios.get(`${API_URL_CART}`, {
  //   headers: { Authorization: AuthStr },
  //   params: {
  //     userId: process.env.CURRENT_USER,
  //   },
  // });
  // console.log("🚀 ~ file: index.js:4 ~ json:", getCart.data);

  const postCart = await axios.post(`${API_URL_LOGIN}/`, {
    params: {
      email: "johnsnow@gmail.com1",
      password: "johnsnow",
      // email: "tonistark@gmail.com",
      // password: "tonistark"
      // email: "saraconor@gmail.com",
      // password: "saraconor",
    },
  });

  console.log("🚀 ~ file: index.js:4 ~ json:", postCart.data.token);

   const putCart = await axios.put(
    `${API_URL_CART}`,
    {
      items: [
        {
          product: {
            title: "Kiwi",
            description: "Kiwi description",
            price: 100,
          },
          count: 5,
        },
      ],
    },
    {
      headers: { 'Authorization': `Bearer ${postCart.data.token}` },
      params: {
        userId: 5,
      },
    }
  );
  console.log(
    "🚀 ~ file: index.js:13 ~ putCart:",
    putCart.data
  );

  const getCart2 = await axios.get(`${API_URL_CART}`, {
    headers: { 'Authorization': `Bearer ${postCart.data.token}` },
    // params: {
    //   userId: process.env.CURRENT_USER,
    // },
  });
  console.log("🚀 ~ file: index.js:4 ~ json:", getCart2.data);
})();
