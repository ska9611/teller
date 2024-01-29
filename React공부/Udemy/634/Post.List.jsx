import Post from './Post';
import classes from './PostList.module.css';

function PostList() {
  return (
    <ul className={classes.posts}>
      <Post author="운전병123" body="직업은 루미" />
      <Post author="삼루트아델" body=" 아델" />
      <Post author="카우욱" body="신궁" />
    </ul>
  );
}

export default PostList;
