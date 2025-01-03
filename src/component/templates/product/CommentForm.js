import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
const CommentForm = ({productID}) => {
  const [username , setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [body , setBody] = useState("")
  const [score , setScore] = useState(5)
  const [isSaveInfo , setIsSaveInfo] = useState(false)
  const setCommentScore = (score) => {
    setScore(score)
    return showSwal("امتیاز شما ثبت گردید","success","متوجه شدم")
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(userInfo){
      setUsername(userInfo.username)
      setEmail(userInfo.email)
    }
  },[])
  const handleSubmit = async () => {
    if(isSaveInfo){
      const userInfo = {
        username ,
        email
      }
      console.log(userInfo);
      
      localStorage.setItem("userInfo" , JSON.stringify(userInfo))
    }
    let comment = {
      username , email , body , score , productID
    }
    const res = await fetch("/api/comments" , {
      method : "POST" , 
      headers : {"Content-Type" :"application/json" } ,
      body : JSON.stringify(comment) 
    })
    if(res.status === 201){
      return showSwal("کامنت شما به درستی ثبت گردید","success","متوجه شدم")
    }
  }
  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(5) }/>
          <IoMdStar onClick={() => setCommentScore(4) }/>
          <IoMdStar onClick={() => setCommentScore(3) }/>
          <IoMdStar onClick={() => setCommentScore(2) }/>
          <IoMdStar onClick={() => setCommentScore(1) }/>
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" value={isSaveInfo} onChange={e => setIsSaveInfo(prev => !prev)} />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={handleSubmit}>ثبت</button>
    </div>
  );
};

export default CommentForm;
