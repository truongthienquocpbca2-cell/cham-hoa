// script.js

/**
 * 1. Hàm lọc và hiển thị/ẩn các thẻ hoa dựa trên từ khóa tìm kiếm.
 */
function filterFlowers() {
    // Lấy giá trị từ ô input tìm kiếm (Giả định ID là 'flower-search')
    const input = document.getElementById('flower-search');
    // Thoát nếu không tìm thấy ô tìm kiếm
    if (!input) return; 

    const filter = input.value.toUpperCase().trim(); 
    // Lấy tất cả các thẻ hoa
    const cards = document.getElementsByClassName('flower-card');

    // Lặp qua tất cả các thẻ hoa để kiểm tra điều kiện hiển thị
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Lấy nội dung cần so sánh: Tiêu đề (h3) và Mô tả (p)
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        
        // Gộp nội dung thành một chuỗi lớn để tìm kiếm
        const textValue = (h3.textContent || h3.innerText) + ' ' + (p.textContent || p.innerText);

        // Logic lọc:
        // A. Nếu không có từ khóa tìm kiếm
        if (filter.length === 0) {
            // Chỉ hiển thị 9 thẻ đầu tiên (theo logic đã có trong tệp index.html của bạn)
            if (i < 9) { 
                card.style.display = ""; // Hiển thị
            } else {
                card.style.display = "none"; // Ẩn
            }
        } 
        // B. Nếu có từ khóa và nội dung khớp
        else if (textValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = ""; // Hiển thị thẻ khớp
        } 
        // C. Không khớp
        else {
            card.style.display = "none"; // Ẩn thẻ không khớp
        }
    }
}


/**
 * 2. Thiết lập chức năng Accordion.
 */
function setupAccordion() {
    // Lấy tất cả các nút mở/đóng accordion (Giả định class là 'accordion-btn' trên nút)
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Nội dung là phần tử ngay sau nút
            const content = this.nextElementSibling; 

            // Đảm bảo phần tử tiếp theo là nội dung accordion
            if (content && content.classList.contains('accordion-content')) {
                
                // --- Logic Đóng các Accordion khác (Đảm bảo chỉ có 1 phần mở) ---
                document.querySelectorAll('.accordion-content.active').forEach(item => {
                    if (item !== content) {
                        item.classList.remove('active');
                        // Cập nhật biểu tượng của nút liên quan
                        const itemBtn = item.previousElementSibling;
                        if (itemBtn) {
                            itemBtn.querySelector('svg')?.classList.remove('rotate-180');
                        }
                    }
                });
                
                // --- Mở/Đóng Accordion hiện tại ---
                content.classList.toggle('active');

                // Xoay biểu tượng mũi tên (Giả định có SVG trong nút)
                const icon = this.querySelector('svg');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        });
    });
}


/**
 * 3. Khởi tạo chức năng khi DOM đã tải xong
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Gắn sự kiện cho ô tìm kiếm
    const searchInput = document.getElementById('flower-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterFlowers);
        searchInput.addEventListener('change', filterFlowers); 
    }

    // 2. Thiết lập Accordion
    setupAccordion();

    // 3. Chạy hàm lọc lần đầu tiên để áp dụng giới hạn 9 thẻ khi tải trang
    filterFlowers();
});