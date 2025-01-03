import React from "react";
import Layout from "@/component/layouts/AdminPanelLayout";
import styles from "@/component//templates/p-admin/products/table.module.css"
import Table from '@/component/templates/p-admin/products/Table'
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import AddProduct from "@/component/templates/p-admin/products/AddProduct";

const page = async () => {
  connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

  return (  
    <Layout>
      <main>
      <AddProduct />
        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست محصولات"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
