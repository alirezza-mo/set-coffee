import React from "react";
import Layout from "@/component/layouts/AdminPanelLayout";
import styles from '@/component/templates/p-admin/users/table.module.css'
import Table from "@/component/templates/p-admin/discounts/Table";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

const page = async () => {
  connectToDB();
  const users = await UserModel.find({}).lean();

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <Table
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
