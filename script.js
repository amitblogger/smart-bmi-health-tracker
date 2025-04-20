document.addEventListener("DOMContentLoaded", function () {
  const calcBtn = document.getElementById("sbmi-calculate").addEventListener("click", () => {
   // BMI logic here
});
  const gender = document.getElementById("sbmi-gender");
  const age = document.getElementById("sbmi-age");
  const height = document.getElementById("sbmi-height");
  const weight = document.getElementById("sbmi-weight");

  const scoreEl = document.getElementById("sbmi-bmi-score");
  const categoryEl = document.getElementById("sbmi-category");
  const tipsEl = document.getElementById("sbmi-tips");
  const chartEl = document.getElementById("sbmi-chart").getContext("2d");

  const exportBtn = document.getElementById("sbmi-pdf-export");
  let chartInstance = null;

  // BMI Result Categories
  function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 24.9) return "Normal";
    else if (bmi < 29.9) return "Overweight";
    else return "Obese";
  }

  // Tips by Category
  function getHealthTips(category, genderVal) {
    const tips = {
      Underweight: [
        "Eat calorie-dense nutritious food.",
        "Include strength training in your routine.",
        "Track your meals to ensure proper intake.",
        "Stay consistent with a healthy diet.",
        "Consult a dietitian for personalized advice."
      ],
      Normal: [
        "Great job! Maintain your healthy habits.",
        "Continue regular physical activity.",
        "Stay hydrated and sleep well.",
        "Get periodic health checkups.",
        "Avoid junk food to stay within range."
      ],
      Overweight: [
        "Incorporate daily cardio or brisk walking.",
        "Cut down on processed and sugary foods.",
        "Increase fiber intake and hydration.",
        "Reduce screen time and move more.",
        "Plan your meals and control portion size."
      ],
      Obese: [
        "Seek guidance from a certified dietitian.",
        "Create a structured weight-loss plan.",
        "Avoid sedentary lifestyle – move every hour.",
        "Stay mentally motivated and track progress.",
        "Monitor blood pressure and sugar regularly."
      ]
    };

    const selected = tips[category];
    const randomTips = selected.sort(() => 0.5 - Math.random()).slice(0, 3);
    return `<ul>${randomTips.map(t => `<li>${t}</li>`).join('')}</ul>`;
  }

  // Draw Chart
  function drawChart(bmi) {
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(chartEl, {
      type: "doughnut",
      data: {
        labels: ["BMI", "Remaining"],
        datasets: [{
          data: [bmi, 40 - bmi],
          backgroundColor: ["#00bcd4", "#eeeeee"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        cutout: "70%"
      }
    });
  }

  // Calculate BMI
  calcBtn.addEventListener("click", () => {
    const h = parseFloat(height.value);
    const w = parseFloat(weight.value);
    const a = parseInt(age.value);
    const g = gender.value;

    if (!h || !w || !a) {
      alert("Please enter all fields correctly.");
      return;
    }

    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    const category = getBMICategory(bmi);
    const tips = getHealthTips(category, g);

    scoreEl.innerHTML = `Your BMI is <strong>${bmi}</strong>`;
    categoryEl.innerHTML = `Category: <strong>${category}</strong>`;
    tipsEl.innerHTML = `<h4>Health Tips:</h4> ${tips}`;

    drawChart(bmi);
    document.querySelector(".sbmi-results").style.display = "block";
  });

  // Export as PDF
  exportBtn.addEventListener("click", () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Smart BMI & Health Report", 20, 20);
    doc.setFontSize(12);
    doc.text(scoreEl.textContent, 20, 40);
    doc.text(categoryEl.textContent, 20, 50);
    doc.text("Tips:", 20, 65);

    let tipsText = tipsEl.innerText.split('\n');
    tipsText.forEach((t, i) => {
      doc.text(`- ${t}`, 25, 75 + i * 10);
    });

    doc.save("bmi-report.pdf");
  });

  // Add dark/light mode toggle
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌓 Toggle Dark Mode";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "15px";
  toggleBtn.style.right = "15px";
  toggleBtn.style.zIndex = "9999";
  toggleBtn.style.padding = "10px 14px";
  toggleBtn.style.background = "#222";
  toggleBtn.style.color = "#fff";
  toggleBtn.style.borderRadius = "20px";
  toggleBtn.style.border = "none";
  toggleBtn.style.cursor = "pointer";

  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("sbmi-dark");
  });
});
