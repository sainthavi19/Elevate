document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waterIntakeForm");
  const drankInput = document.getElementById("drank");
  const unitSelect = document.getElementById("unit");
  const goalInput = document.getElementById("goal");
  const calculateBtn = document.getElementById("calculateBtn");
  const drankDisplay = document.getElementById("drankDisplay");
  const goalDisplay = document.getElementById("goalDisplay");
  const progressBar = document.getElementById("progressBar");
  const progressPercentage = document.getElementById("progressPercentage");
  const goalAchievedMessage = document.getElementById("goalAchievedMessage");
  const historyList = document.getElementById("historyList");
  const sortSelect = document.getElementById("sort");
  const undoBtn = document.getElementById("undoBtn");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  let consumedAmount = 0;
  let goalAmount = 0;
  let history = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(drankInput.value);
    const unit = unitSelect.value;
    goalAmount = parseFloat(goalInput.value);
    if (amount && goalAmount) {
      consumedAmount += convertToMl(amount, unit);
      drankInput.value = "";
      calculateWaterIntake();
      addToHistory(amount, unit);
    }
  });
  sortSelect.addEventListener("change", () => {
    updateHistoryList();
  });
  undoBtn.addEventListener("click", () => {
    undoLastEntry();
  });
  clearHistoryBtn.addEventListener("click", () => {
    clearHistory();
  });
  function convertToMl(amount, unit) {
    if (unit === "ml") {
      return amount * 29.5735;
    } else if (unit === "l") {
      return amount * 1000;
    } else {
      return amount;
    }
  }
  function calculateWaterIntake() {
    drankDisplay.textContent = consumedAmount;
    goalDisplay.textContent = goalAmount;
    const progress = (consumedAmount / goalAmount) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    if (consumedAmount >= goalAmount) {
      goalAchievedMessage.textContent = "Congratulations! You've reached your daily goal.";
    } else {
      goalAchievedMessage.textContent = "";
    }
  }
  function addToHistory(amount, unit) {
    const entry = {
      amount: amount,
      unit: unit,
      date: new Date().toLocaleString(),
    };
    history.unshift(entry);
    updateHistoryList();
  }
  function updateHistoryList() {
    historyList.innerHTML = "";
    let sortedHistory = [...history];
    if (sortSelect.value === "amount") {
      sortedHistory.sort((a, b) => b.amount - a.amount);
    } else {
      sortedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    sortedHistory.forEach((entry) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${entry.amount} ${entry.unit} - ${entry.date}`;
      historyList.appendChild(listItem);
    });
  }
  function undoLastEntry() {
    if (history.length > 0) {
      const lastEntry = history.shift();
      consumedAmount -= convertToMl(lastEntry.amount, lastEntry.unit);
      calculateWaterIntake();
      updateHistoryList();
    }
  }
  function clearHistory() {
    history = [];
    updateHistoryList();
  }
});
