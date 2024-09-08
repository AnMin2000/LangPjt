// script.js
document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 10;
    const pageContentDiv = document.getElementById('page-content');
    const paginationDiv = document.querySelector('.pagination');
    const submitSection = document.getElementById('submit-section');
    const contentDiv = document.querySelector('.content');
    const submitButton = document.getElementById('submit-button');
    const checkButton = document.getElementById('check-button');
    let currentPage = 1;
    const uploadURL = "http://127.0.0.1:5000/upload";
    const buffering = document.getElementById('buffering');
    const test = document.getElementById('test');
    let textElement = document.getElementById('text');
    const imgElement = document.getElementById('img'); // 이미디 동적 처리

// id가 'data'인 div 요소를 선택합니다.
    const dataDiv = document.getElementById('data');

// data-picture와 data-text 속성 값을 가져옵니다.
    const pictureData = dataDiv.getAttribute('data-picture');
    const textData = dataDiv.getAttribute('data-text');

// data-picture 속성 값을 배열로 변환합니다.
    const pictureArray = pictureData.slice(1, -1).split(', ').map(item => item.trim());

// data-text 속성 값을 배열로 변환합니다 (여기서는 구분자가 없으므로 직접 처리 필요).
    const textArray = textData.slice(1, -1).split(', ');

// 배열의 0번째 인덱스 값을 콘솔에 출력합니다.
    console.log(pictureArray[0]);
    console.log(textArray[0]);

    let recognition;
    var arr = [null, null, null, null, null, null, null, null, null];
    var arrCol = [null, null, null, null, null, null, null, null, null];

    // 페이지 번호 생성
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        span.dataset.page = i;
        paginationDiv.appendChild(span);
    }
    // ${encodeURIComponent(id)}

    const updatePageContent = () => {

        if(currentPage < 10) {
            imgElement.src = pictureArray[currentPage - 1]; // 현재 페이지 기준 사진 호출
            textElement.textContent = textArray[currentPage - 1]; // 현재 페이지 기준 텍스트 호출
            test.style.color = arrCol[currentPage - 1];
            test.textContent = arr[currentPage - 1];
        }

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

            if (recognition) {
                checkButton.disabled = false;
                recognition.stop();
            }

            updatePageContent();
            updatePagination();
        }
    });

    // 오른쪽 버튼 클릭 시 페이지 이동
    document.querySelector('.button-right').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;

            if (recognition) {
                checkButton.disabled = false;
                recognition.stop();
            }

            updatePageContent();
            updatePagination();
        }
    });

    // 페이지 번호 클릭 시 페이지 이동
    paginationDiv.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            currentPage = parseInt(event.target.dataset.page);
            if (recognition) {
                checkButton.disabled = false;
                recognition.stop();
            }
            updatePageContent();
            updatePagination();
        }
    });

    // 제출 버튼 클릭 시 POST 요청
    submitButton.addEventListener('click', () => {

        // buffering.style.display = 'block'; // 움짤 띄우기   최종적으로 제출전에 검사하면서 쓰삼
        // buffering.style.display = 'none'; // 움짤 끄기
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
    const highlight = (text, from, to, color) => {
        let replacement = highlightBackground(text.slice(from, to), color);
        return text.substring(0, from) + replacement + text.substring(to);
    }

    const highlightBackground = (sample, color) => `<span style="background-color: ${color};">${sample}</span>`;

    checkButton.addEventListener('click', () => {

        let nowPage = currentPage;

        test.style.color = 'red';
        test.textContent = "Recoding...";

        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';  // 영어로 설정
        recognition.interimResults = true;

        let originalText = textElement.innerText; // 여기
        let isComplete = false;
        let finalTranscript = "";

        // 음성 인식 처리
        recognition.addEventListener('result', event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            let lastCharIndex = originalText.indexOf(transcript);
            if (lastCharIndex !== -1) {
                // 하이라이트 적용
                textElement.innerHTML = highlight(originalText, lastCharIndex, lastCharIndex + transcript.length, 'yellow');

                // 전체 텍스트 일치 여부 확인
                if (transcript.trim() === originalText.trim()) {
                    isComplete = true;
                }
            }

            // 인식 완료 시 하이라이트 색 변경
            if (isComplete) {
                textElement.innerHTML = highlight(originalText, 0, originalText.length, 'lightgreen');
                finalTranscript = transcript.trim();  // 최종 텍스트 저장
                recognition.stop();  // 음성 인식 중지
            }
        });

        recognition.addEventListener('end', () => {
            try {
                // recognition.start()를 호출하기 전에 상태를 확인할 방법이 없으므로
                // 예외 처리를 통해 오류를 방지합니다.
                if (!isComplete) {
                    recognition.start(); // 인식을 시작합니다.
                }
            } catch (error) {
                if (error.name === 'InvalidStateError') {
                    console.warn('재실행');
                } else {
                    console.error('SpeechRecognition을 재시작하는 중 오류 발생:', error);
                }
            }
        });

        recognition.start();  // 음성 인식 시작

        if (!navigator.mediaDevices) {
            console.error("getUserMedia not supported.");
            return;
        }

        const constraints = { audio: true };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                let chunks = [];
                let recorder = new MediaRecorder(stream);

                // 녹음 데이터 처리
                recorder.ondataavailable = event => {
                    chunks.push(event.data);
                };

                recorder.onstop = event => {
                    console.log("Recording stopped.");
                    let blob = new Blob(chunks, { type: recorder.mimeType });
                    chunks = [];

                    // 필터링된 문장과 연동된 녹음 전송
                    if (isComplete) {

                        arr[nowPage - 1] = "Calculating...";
                        test.textContent = arr[nowPage - 1];

                        let formData = new FormData();
                        formData.append("audio_file", blob);
                        formData.append("transcript", finalTranscript); // 필터링된 문장 전송

                        fetch(uploadURL, {
                            method: "POST",
                            cache: "no-cache",
                            body: formData
                        })
                            .then(resp => {
                                if (resp.ok) {
                                    return resp.json();  // 응답을 JSON으로 파싱
                                } else {
                                    console.error("Error:", resp);
                                }
                            })
                            .then(data => {
                                if (data) {
                                    console.log("Received transcript:", data.transcript);
                                    console.log("Received score:", data.score);
                                    console.log("Received result:", data.result);


                                    if (data.score === 0) {
                                        arrCol[nowPage - 1] = 'red';
                                        arr[nowPage - 1] = "[Fail!] " + "You say : " + data.result;

                                        if(nowPage === currentPage) {
                                            test.style.color = arrCol[nowPage - 1];
                                            test.textContent = arr[nowPage - 1];
                                        }

                                    }
                                    else{
                                        arrCol[nowPage - 1] = 'blue';
                                        arr[nowPage - 1] = "[Success!] " + "Your score : " + data.score * 20

                                        if(nowPage === currentPage) {
                                            test.style.color = arrCol[nowPage - 1];
                                            test.textContent = arr[nowPage - 1];
                                        }

                                    }

                                    checkButton.disabled = false;

                                    // 추가 처리 로직...
                                }
                            })
                            .catch(err => {
                                console.error("Fetch error:", err);
                            });
                    }
                };

                recorder.onstart = event => {
                    console.log("Recording started.");
                    checkButton.disabled = true;
                };

                // 음성 인식 완료 시 녹음을 중지하도록 설정
                recognition.addEventListener('result', () => {
                    if (isComplete) {
                        recorder.stop();  // 녹음 중지
                    }
                });

                recorder.start();  // 녹음 시작

            })
            .catch(function(err) {
                console.error(err);
            });
    });

});
