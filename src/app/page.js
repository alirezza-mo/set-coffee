import Articles from '@/component/templates/index/articles/Articles'
import Banner from '@/component/templates/index/banner/Banner'
import Latest from '@/component/templates/index/latest/Latest'
import Promote from '@/component/templates/index/promote/Promote'
import Navbar from '@/component/modules/navbar/Navbar'
import Footer from '@/component/modules/footer/Footer'
import React from 'react'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'
import connectToDB from '@/configs/db'
import ProductModel from '@/models/Product'


async function page() {
  connectToDB()
  let user = null
  const token =  cookies().get('token')  
  if(token){
    const tokenPayload = verifyAccessToken(token.value)
    if(tokenPayload) {
      user = await UserModel.findOne({email : tokenPayload.email})
    }
  }
  const latestProducts = await ProductModel.find({}).sort({_id: -1}).limit(8)
  console.log(latestProducts);
  
  return (
    <>
      <Navbar isLogin = {user ? true : false} />
      <Banner/>
      <Latest products = {JSON.parse(JSON.stringify(latestProducts))}/>
      <Promote/>
      <Articles/>
      <Footer/>
    </>
  )
}

export default page