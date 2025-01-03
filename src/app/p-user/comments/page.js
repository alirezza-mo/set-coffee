import DataTable from "@/component/templates/p-user/comments/DataTable";
import Layout from "@/component/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'


const page = async () => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

  const comments = await CommentModel.find(
    { user: String(user._id) },
    "-__v"
  ).populate("productID", "name");

  console.log(comments);

  return (
    <Layout>
      <main>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </Layout>
  );
};

export default page;
