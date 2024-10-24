document.addEventListener("DOMContentLoaded", function () {
  const textContainer = document.getElementById("text-container");
  const words = textContainer.innerText.split(/\s+/); // 단어별로 분리
  textContainer.innerHTML = ""; // 기존 텍스트 제거

  // 각 단어를 span으로 감싸기
  words.forEach((word) => {
    const span = document.createElement("span");
    span.classList.add("draggable");
    span.textContent = word + " "; // 단어와 공백 추가
    textContainer.appendChild(span);
  });

  const spanWords = document.querySelectorAll(".draggable");

  // 단어 클릭 시 움직이도록 설정
  spanWords.forEach((word) => {
    word.addEventListener("click", (event) => {
      const randomX = Math.random() * window.innerWidth - window.innerWidth / 2;
      const randomY =
        Math.random() * window.innerHeight - window.innerHeight / 2;

      word.style.transition = "transform 2s ease-in-out";
      word.style.transform = `translate(${randomX}px, ${randomY}px)`;

      createBlurDot(event.pageX, event.pageY);
    });

    // 단어 더블클릭 시 텍스트 입력 필드 생성
    word.addEventListener("dblclick", (event) => {
      event.preventDefault(); // 기본 선택 동작 방지
      createInputField(event.pageX, event.pageY);
    });
  });

  // 클릭한 위치에 블러 점을 생성하는 함수
  function createBlurDot(x, y) {
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.width = "30px";
    dot.style.height = "30px";
    dot.style.backgroundColor = "rgb(162, 161, 173)";
    dot.style.borderRadius = "50%";
    dot.style.filter = "blur(3px)";
    dot.style.left = `${x - 2}px`;
    dot.style.top = `${y - 2}px`;
    dot.style.pointerEvents = "none";
    document.body.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 10000);
  }

  // 더블클릭한 위치에 입력 필드를 생성하는 함수
  function createInputField(x, y) {
    const input = document.createElement("input");
    input.type = "text";
    input.style.position = "absolute";
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.style.zIndex = 1000;
    input.style.backgroundColor = "transparent"; // 배경 투명
    input.style.border = "none"; // 테두리 없음
    input.style.color = "white"; // 텍스트 색상
    input.style.fontSize = "30px"; // 텍스트 크기
    input.style.fontFamily = "Steinbeck"; // 폰트 설정
    input.style.lineHeight = "1"; // line-height 추가
    input.style.padding = "0"; // 패딩 제거
    input.style.margin = "0"; // 마진 제거
    input.style.outline = "none"; // 포커스 시 외곽선 제거
    document.body.appendChild(input);

    // 입력 필드에서 Enter를 누르면 텍스트를 추가
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const userText = input.value;
        if (userText.trim() !== "") {
          const span = document.createElement("span");
          span.classList.add("draggable", "red-text"); // 빨간색 텍스트 클래스 추가
          span.textContent = userText + " "; // 텍스트와 공백 추가
          span.style.position = "absolute";
          span.style.left = `${x}px`;
          span.style.top = `${y}px`;
          span.style.fontFamily = "Steinbeck"; // 폰트 설정
          span.style.fontSize = "30px"; // 텍스트 크기
          span.style.lineHeight = "1"; // line-height 일치
          span.style.margin = "0"; // 마진 제거
          span.style.padding = "0"; // 패딩 제거
          textContainer.appendChild(span);

          // 추가된 텍스트도 클릭 시 움직이도록 설정
          span.addEventListener("click", (event) => {
            const randomX =
              Math.random() * window.innerWidth - window.innerWidth / 2;
            const randomY =
              Math.random() * window.innerHeight - window.innerHeight / 2;
            span.style.transition = "transform 2s ease-in-out";
            span.style.transform = `translate(${randomX}px, ${randomY}px)`;
            createBlurDot(event.pageX, event.pageY);
          });

          input.remove(); // 텍스트 추가 후 입력 필드를 제거
        }
      }
    });

    // 자동으로 입력 필드에 포커스
    input.focus();
  }
});
