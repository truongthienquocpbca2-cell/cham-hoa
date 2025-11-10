// js/script.js

/**
 * Hàm tìm kiếm và lọc hoa dựa trên từ khóa nhập vào ô tìm kiếm
 */
function filterFlowers() {
    // Lấy giá trị tìm kiếm và chuyển thành chữ in hoa để so sánh không phân biệt chữ hoa/thường
    const input = document.getElementById('searchInput');
    const filter = input ? input.value.toUpperCase() : '';

    // Lấy tất cả các thẻ có class là 'flower-card'
    const cards = document.getElementsByClassName('flower-card');

    // Lặp qua tất cả các thẻ hoa
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // Lấy nội dung cần so sánh: Tiêu đề (h3) và Mô tả (p)
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        
        // Bỏ qua nếu không tìm thấy tiêu đề hoặc mô tả
        if (!h3 || !p) continue;

        // Gộp nội dung thành một chuỗi lớn để tìm kiếm
        const textValue = (h3.textContent || h3.innerText) + ' ' + (p.textContent || p.innerText);

        // Nếu không có từ khóa tìm kiếm
        if (filter.length === 0) {
            // Chỉ hiển thị 9 thẻ đầu tiên
            if (i < 9) { 
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        } 
        // Nếu có từ khóa tìm kiếm
        else if (textValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = ""; // Hiển thị thẻ khớp
        } else {
            card.style.display = "none"; // Ẩn thẻ không khớp
        }
    }
}

/**
 * Hàm đóng/mở nội dung Accordion (FAQ)
 */
function toggleAccordion(button) {
    // Lấy nội dung liền kề (sibling) sau nút nhấn
    const content = button.nextElementSibling;
    
    // Đảo ngược trạng thái active của nội dung
    content.classList.toggle('active');

    // Thay đổi biểu tượng (plus/minus)
    const icon = button.querySelector('span');
    if (content.classList.contains('active')) {
        icon.textContent = '-'; // Trạng thái mở
    } else {
        icon.textContent = '+'; // Trạng thái đóng
    }
}

// Chạy hàm filterFlowers khi tải trang để đảm bảo chỉ 9 thẻ đầu tiên được hiển thị
// và gắn sự kiện cho ô tìm kiếm
window.onload = function() {
    filterFlowers();
    
    // Gắn sự kiện 'keyup' cho ô tìm kiếm để lọc ngay khi người dùng gõ
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterFlowers);
    }

    // Gắn sự kiện 'click' cho tất cả các nút accordion
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => toggleAccordion(button));
    });
};