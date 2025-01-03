import styles from "@/styles/product.module.css";
import Gallery from "@/component/templates/product/Gallery";
import Details from "@/component/templates/product/Details";
import Tabs from "@/component/templates/product/Tabs";
import MoreProducts from "@/component/templates/product/MoreProducts";

import Footer from "@/component/modules/footer/Footer";
import Navbar from "@/component/modules/navbar/Navbar";

import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

const product = async ({ params }) => {
  const token = cookies().get("token");
  let user = null;
  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

  connectToDB();
  const productID = params.id;
  const product = await ProductModel.findOne({ _id: productID }).populate("comments")
  const relatedProducts = await ProductModel.find({ smell: product.smell });
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
