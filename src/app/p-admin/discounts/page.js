import Layout from "@/component/layouts/AdminPanelLayout";
import Table from "@/component/templates/p-admin/discounts/Table";
import styles from "@/component/templates/p-admin/discounts/table.module.css";
import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import AddDiscount from "@/component/templates/p-admin/discounts/AddDiscount";

const Discounts = async () => {
  connectToDB();
  const discounts = await DiscountModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>
      <main>
        <AddDiscount />

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
