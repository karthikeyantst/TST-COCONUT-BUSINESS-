function generateReceipt() {
    // Get input values
    const name = document.getElementById('name').value;
    const place = document.getElementById('place').value;
    const date = document.getElementById('date').value;
    const toNumber = document.getElementById('toNumber').value;
    const coconut = parseFloat(document.getElementById('coconut').value) || 0;
    const subtraction = parseFloat(document.getElementById('subtraction').value) || 0;
    const netCoconut = parseFloat(document.getElementById('netCoconut').value) || 0;
    const coconutRate = parseFloat(document.getElementById('coconutRate').value);

    // Calculate totals
    const coconutTotal = netCoconut * coconutRate;
    const grandTotal = coconutTotal;

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString('ta-IN') : new Date().toLocaleDateString('ta-IN');

    // Display in receipt
    document.getElementById('receiptName').textContent = name;
    document.getElementById('receiptPlace').textContent = place;
    document.getElementById('receiptToNumber').textContent = toNumber;
    document.getElementById('receiptDate').textContent = formattedDate;

    // Build receipt items
    const receiptItems = document.getElementById('receiptItems');
    receiptItems.innerHTML = '';

    if (coconut > 0) {
        addReceiptRow(receiptItems, "மொத்த தேங்காய்", coconut + "", "--", "--" );
    }

    if (subtraction > 0) {
        addReceiptRow(receiptItems, "லாபக்காய்", subtraction + "", "--", "--" );
    }

    if (netCoconut > 0) {
        addReceiptRow(receiptItems, "நிகர தேங்காய்", netCoconut + "", "₹" + coconutRate.toFixed(2), "₹" + coconutTotal.toFixed(2));
    }

    document.getElementById('receiptTotal').textContent = grandTotal.toFixed(2);

    // Show receipt and print button
    document.getElementById('receipt').style.display = 'block';
    document.querySelector('.print-btn').style.display = 'block';

    // Auto print after 1 second
    setTimeout(printReceipt, 1000);

    // Call SMS function after generating receipt
    sendSMS(name, toNumber, grandTotal);
}

function sendSMS(name, toNumber, amount) {
    const message = `வணக்கம் ${name}, உங்கள் தேங்காய் விலை ₹${amount.toFixed(2)}. நன்றி!`;
    const smsURL = `sms:${toNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsURL;
}

function addReceiptRow(table, item, qty, rate, total) {
    const row = table.insertRow();
    row.insertCell().textContent = item;
    row.insertCell().textContent = qty;
    row.insertCell().textContent = rate;
    row.insertCell().textContent = total;
}

function printReceipt() {
    window.print();
}

