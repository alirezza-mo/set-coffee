import React from "react";
import Layout from "@/component/layouts/AdminPanelLayout";
import styles from "@/component/templates/p-admin/tickets/table.module.css"
import Table from "@/component/templates/p-admin/tickets/Table"
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";

const page = async () => {
  connectToDB();
  const tickets = await TicketModel.find({ isAnswer: false })
  .populate("user")
  .populate("department")
    .sort({ _id: -1 })
    .lean();

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <Table
            tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست تیکت‌ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
