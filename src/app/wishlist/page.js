
import Breadcrumb from "@/component/modules/breadcrumb/Breadcrumb";
import Footer from "@/component/modules/footer/Footer";
import Navbar from "@/component/modules/navbar/Navbar";
import Product from "@/component/modules/product/Product"
import connectToDB from "@/configs/db";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/Wishlist";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'

const page = async () => {
  let wishes = [];
  connectToDB();
  const token = cookies().get('token')  
  let user = null
  if(token){
    const tokenPayload = verifyAccessToken(token.value)
    if(tokenPayload) {
      user = await UserModel.findOne({email : tokenPayload.email})
    }
  }

  if (user) {
    wishes = await WishlistModel.find({ user: user._id })
      .populate("product", "name price score")
      .lean();
  }

  return (
    <>
      <Navbar />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
