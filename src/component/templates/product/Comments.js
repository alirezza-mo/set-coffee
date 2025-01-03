import Comment from "@/component/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ productID , comments , name }) => {
  return (
    <div>
      <p>نظرات ({comments.filter((comment) => comment.isAccept)?.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {name}
          </p>
          <div>
            {comments.map(comment => comment.isAccept && <Comment {...comment} key={comment._id} /> )}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
