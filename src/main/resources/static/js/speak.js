// script.js
document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 10;
    const pageContentDiv = document.getElementById('page-content');
    const paginationDiv = document.querySelector('.pagination');
    const submitSection = document.getElementById('submit-section');
    const contentDiv = document.querySelector('.content');
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
        pageContentDiv.textContent = `${currentPage}number page content`;
        if (currentPage === totalPages) {
            submitSection.classList.remove('hidden');
            contentDiv.classList.add('hidden'); // 10번 페이지일 때 content 숨기기
        } else {
            submitSection.classList.add('hidden');
            contentDiv.classList.remove('hidden'); // 다른 페이지일 때 content 보이기
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

    // 제출 버튼 클릭 시 POST 요청
    submitButton.addEventListener('click', () => {
        const urlParams = new URL(location.href).searchParams;

        const id = urlParams.get('id');
        const url = `/speak?id=${encodeURIComponent(id)}`;

            if (id) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ page: currentPage })
            })
                .then(response => response.text())
                .then(text => {
                    console.log(text); // 또는 적절히 처리
                    alert('Submission successful!');
                    window.location.href = '/main'; // '/speak' 경로로 이동
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred: ' + error.message);
                });
            } else {
                // id가 존재하지 않을 때 이 코드 블록이 실행됩니다.
                alert('ID not found in URL.');
            }
    });

});
