document.addEventListener("DOMContentLoaded", function () {
  const calcBtn = document.getElementById("sbmi-calculate");
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

  // Category logic
  function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 24.9) return "Normal";
    else if (bmi < 29.9) return "Overweight";
    else return "Obese";
  }

  function getHealthTips(category) {
    const tips = {
      Underweight: [
        "Increase calorie intake with healthy foods.",
        "Do resistance training to gain muscle.",
        "Eat more frequently and snack healthy.",
        "Track meals using an app.",
        "Consult a dietitian if needed."
      ],
      Normal: [
        "Maintain your diet and activity levels.",
        "Get regular exercise and sleep well.",
        "Stay hydrated throughout the day.",
        "Keep tracking your BMI monthly.",
        "Avoid junk food to stay in range."
      ],
      Overweight: [
        "Cut down on sugary and processed foods.",
        "Start walking daily for 30 minutes.",
        "Control portion sizes in each meal.",
        "Drink more water instead of soft drinks.",
        "Plan meals ahead to avoid impulsive eating."
      ],
      Obese: [
        "Follow a structured weight loss plan.",
        "Work with a doctor or health coach.",
        "Avoid fast foods and high-fat items.",
        "Increase physical activity slowly.",
        "Track progress and stay motivated."
      ]
    };

    const selected = tips[category];
    return `<ul>${selected.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  }

  function drawChart(bmi) {
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(chartEl, {
      type: "doughnut",
      data: {
        labels: ["BMI", "Remaining"],
        datasets: [{
          data: [bmi, 40 - bmi],
          backgroundColor: ["#00bcd4", "#e0e0e0"],
          borderWidth: 1
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

  // Button click to calculate
  calcBtn.addEventListener("click", () => {
    const h = parseFloat(height.value);
    const w = parseFloat(weight.value);
    const a = parseInt(age.value);
    const g = gender.value;

    if (!h || !w || !a || !g) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    const category = getBMICategory(bmi);
    const tips = getHealthTips(category);

    scoreEl.innerHTML = `Your BMI is <strong>${bmi}</strong>`;
    categoryEl.innerHTML = `Category: <strong>${category}</strong>`;
    tipsEl.innerHTML = `<h4>Health Tips:</h4> ${tips}`;

    drawChart(bmi);
    document.querySelector(".sbmi-results").style.display = "block";
  });

  // Export PDF
  exportBtn.addEventListener("click", () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Smart BMI & Health Report", 20, 20);
    doc.setFontSize(12);
    doc.text(scoreEl.textContent, 20, 40);
    doc.text(categoryEl.textContent, 20, 50);
    doc.text("Tips:", 20, 65);

    const tipsList = tipsEl.innerText.split('\n');
    tipsList.forEach((line, i) => {
      doc.text(`- ${line}`, 25, 75 + i * 10);
    });

    doc.save("bmi-report.pdf");
  });

  // Toggle dark mode
  const toggleBtn = document.getElementById("sbmi-dark-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("sbmi-dark");
  });
});
