// script.js
document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 10; // 총 페이지 수
    const pageContentDiv = document.getElementById('page-content');
    const paginationDiv = document.querySelector('.pagination');
    const submitSection = document.getElementById('submit-section');
    const submitButton = document.getElementById('submit-button');
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
        if (currentPage === totalPages) {
            submitSection.classList.remove('hidden');
        } else {
            submitSection.classList.add('hidden');
        }
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

    submitButton.addEventListener('click', () => {
        fetch('/speak', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: currentPage })
        })
            .then(response => {
                if (response.ok) {
                    return response.text(); // JSON이 아닐 경우 텍스트로 처리
                }
                throw new Error('Network response was not ok');
            })
            .then(text => {
                // 서버 응답이 텍스트일 경우 처리
                console.log(text); // 또는 적절히 처리
                alert('Submission successfu123l!');
            })
            .catch(error => {
                // 오류 처리
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            });
    });

});
