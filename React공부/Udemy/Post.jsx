const names = ['한영훈', '루미너스', '영웅'];

function Post() {
  const randomValue = Math.random();
  const chosenName =
    randomValue >= 0.7 ? names[0] : randomValue >= 0.4 ? names[1] : names[2];
  // Math.random은 0 이상 1 미만의 무작위 부동소수점 숫자를 반환 하는
  // 기본적인 함수. 여기서 반환하는 값이 0.5 이상이면 names 배열의 인덱스 값이 0인
  // 한영훈을 호출하고, 아니면 루미너스를 호출하게끔 만들었다

  return (
    <div>
      <p>{chosenName}</p>
      <p>살려주시라요</p>
    </div>
  );
}

export default Post;
