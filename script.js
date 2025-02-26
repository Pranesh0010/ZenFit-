const API_KEY = "AIzaSyCnCjMDcDiEC7Qii15A1RMFxUrpZ4wSKzU";  // 🔹 Replace with your actual API key

async function getRecommendation() {
    // Get input values
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const goal = document.getElementById("goal").value;

    if (!age || !height || !weight) {
        alert("Please fill in all fields.");
        return;
    }

    const userInput = `I am ${age} years old, my height is ${height} cm, my weight is ${weight} kg, and my fitness goal is ${goal}. Suggest nutritional supplements.`;

    try {
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] })  // Removed "role"
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) {
            alert(`Error: ${data.error.message}`);
            return;
        }

        // Extract the response text
        const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation found.";
        displayRecommendation(recommendation);

    } catch (error) {
        console.error("Error fetching AI response:", error);
        alert("Failed to get a response. Please check the console for details.");
    }
}

// Function to display recommendation on the webpage
function getRecommendation() {
  // Get input values
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const goal = document.getElementById("goal").value;

  // Check if all fields are filled
  if (!age || !height || !weight) {
      alert("Please fill in all fields.");
      return;
  }

  // Construct query parameters
  const queryParams = new URLSearchParams({
      age: age,
      height: height,
      weight: weight,
      goal: goal
  }).toString();

  // Redirect to recommendations page with query parameters
  window.location.href = `recommendations.html?${queryParams}`;
}
