import Breadcrumb from "@/component/modules/breadcrumb/Breadcrumb";
import Navbar from "@/component/modules/navbar/Navbar";
import Footer from "@/component/modules/footer/Footer";
import Form from "@/component/templates/contact-us/Form";
import Information from "@/component/templates/contact-us/Information";
import Map from "@/component/templates/contact-us/Map";
import styles from "@/styles/contact-us.module.css";
import Link from "next/link";

import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'


const page = async () => {

  const token = await cookies().get('token')  
  let user = null
  if(token){
    const tokenPayload = verifyAccessToken(token.value)
    if(tokenPayload) {
      user = await UserModel.findOne({email : tokenPayload.email})
    }
  }


  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"تماس با ما"} />

      <div className={styles.container}>
        <main className={styles.maps}>
          <section>
            <Map
              position={[35.72021225108499, 51.42222691580869]}
              center={[35.72021225108499, 51.42222691580869]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[35.70153474690238, 51.41497422314844]}
              center={[35.70153474690238, 51.41497422314844]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
        </main>
      </div>

      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
