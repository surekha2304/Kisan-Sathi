document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    let formData = new FormData(this);
    
    // Send form data to server
    fetch("/send-email", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Handle success (e.g., show success message)
            document.getElementById("statusMessage").textContent = "Message sent successfully!";
            document.getElementById("statusMessage").style.color = "#007bff";
        } else {
            // Handle error (e.g., show error message)
            document.getElementById("statusMessage").textContent = "Failed to send message.";
            document.getElementById("statusMessage").style.color = "#ff0000";
        }
    })
    .catch(error => {
        console.error("An error occurred:", error);
        document.getElementById("statusMessage").textContent = "An error occurred.";
        document.getElementById("statusMessage").style.color = "#ff0000";
    });
});
