import { MdPostAdd, MdMessage } from 'react-icons/md'; // 이걸 불러오기 위해서 npm install react-icons 명령어를 실행하자
import { Link } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader({}) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
