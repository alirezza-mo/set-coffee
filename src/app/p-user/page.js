import Layout from "@/component/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/component/modules/infoBox/InfoBox";
import Tickets from "@/component/templates/p-user/index/Tickets";
import Orders from "@/component/templates/p-user/index/Orders";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishlistModel from "@/models/Wishlist";
import connectToDB from "@/configs/db";

const page = async () => {
  connectToDB();
  const token = cookies().get('token')  
  let user = null
  if(token){
    const tokenPayload = verifyAccessToken(token.value)
    if(tokenPayload) {
      user = await UserModel.findOne({email : tokenPayload.email})
    }
  }
  console.log(token);
  
  const tickets = await TicketModel.find({ user: user._id })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();

  const allTickets = await TicketModel.find({ user: user._id });
  const comments = await CommentModel.find({ user: String(user._id) });
  const wishes = await WishlistModel.find({ user: user._id });

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishes.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;