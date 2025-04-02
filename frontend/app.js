const ishoralar = document.querySelectorAll(".ishora");
let selectedOperation = null;

ishoralar.forEach(tugma => {
      tugma.addEventListener('click', async function (event) {
            event.preventDefault();
            selectedOperation = this.textContent.trim();

            let inputs = document.querySelectorAll("input");
            let num1 = parseFloat(inputs[0].value);
            let num2 = parseFloat(inputs[1].value);

            if (isNaN(num1) || isNaN(num2)) {
                  alert("Iltimos, ikkala maydonga ham son kiriting!");
                  return;
            }

            try {
                  let response = await fetch("http://localhost:8000/calculate/" , {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ num1, num2, operation: selectedOperation })
                  });

                  let data = await response.json();
                  document.getElementById("result").innerText = data.result ?? data.error;
            } catch (error) {
                  console.error("Xatolik yuz berdi:", error);
                  alert("Hisoblashda xatolik! Iltimos, qayta urinib ko‘ring.");
            }
      });
});