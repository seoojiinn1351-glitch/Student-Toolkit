document.addEventListener("DOMContentLoaded", () => {
  // 1. 글자 수 계산기 요소
  const charInput = document.getElementById("char-input");
  const charExcludeSpace = document.getElementById("char-exclude-space");
  const charCalcBtn = document.getElementById("char-calc-btn");
  const charClearBtn = document.getElementById("char-clear-btn");
  const charResult = document.getElementById("char-result");

  // 2. D-day 계산기 요소
  const ddayTitle = document.getElementById("dday-title");
  const ddayDate = document.getElementById("dday-date");
  const ddayIncludeToday = document.getElementById("dday-include-today");
  const ddayCalcBtn = document.getElementById("dday-calc-btn");
  const ddayClearBtn = document.getElementById("dday-clear-btn");
  const ddayResult = document.getElementById("dday-result");

  // 3. 랜덤 순서 정하기 요소
  const orderNamesInput = document.getElementById("order-names-input");
  const orderShuffleBtn = document.getElementById("order-shuffle-btn");
  const orderResult = document.getElementById("order-result");

  // 4. 팀 구성하기 요소
  const teamMembersInput = document.getElementById("team-members-input");
  const teamCountSelect = document.getElementById("team-count-select");
  const teamBuildBtn = document.getElementById("team-build-btn");
  const teamResult = document.getElementById("team-result");

  // 5. 발표 시간 계산기 요소
  const speechScriptInput = document.getElementById("speech-script-input");
  const speechCalcBtn = document.getElementById("speech-calc-btn");
  const speechResult = document.getElementById("speech-result");

  // 6. 스톱워치 요소
  const stopwatchDisplay = document.getElementById("stopwatch-display");
  const stopwatchStartBtn = document.getElementById("stopwatch-start-btn");
  const stopwatchLapBtn = document.getElementById("stopwatch-lap-btn");
  const stopwatchResetBtn = document.getElementById("stopwatch-reset-btn");
  const stopwatchLaps = document.getElementById("stopwatch-laps");

  // 7. BMI 계산기 요소
  const bmiHeight = document.getElementById("bmi-height");
  const bmiWeight = document.getElementById("bmi-weight");
  const bmiCalcBtn = document.getElementById("bmi-calc-btn");
  const bmiResult = document.getElementById("bmi-result");

  // 8. 준비물 체크리스트 요소
  const checklistItemInput = document.getElementById("checklist-item-input");
  const checklistAddBtn = document.getElementById("checklist-add-btn");
  const checklistList = document.getElementById("checklist-list");
  const checklistResult = document.getElementById("checklist-result");


  // ==========================================
  // [기능 1] 글자 수 계산기
  // ==========================================
  function updateCharCount() {
    let text = charInput.value;

    if (charExcludeSpace.checked) {
      text = text.replace(/\s/g, "");
    }

    const length = text.length;
    const modeText = charExcludeSpace.checked ? "공백 제외" : "공백 포함";
    charResult.textContent = `총 ${length}자 (${modeText})`;
  }

  charInput.addEventListener("input", updateCharCount);
  charExcludeSpace.addEventListener("change", updateCharCount);
  charCalcBtn.addEventListener("click", updateCharCount);

  charClearBtn.addEventListener("click", () => {
    charInput.value = "";
    charExcludeSpace.checked = false;
    charResult.textContent = "총 0자";
  });


  // ==========================================
  // [기능 2] D-day 계산기
  // ==========================================
  function calculateDday() {
    const selectedValue = ddayDate.value;

    if (!selectedValue) {
      ddayResult.textContent = "목표 날짜를 먼저 선택해 주세요.";
      return;
    }

    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + kstOffset);
    const todayMidnight = Date.UTC(kstNow.getFullYear(), kstNow.getMonth(), kstNow.getDate());

    const [year, month, day] = selectedValue.split("-").map(Number);
    const targetMidnight = Date.UTC(year, month - 1, day);

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round((targetMidnight - todayMidnight) / msPerDay);

    const title = ddayTitle.value.trim();
    const prefix = title ? `[${title}] ` : "";
    let ddayText = "";

    if (ddayIncludeToday.checked && diffDays >= 0) {
      ddayText = `D-${diffDays + 1} (오늘 포함)`;
    } else if (diffDays > 0) {
      ddayText = `D-${diffDays}`;
    } else if (diffDays === 0) {
      ddayText = "D-Day";
    } else {
      ddayText = `D+${Math.abs(diffDays)}`;
    }

    ddayResult.textContent = `${prefix}${ddayText}`;
  }

  ddayDate.addEventListener("change", calculateDday);
  ddayIncludeToday.addEventListener("change", calculateDday);
  ddayCalcBtn.addEventListener("click", calculateDday);

  ddayClearBtn.addEventListener("click", () => {
    ddayTitle.value = "";
    ddayDate.value = "";
    ddayIncludeToday.checked = false;
    ddayResult.textContent = "날짜를 선택해 주세요.";
  });


  // ==========================================
  // [기능 3] 랜덤 순서 정하기
  // ==========================================
  orderShuffleBtn.addEventListener("click", () => {
    const lines = orderNamesInput.value.split("\n");
    const names = [];

    for (let i = 0; i < lines.length; i++) {
      const trimmedName = lines[i].trim();
      if (trimmedName !== "") {
        names.push(trimmedName);
      }
    }

    if (names.length === 0) {
      orderResult.textContent = "순서를 정할 이름을 한 줄에 한 명씩 입력해 주세요.";
      return;
    }

    for (let i = names.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = names[i];
      names[i] = names[randomIndex];
      names[randomIndex] = temp;
    }

    let resultHTML = "";
    for (let i = 0; i < names.length; i++) {
      resultHTML += `${i + 1}. ${names[i]}`;
      if (i < names.length - 1) {
        resultHTML += "<br>";
      }
    }

    orderResult.innerHTML = resultHTML;
  });


  // ==========================================
  // [기능 4] 팀 구성하기
  // ==========================================
  teamBuildBtn.addEventListener("click", () => {
    const rawMembers = teamMembersInput.value.split(/[\n,]+/);
    const members = [];

    for (let i = 0; i < rawMembers.length; i++) {
      const name = rawMembers[i].trim();
      if (name !== "") {
        members.push(name);
      }
    }

    const teamCount = Number(teamCountSelect.value);

    if (members.length === 0) {
      teamResult.textContent = "참여자 이름을 입력해 주세요.";
      return;
    }

    if (members.length < teamCount) {
      teamResult.textContent = `참여자 수(${members.length}명)가 팀 수(${teamCount}팀)보다 적습니다.`;
      return;
    }

    for (let i = members.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = members[i];
      members[i] = members[randomIndex];
      members[randomIndex] = temp;
    }

    const teams = Array.from({ length: teamCount }, () => []);
    for (let i = 0; i < members.length; i++) {
      teams[i % teamCount].push(members[i]);
    }

    let resultHTML = "";
    for (let i = 0; i < teams.length; i++) {
      resultHTML += `<strong>${i + 1}팀:</strong> ${teams[i].join(", ")}`;
      if (i < teams.length - 1) {
        resultHTML += "<br>";
      }
    }

    teamResult.innerHTML = resultHTML;
  });


  // ==========================================
  // [기능 5] 발표 시간 계산기
  // ==========================================
  function calculateSpeechTime() {
    const scriptText = speechScriptInput.value.replace(/\s/g, "");
    const charCount = scriptText.length;

    if (charCount === 0) {
      speechResult.textContent = "발표 대본을 입력해 주세요.";
      return;
    }

    const selectedSpeed = document.querySelector('input[name="speech-speed"]:checked').value;
    const charsPerMinute = {
      slow: 250,
      normal: 320,
      fast: 400
    }[selectedSpeed];

    const totalSeconds = Math.round((charCount / charsPerMinute) * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    speechResult.textContent = `예상 발표 시간: ${minutes}분 ${seconds}초 (공백 제외 ${charCount}자)`;
  }

  speechCalcBtn.addEventListener("click", calculateSpeechTime);
  document.querySelectorAll('input[name="speech-speed"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (speechScriptInput.value.trim() !== "") {
        calculateSpeechTime();
      }
    });
  });


  // ==========================================
  // [기능 6] 스톱워치
  // ==========================================
  let stopwatchTimer = null;
  let elapsedMs = 0;
  let lastStartTime = 0;
  let lapRecords = [];

  function formatTime(ms) {
    const totalCentiseconds = Math.floor(ms / 10);
    const centiseconds = String(totalCentiseconds % 100).padStart(2, "0");
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    return `${minutes}:${seconds}.${centiseconds}`;
  }

  stopwatchStartBtn.addEventListener("click", () => {
    if (stopwatchTimer === null) {
      lastStartTime = Date.now() - elapsedMs;
      stopwatchTimer = setInterval(() => {
        elapsedMs = Date.now() - lastStartTime;
        stopwatchDisplay.textContent = formatTime(elapsedMs);
      }, 10);
      stopwatchStartBtn.textContent = "일시정지";
    } else {
      clearInterval(stopwatchTimer);
      stopwatchTimer = null;
      stopwatchStartBtn.textContent = "계속";
    }
  });

  stopwatchLapBtn.addEventListener("click", () => {
    if (elapsedMs === 0) {
      return;
    }
    lapRecords.push(formatTime(elapsedMs));
    let lapsHTML = "";
    for (let i = 0; i < lapRecords.length; i++) {
      lapsHTML += `구간 ${i + 1}: ${lapRecords[i]}`;
      if (i < lapRecords.length - 1) {
        lapsHTML += "<br>";
      }
    }
    stopwatchLaps.innerHTML = lapsHTML;
  });

  stopwatchResetBtn.addEventListener("click", () => {
    clearInterval(stopwatchTimer);
    stopwatchTimer = null;
    elapsedMs = 0;
    lapRecords = [];
    stopwatchDisplay.textContent = "00:00.00";
    stopwatchStartBtn.textContent = "시작";
    stopwatchLaps.textContent = "구간 기록이 없습니다.";
  });


  // ==========================================
  // [기능 7] BMI 계산기
  // ==========================================
  bmiCalcBtn.addEventListener("click", () => {
    const heightCm = parseFloat(bmiHeight.value);
    const weightKg = parseFloat(bmiWeight.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      bmiResult.textContent = "올바른 신장(cm)과 체중(kg)을 입력해 주세요.";
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiFixed = bmi.toFixed(1);

    let status = "";
    if (bmi < 18.5) {
      status = "저체중";
    } else if (bmi < 23) {
      status = "정상";
    } else if (bmi < 25) {
      status = "과체중";
    } else {
      status = "비만";
    }

    bmiResult.textContent = `BMI 수치: ${bmiFixed} (상태: ${status})`;
  });


  // ==========================================
  // [기능 8] 준비물 체크리스트
  // ==========================================
  function updateChecklistSummary() {
    const checkboxes = checklistList.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedCount++;
      }
    }

    checklistResult.textContent = `완료: ${checkedCount} / ${checkboxes.length}개`;
  }

  function addChecklistItem() {
    const itemText = checklistItemInput.value.trim();
    if (itemText === "") {
      return;
    }

    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = itemText;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "삭제";

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    checklistList.appendChild(li);

    checklistItemInput.value = "";
    updateChecklistSummary();
  }

  checklistAddBtn.addEventListener("click", addChecklistItem);

  checklistItemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChecklistItem();
    }
  });

  checklistList.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      updateChecklistSummary();
    }
  });

  checklistList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      e.target.closest("li").remove();
      updateChecklistSummary();
    }
  });

  console.log("Student Toolkit 모던 리넨 & 테라코타 버전이 로드되었습니다.");
});