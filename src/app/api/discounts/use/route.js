import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";

export async function PUT(req) {
  try {
    connectToDB();
    const body = req.json();
    const { code } = body;
    const discount = await DiscountModel.findOne({ code });
    await DiscountModel.findOneAndUpdate({code} , {
      $inc : {
        uses : 1
      }
    })
    if (!discount) {
      return Response.json({ message: "code not found !" }, { status: 404 });
    } else if (discount.uses === discount.maxUse) {
      return Response.json({ message: "code usage limit" }, { status: 422 });
    } else {
      return Response.json(discount);
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
