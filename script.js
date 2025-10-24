const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
 
window.addEventListener("DOMContentLoaded", () => {
      const questionDiv = document.getElementById("questions");
      const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

      // Render questions dynamically
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const h2 = document.createElement("h2");
        h2.textContent = `${i + 1}. ${q.question}`;
        questionDiv.appendChild(h2);

        q.choices.forEach((choice) => {
          const label = document.createElement("label");
          label.innerHTML = `
            <input type="radio" name="question${i}" value="${choice}">
            ${choice} <br>
          `;
          questionDiv.appendChild(label);
        });

        questionDiv.appendChild(document.createElement("hr"));
      }

      // ✅ After rendering, attach event listeners
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        // Restore selection if already saved
        const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
		  if (progress[radio.name] === radio.value) {
          radio.checked = true;  
        }
 
        // Save new selection on change
        radio.addEventListener("change", (e) => {
          const question = e.target.name;
          const answer = e.target.value;

          const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
          progress[question] = answer;

          sessionStorage.setItem("progress", JSON.stringify(progress));
        });
      }); 
    });

const submit = document.getElementById('submit');
const scoreElement = document.getElementById('score');

submit.addEventListener('click', () => {
  let totalScore = 0;
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};

  for (let i = 0; i < questions.length; i++) {
    const q = `question${i}`;
    if (progress[q] === questions[i].answer) {
      totalScore++;
    }
  } 
  localStorage.setItem('score',totalScore);
  console.log("Progress:", progress); 
  console.log("Score:", totalScore); 
  scoreElement.innerHTML = `Your score is: ${localStorage.getItem('score')} / ${questions.length}`;
});
scoreElement.innerHTML = `Your score is: ${localStorage.getItem('score')} / ${questions.length}`;
 