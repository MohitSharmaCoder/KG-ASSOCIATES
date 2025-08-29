// // Forward GST Calculator
// const amountInput = document.getElementById("amount");
// const gstRateSelect = document.getElementById("gstRate");
// const forwardResult = document.getElementById("forwardResult");

// function calculateGST() {
//   let amount = amountInput.value;
//   let rate = gstRateSelect.value;

//   if (amount === "" || amount <= 0) {
//     forwardResult.innerText = "Please enter a valid amount.";
//     return;
//   }

//   amount = parseFloat(amount);
//   rate = parseFloat(rate);

//   // IGST
//   let igst = amount * (rate / 100);
//   let totalWithIGST = amount + igst;

//   // CGST + SGST
//   let halfRate = rate / 2;
//   let cgst = amount * (halfRate / 100);
//   let sgst = cgst;
//   let totalWithCGST_SGST = amount + cgst + sgst;

//   forwardResult.innerText =
//     `IGST (${rate}%): ₹${igst.toFixed(2)} | Total: ₹${totalWithIGST.toFixed(2)}\n` +
//     `CGST (${halfRate}%): ₹${cgst.toFixed(2)} + SGST (${halfRate}%): ₹${sgst.toFixed(2)} | Total: ₹${totalWithCGST_SGST.toFixed(2)}`;
// }

// amountInput.addEventListener("input", calculateGST);
// gstRateSelect.addEventListener("change", calculateGST);


// // Reverse GST Calculator (IIFE to avoid conflicts)
// (function () {
//   const gst_amountInput = document.getElementById("gst_amount");
//   const reverseResult = document.getElementById("reverseResult");

//   function gst_calculateReverse() {
//     let total = gst_amountInput.value;

//     if (total === "" || total <= 0) {
//       reverseResult.innerText = "Please enter a valid amount.";
//       return;
//     }

//     total = parseFloat(total);
//     let gstRates = [5, 12, 18, 28];

//     let output = "Breakdown (From Total Amount ₹" + total.toFixed(2) + "):\n\n";

//     gstRates.forEach(rate => {
//       let base = total / (1 + rate / 100);
//       let gst = total - base;
//       let halfGST = gst / 2;

//       output += `GST ${rate}%:\n`;
//       output += `   Base Amount: ₹${base.toFixed(2)}\n`;
//       output += `   GST Value: ₹${gst.toFixed(2)} (CGST: ₹${halfGST.toFixed(2)}, SGST: ₹${halfGST.toFixed(2)})\n`;
//       output += `   Total: ₹${total.toFixed(2)}\n\n`;
//     });

//     reverseResult.innerText = output;
//   }

//   gst_amountInput.addEventListener("input", gst_calculateReverse);
// })();
const amountInput = document.getElementById("amountInput");
const gstSelect = document.getElementById("gstSelect");
const result = document.getElementById("result");

const reverseInput = document.getElementById("reverseInput");
const reverseResult = document.getElementById("reverseResult");

function calcForward() {
  let amount = parseFloat(amountInput.value);
  let gst = parseFloat(gstSelect.value);

  if (!isNaN(amount)) {
    let gstAmount = (amount * gst / 100).toFixed(2);
    let total = (amount + parseFloat(gstAmount)).toFixed(2);

    result.innerHTML = `
      Amount: <span class="highlight">₹${amount.toFixed(2)}</span>  
      <br> GST (${gst}%): <span class="highlight">₹${gstAmount}</span>  
      <br> Total: <span class="highlight">₹${total}</span>
    `;
  } else {
    result.innerHTML = "";
  }
}

// function calcReverse() {
//   let total = parseFloat(reverseInput.value);

//   if (!isNaN(total)) {
//     let taxes = [5, 12, 18, 28];
//     let output = "";

//     taxes.forEach(rate => {
//       let base = (total / (1 + rate / 100)).toFixed(2);
//       let gstPart = (total - base).toFixed(2);

//       output += `
//         <span class="highlight">${rate}%</span> → 
//         Base: <span class="highlight">₹${base}</span> , 
//         GST: <span class="highlight">₹${gstPart}</span><br>
//       `;
//     });

//     reverseResult.innerHTML = output;
//   } else {
//     reverseResult.innerHTML = "";
//   }
// }

// amountInput.addEventListener("input", calcForward);
// gstSelect.addEventListener("change", calcForward);
// reverseInput.addEventListener("input", calcReverse);
function calcReverse() {
  let total = parseFloat(reverseInput.value);

  if (!isNaN(total)) {
    let taxes = [5, 12, 18, 28];
    let output = "";

    taxes.forEach(rate => {
      let base = (total / (1 + rate / 100)).toFixed(2);
      let gstPart = (total - base).toFixed(2);

      // Split into CGST, SGST, IGST
      let cgst = (gstPart / 2).toFixed(2);
      let sgst = (gstPart / 2).toFixed(2);
      let igst = gstPart;

      output += `
        <span class="highlight">${rate}%</span> → 
        Base: <span class="highlight">₹${base}</span> , 
        GST: <span class="highlight">₹${gstPart}</span> 
        ( CGST: <span class="highlight">₹${cgst}</span> , 
          SGST: <span class="highlight">₹${sgst}</span> , 
          IGST: <span class="highlight">₹${igst}</span> )<br>
      `;
    });

    reverseResult.innerHTML = output;
  } else {
    reverseResult.innerHTML = "";
  }
}

amountInput.addEventListener("input", calcForward);
gstSelect.addEventListener("change", calcForward);
reverseInput.addEventListener("input", calcReverse);
