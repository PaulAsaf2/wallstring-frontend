<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallstring</title>
  <link rel="stylesheet" href="style.css" type="text/css">
  <link rel="stylesheet" href="styles/range.css" type="text/css">
  <link rel="stylesheet" href="styles/meditation.css" type="text/css">
  <link rel="stylesheet" href="styles/circle.css" type="text/css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</head>
<body>
  <header class="header_cont">
    <button
      type="button"
      class="square_btn setting_btn"
    ></button>
    <div class="range-slider">
      <input
        type="range"
        min="1"
        max="5"
        value="1"
        id="range"
      />
      <div class="sliderticks">
        <span>0.5</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
    </div>
    <button
      type="button"
      class="close_btn"
    ></button>
  </header>

  <div class="meditation">
    <button
      type="button"
      class="square_btn meditaion_btn_off"
      onclick="toggleMeditation()"
    ></button>
    <div class="meditation_text">
      Режим медитации включен
      <div class="meditation_triangle"></div>
    </div>
  </div>

  <main class="main">
    <div class="circle">
      <img
        src="./assets/arrow.svg"
        alt="arrow"
        class="circle_arrow"
      >
      <div class="circle_point source_point">B31</div>
      <div class="circle_point target_point">B31</div>
    </div>
    <h2 class="step">ШАГ 1 из 15000</h2>
    <img 
      src="./assets//progress-bar.svg"
      alt="progress bar"
      class="progress_bar"
    >
    <p class="description">
      Перед началом, пожалуйста, закрепите нить на гвозде с маркировкой B31. 
      Готовы? Нажмите кнопку "Старт", чтобы приступить.
    </p>
    <button
      type="button"
      class="rectangular_btn trigger_btn"
      onclick="togglePlay()"
      >Начать
    </button>
  </main>

  <div class="popup_dont_worry">
    <h1 class="worry_title">
      Не волнуйтесь, если вам потребуется сделать паузу или выйти из приложения. 
      Ваш прогресс сохранится автоматически, и вы сможете продолжить с того же 
      места при следующем входе.
    </h1>
    <button
      type="button"
      class="rectangular_btn"
      onclick="closePopup()"
      >Продолжить
    </button>
  </div>

<script src="script.js"></script>
</body>
</html>