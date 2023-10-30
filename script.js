// Thermometer Section
const goal = 10000000;
let totalSavings = 0;
const additionalSavingsInput = document.getElementById("additional-savings");
const mercury = document.getElementById("mercury");
const savingsAmountSpan = document.getElementById("savings-amount");
const messageElement = document.getElementById("message");

document
  .getElementById("update-button")
  .addEventListener("click", updateThermometer);

function updateThermometer() {
  const additionalSavings = parseFloat(additionalSavingsInput.value) || 0;
  totalSavings += additionalSavings;

  const percentage = (totalSavings / goal) * 100;
  const mercuryHeight = `${percentage > 100 ? 100 : percentage}%`;
  mercury.style.height = mercuryHeight;

  savingsAmountSpan.textContent = totalSavings.toLocaleString(); // Format number with commas

  if (totalSavings >= goal) {
    messageElement.textContent = "Markmiði náð!";
  } else {
    messageElement.textContent = "";
  }
}

// Time Section
const goal2 = 128;
let totalTime = 0;
const additionalTimeInput = document.getElementById("additional-time");
const mercury2 = document.getElementById("mercury2");
const timeAmountSpan = document.getElementById("time-amount");
const message2 = document.getElementById("message2");

document
  .getElementById("update-button2")
  .addEventListener("click", updateThermometer2);

function updateThermometer2() {
  const additionalTime = parseFloat(additionalTimeInput.value) || 0;
  totalTime += additionalTime;

  const percentage2 = (totalTime / goal2) * 100;
  const mercuryHeight2 = `${percentage2 > 100 ? 100 : percentage2}%`;
  mercury2.style.height = mercuryHeight2;

  timeAmountSpan.textContent = totalTime;

  if (totalTime > goal2) {
    message2.textContent = "Yfir áætluðum tímafjölda";
  } else {
    message2.textContent = "";
  }
}

// Goal Section 1
const goalProgressContainer = document.getElementById("goal-progress");

// Function to create goal circles
function createGoalCircles(container, numCircles) {
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("goal-circle");

    // Add checkmark element inside the circle
    const checkmark = document.createElement("div");
    checkmark.classList.add("checkmark");
    circle.appendChild(checkmark);

    container.appendChild(circle);

    // Add click event to toggle circle color and checkmark visibility
    circle.addEventListener("click", function () {
      circle.classList.toggle("checked");
      checkmark.classList.toggle("hidden");

      // Function to toggle circles and display checkmarks
      function toggleCircle(element) {
        element.classList.toggle("checked");
        const checkmark = element.querySelector(".checkmark");
        checkmark.style.display = element.classList.contains("checked")
          ? "block"
          : "none";
      }

      // Select all goal circles
      const goalCircles = document.querySelectorAll(".goal-circle");

      // Attach click event to each circle
      goalCircles.forEach((circle) => {
        circle.addEventListener("click", () => {
          toggleCircle(circle);
        });
      });
    });
  }
}

// Call the function for three circles under the first goal
const firstGoalProgressContainer = document.getElementById(
  "first-goal-progress"
);
createGoalCircles(firstGoalProgressContainer, 3);

// Call the function for five circles under the second goal
const secondGoalProgressContainer = document.getElementById(
  "second-goal-progress"
);
createGoalCircles(secondGoalProgressContainer, 5);

// Rest of your existing code goes here...

// Create line chart for savings
const savingsChartCanvas = document
  .getElementById("savings-chart")
  .getContext("2d");
const savingsData = {
  labels: [],
  datasets: [
    {
      label: "Sparnaður",
      data: [],
      borderColor: "rgba(255, 87, 51, 1)",
      borderWidth: 2,
      fill: false
    }
  ]
};

const savingsChart = new Chart(savingsChartCanvas, {
  type: "line",
  data: savingsData,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Tími"
        }
      },
      y: {
        title: {
          display: true,
          text: "Sparnaður (Kr)"
        }
      }
    }
  }
});

// Create line chart for time
const timeChartCanvas = document.getElementById("time-chart").getContext("2d");
const timeData = {
  labels: [],
  datasets: [
    {
      label: "Tími",
      data: [],
      borderColor: "rgba(255, 87, 51, 1)",
      borderWidth: 2,
      fill: false
    }
  ]
};

const timeChart = new Chart(timeChartCanvas, {
  type: "line",
  data: timeData,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Tími"
        }
      },
      y: {
        title: {
          display: true,
          text: "Unnir tímar (klst)"
        }
      }
    }
  }
});

// Update the line charts
function updateSavingsChart(newLabel, newData) {
  savingsData.labels.push(newLabel);
  savingsData.datasets[0].data.push(newData);
  savingsChart.update();
}

function updateTimeChart(newLabel, newData) {
  timeData.labels.push(newLabel);
  timeData.datasets[0].data.push(newData);
  timeChart.update();
}

function updateThermometer() {
  const additionalSavings = parseFloat(additionalSavingsInput.value) || 0;
  totalSavings += additionalSavings;

  const percentage = (totalSavings / goal) * 100;
  const mercuryHeight = `${percentage > 100 ? 100 : percentage}%`;
  mercury.style.height = mercuryHeight;

  savingsAmountSpan.textContent = totalSavings.toLocaleString(); // Format number with commas

  if (totalSavings >= goal) {
    messageElement.textContent = "Markmiði náð!";
  } else {
    messageElement.textContent = "";
  }

  // Update the savings chart
  updateSavingsChart(new Date().toLocaleTimeString(), totalSavings);
}

function updateThermometer2() {
  const additionalTime = parseFloat(additionalTimeInput.value) || 0;
  totalTime += additionalTime;

  const percentage2 = (totalTime / goal2) * 100;
  const mercuryHeight2 = `${percentage2 > 100 ? 100 : percentage2}%`;
  mercury2.style.height = mercuryHeight2;

  timeAmountSpan.textContent = totalTime;

  if (totalTime > goal2) {
    message2.textContent = "Yfir áætluðum tímafjölda";
  } else {
    message2.textContent = "";
  }

  // Update the time chart
  updateTimeChart(new Date().toLocaleTimeString(), totalTime);
}

function updateSavingsChart(newLabel, newData) {
  // Use the current date as the label
  const currentDate = new Date();
  savingsData.labels.push(formatDate(currentDate));
  savingsData.datasets[0].data.push(newData);
  savingsChart.update();
}

function updateTimeChart(newLabel, newData) {
  // Use the current date as the label
  const currentDate = new Date();
  timeData.labels.push(formatDate(currentDate));
  timeData.datasets[0].data.push(newData);
  timeChart.update();
}

// Function to format a date as a string (e.g., "MM/DD/YYYY")
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
