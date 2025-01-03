"use client";
import { FaFacebookF, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "./AddToWishlist";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";

const Details = ({ product }) => {
  const [count, setCount] = useState(0);
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length) {
      const isInCart = cart.some((item) => item.id === product._id);
      if (isInCart) {
        cart.forEach((item) => {
          if (item.id === product._id) {
            item.count = item.count + count;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        const cartItem = {
          id: product._id,
          name: product.name,
          price: product.price,
          count,
        };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        showSwal("با موفقیت به سبد خرید اضافه شد :)", "success", "تایید");
      }
    } else {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        count,
      };
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      showSwal("با موفقیت به سبد خرید اضافه شد :)", "success", "تایید");
    }
  };
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb
        title={
          `${product.name}`
        }
      />
      <h2>{product.name}</h2>

      <div className={styles.rating}>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p>(دیدگاه {product.comments.length} کاربر)</p>
      </div>

      <p className={styles.price}> {product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product.shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button onClick={addToCart}>افزودن به سبد خرید</button>
        <div>
          <span onClick={() => setCount(count - 1)}>-</span>
           {count}{" "}
          <span onClick={() => setCount(count + 1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishlist />
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: GOLD Nespresso Compatible capsule</strong>
        <p>
          {" "}
          <strong>دسته:</strong> {
            product.tags.map(tag => `, ${tag}`)
          }
        </p>
        <p>
          <strong>برچسب:</strong> کپسول قهوه،کپسول قهوه ست پرسو،کپسول قهوه
          ایرانی،کپسول قهوه نسپرسو ایرانی،قهوه ست ، Setpresso،Gold Setpresso
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
