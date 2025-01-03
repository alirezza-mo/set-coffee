import Layout from "@/component/layouts/UserPanelLayout";
import Tickets from "@/component/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'

import TicketModel from "@/models/Ticket";

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
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .populate("department", "title")
    .sort({ _id: -1 });

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
