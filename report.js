let but = document.getElementById("ans2");
let outputDiv = document.getElementById("output");

but.onclick = () => {
  let crop = document.getElementById("ans").value;
  console.log(crop);
  show(crop);
}

function show(crop) {
  const AWANLLM_API_KEY = '316ecc38-f6f4-4c7b-a0b4-9ffccab00833'; // Replace with your real API key

  fetch("https://api.awanllm.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AWANLLM_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "Meta-Llama-3-8B-Instruct",
      "messages": [
        { "role": "user", "content": `Generate a report on ${crop} crop, including the following details:

        Crop Name
        Soil Conditions for Optimal Growth:
        Nitrogen (N) requirements
        Phosphorus (P) requirements
        Potassium (K) requirements
        Ideal humidity range
        Ideal temperature range
        Optimal soil moisture levels
        Preferred pH range (mention if sand content is a significant factor)
        **Additionally, provide a brief overview of the crop's:
        
        Cultivation practices (planting season, spacing, etc.)
        General care requirements (watering, weeding, etc.)
        Common pests and diseases (optional, but helpful)
        
        GENERATE THE OUTPUT WITHOUT ANY BOLDS IN IT` }
      ]
    })
  })
    
      
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        const report = data.choices[0].message.content;
      
        // Split the report into sections based on keywords (e.g., "Crop Name")
        const sections = report.split(/\n\*\*\s+/);
      
        // Build formatted HTML string
        let formattedReport = "";
        for (const section of sections) {
          const lines = section.split(/\n/);
          formattedReport += `<h2>${lines[0]}</h2><ul>`;
          for (let i = 1; i < lines.length; i++) {
            formattedReport += `<li>${lines[i]}</li>`;
          }
          formattedReport += "</ul>";
        }
        outputDiv.innerHTML = formattedReport; // Update the content with HTML
        
    })
    .catch(error => {
      console.error("Error:", error); // Handle errors during the request
      outputDiv.textContent = "An error occurred. Please try again later.";
    });
}