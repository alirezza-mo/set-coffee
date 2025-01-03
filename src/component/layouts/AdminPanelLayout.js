import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "../modules/p-admin/Sidebar";
import Topbar from "../modules/p-admin/Topbor";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/User";
import { redirect } from "next/navigation";
import connectToDB from "@/configs/db";

const Layout = async ({ children }) => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }
  if (user) {
    if (user.model === "USER") {
      redirect("/login-register");
    }
  } else {
    redirect("/login-register");
  }


  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar name = {user.name} role = {user.role} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
