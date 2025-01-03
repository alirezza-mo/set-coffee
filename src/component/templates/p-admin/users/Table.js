import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
export default function DataTable({ users, title }) {
  const route = useRouter()
  const changeRole = async (userID) => {
    const res = await fetch('/api/user/role' , {
      method : "PUT" , 
      headers : { "Content-Type" : "application/json" } , 
      body : JSON.parse(JSON.stringify(userID))
    })
    if(res.status === 200) {
      swal({
        title : "با موفقیت تغییر نقش یافت", 
        icon : "success" , 
        button : "فهمیدم"
      }).then(()=> {
        route.prefetch()
      })
    }

  }
  const deleteUser = async (userID) => {
   swal({
    title : "آیا از حذف کاربر مطمئن هستید؟",
    icon : "warning",
    buttons : ["خیر","بلی"]
   }).then( async (result)=>{
    if(result){
      const res = await fetch('/api/user' , {
        method : "DELETE" ,
        headers : { "Content-Type" : "application/json" } ,
        body : JSON.parse(JSON.stringify(userID))
      })
      if(res.status === 200){
        swal({
          title : "با موفقیت حذف شد",
          icon : "success",
          button : "فهمیدم"
        }).then(()=>{
          route.prefetch()
        })
      }
    }
   })

  }
  const banUser = async (email , phone) => {
    swal({
      title : "آیا از بن کردن کاربر مطمئن هستید؟",
      icon : "warning",
      buttons : ["خیر","بلی"]
     }).then( async (result)=>{
      if(result){
        const res = await fetch('/api/user/ban' , {
          method : "POST" ,
          headers : { "Content-Type" : "application/json" } ,
          body : JSON.parse(JSON.stringify(email , phone))
        })
        if(res.status === 200){
          swal({
            title : "با موفقیت بن شد",
            icon : "success",
            button : "فهمیدم"
          }).then(()=>{
            route.prefetch()
          })
        }
      }
     })
  }
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn} onClick={changeRole(user._id)} >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} onClick={deleteUser(user._id)} >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} onClick={banUser(user.email , user.phone)} >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
