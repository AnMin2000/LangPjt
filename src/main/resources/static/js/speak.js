// script.js
document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 10; // 총 페이지 수
    const pageContentDiv = document.getElementById('page-content');
    const paginationDiv = document.querySelector('.pagination');
    let currentPage = 1;

    // 페이지 번호 생성
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        span.dataset.page = i;
        paginationDiv.appendChild(span);
    }

    const updatePageContent = () => {
        pageContentDiv.textContent = `${currentPage}번 페이지 내용`;
    };

    const updatePagination = () => {
        document.querySelectorAll('.pagination span').forEach(span => {
            span.classList.remove('active');
            if (parseInt(span.dataset.page) === currentPage) {
                span.classList.add('active');
            }
        });
    };

    updatePageContent();
    updatePagination();

    // 왼쪽 버튼 클릭 시 페이지 이동
    document.querySelector('.button-left').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePageContent();
            updatePagination();
        }
    });

    // 오른쪽 버튼 클릭 시 페이지 이동
    document.querySelector('.button-right').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageContent();
            updatePagination();
        }
    });

    // 페이지 번호 클릭 시 페이지 이동
    paginationDiv.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            currentPage = parseInt(event.target.dataset.page);
            updatePageContent();
            updatePagination();
        }
    });
});
