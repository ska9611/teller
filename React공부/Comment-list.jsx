import React from 'react';
import Comment from './Comment';

const comments = [
  {
    abc: '팬텀',
    def: '상향좀',
  },
  {
    abc: '에반',
    def: '개사기',
  },
  {
    abc: '메르',
    def: '삭제좀',
  },
];

function CommentList(props) {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment abc={comment.abc} def={comment.def} />;
      })}
    </div>
  );
}

export default CommentList;
