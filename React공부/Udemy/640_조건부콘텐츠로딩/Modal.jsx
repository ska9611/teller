import classes from './Modal.module.css';

function Modal({ children, onClose }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />{' '}
      {/* onClose 속성을 통해 넘겨받은 함수가 onClick 속성의 값으로 설정 된다. Click 이벤트 리스너와 hideModalHandler()함수가 연결되는 것*/}
      <dialog open={true} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}
