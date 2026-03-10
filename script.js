const API_KEY = "AIzaSyAuj5lnOumaRIPYxwXY7kWfwSLLCIJqbIo"; // Thay API Key của bạn vào đây
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

document.getElementById('generateBtn').addEventListener('click', async () => {
    const goal = document.getElementById('emailGoal').value;
    const name = document.getElementById('customerName').value;
    const product = document.getElementById('productName').value;
    const details = document.getElementById('details').value;

    // Kiểm tra input (Bắt lỗi bỏ trống)
    if (!name || !product || !details) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Hiển thị trạng thái loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('outputArea').style.display = 'none';

    const prompt = `Bạn là chuyên gia Sales. Viết email mục tiêu: ${goal}. 
    Gửi cho: ${name}. Sản phẩm: ${product}. 
    Thông tin thêm: ${details}. 
    Yêu cầu trả về định dạng: Tiêu đề: [Nội dung], Nội dung: [Nội dung], CTA: [Nội dung].`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // Tách văn bản (Ví dụ đơn giản)
        document.getElementById('emailSubject').innerText = aiText.split('\n')[0];
        document.getElementById('emailBody').innerText = aiText;
        
        document.getElementById('outputArea').style.display = 'block';
    } catch (error) {
        alert("Có lỗi xảy ra khi kết nối với AI!");
        console.error(error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

// Chức năng sao chép
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Đã sao chép vào bộ nhớ tạm!");
    });
}