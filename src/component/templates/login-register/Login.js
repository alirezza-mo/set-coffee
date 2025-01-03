import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  const route = useRouter()

  const hideOtp = () => setLoginWithOtp(false);

  const loginWithPass = async () => {
    if (!phoneOrEmail) {
      return showSwal(
        "لطفا شماره تماس یا ایمیل را وارد نمایید.",
        "error",
        "متوجه شدم"
      );
    }
    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail) {
      return showSwal("لطفا ایمیل معتبر وارد نمایید.", "error", "متوجه شدم");
    }
    if (!password) {
      return showSwal("لطفا رمز عبور را وارد نمایید.", "error","متوجه شدم")
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("لطفا رمز عبور معتبر وارد نمایید.", "error", "متوجه شدم");
    }
    const user = {email:phoneOrEmail , password}
    const res = await fetch("/api/auth/signin" , {
      method : "POST" , 
      headers : {"Content-Type" : "application/json"} , 
      body : JSON.stringify(user)
    })
    const data = res.json()
    if(res.status === 200){
      return swal({
        title : "با موفقیت لاگین شدین",
        icon: "success" , 
        buttons : "ورود به پنل کاربری"
      }).then(()=>{
        route.replace("p-user")
      })
    } else if(res.status === 422 || res.status === 401){
      return showSwal("کاربری با این اطلاعات یافت نشد." , "error" , "متوجه شدم")
    }else if ( res.status=== 419){
      return showSwal("ایمیل و یا پسورد به درستی وارد نشده است.","error","متوجه شدم")
    }
  };

  return (
    <>
      {!loginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginWithPass} >ورود</button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              className={styles.btn}
              onClick={() => setLoginWithOtp(true)}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button className={styles.btn_light} onClick={showRegisterForm}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtp={hideOtp} />
      )}
    </>
  );
};

export default Login;
