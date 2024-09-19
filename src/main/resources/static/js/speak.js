// script.js
document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 10;
    const pageContentDiv = document.getElementById('page-content');
    const paginationDiv = document.querySelector('.pagination');
    const submitSection = document.getElementById('submit-section');
    const submitDiv = document.getElementById('submitDiv');
    const contentDiv = document.querySelector('.content');
    const submitButton = document.getElementById('submit-button');
    const checkButton = document.getElementById('check-button');
    const soundButton = document.getElementById('sound-button');
    let currentPage = 1;
    const uploadURL = "http://127.0.0.1:5000/upload";
    const buffering = document.getElementById('buffering');
    const test = document.getElementById('test');
    let textElement = document.getElementById('text');
    const imgElement = document.getElementById('img'); // 이미디 동적 처리
    let imgA = document.getElementById('imgA');
    let imgB = document.getElementById('imgB');
    let imgC = document.getElementById('imgC');
    let imgD = document.getElementById('imgD');
    let imgE = document.getElementById('imgE');
    let imgF = document.getElementById('imgF');
    let imgG = document.getElementById('imgG');
    let imgH = document.getElementById('imgH');
    let imgI = document.getElementById('imgI');

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
    var arrText = [null, null, null, null, null, null, null, null, null]; // 입력 문장
    var arrColor = [null, null, null, null, null, null, null, null, null]; // 입력시 문장 색깔
    var arrScore = [null, null, null, null, null, null, null, null, null]; // 입력시 문장 점수
    // 페이지 번호 생성
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        span.dataset.page = i;
        paginationDiv.appendChild(span);
    }
    // ${encodeURIComponent(id)}


    document.getElementById('text1').addEventListener('click', () => {
        currentPage = 1;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text2').addEventListener('click', () => {
        currentPage = 2;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text3').addEventListener('click', () => {
        currentPage = 3;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text4').addEventListener('click', () => {
        currentPage = 4;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text5').addEventListener('click', () => {
        currentPage = 5;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text6').addEventListener('click', () => {
        currentPage = 6;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text7').addEventListener('click', () => {
        currentPage = 7;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text8').addEventListener('click', () => {
        currentPage = 8;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });

    document.getElementById('text9').addEventListener('click', () => {
        currentPage = 9;

        if (recognition) {
            checkButton.disabled = false;
            recognition.stop();
        }

        updatePageContent();
        updatePagination();
    });



    const updatePageContent = () => {

        if(currentPage < 10) {
            imgElement.src = pictureArray[currentPage - 1]; // 현재 페이지 기준 사진 호출
            textElement.textContent = textArray[currentPage - 1]; // 현재 페이지 기준 텍스트 호출
            test.style.color = arrColor[currentPage - 1];
            test.textContent = arrText[currentPage - 1];
        }

        if (currentPage === totalPages) {
            submitSection.classList.remove('hidden');
            submitDiv.classList.remove('hidden')
            contentDiv.classList.add('hidden'); // 10번 페이지일 때 content 숨기기
        } else {
            submitSection.classList.add('hidden');
            submitDiv.classList.add('hidden');
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

    soundButton.addEventListener('click', () => {
        const text = textElement.innerText;  // textElement에서 텍스트 가져오기
        const utterance = new SpeechSynthesisUtterance(text);  // TTS용 객체 생성
        speechSynthesis.speak(utterance);  // 텍스트를 음성으로 변환
    });

    // 배열의 합을 구하는 함수
    function getAverageScore(arr) {
        var sum = arr.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);

        var average = sum / arr.length;

        // 소수점을 삭제하고 정수로 변환 (내림)
        return Math.round(average);
    }

    // 제출 버튼 클릭 시 POST 요청
    submitButton.addEventListener('click', () => {

        // arrScore = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100) + 1); // 랜덤값 생성 (테스트 용임)
        // arrText = [
        //     "Hello",
        //     "World",
        //     "How are",
        //     "you doing?",
        //     "JavaScript",
        //     "is fun!",
        //     "Array",
        //     "example",
        //     "short text"
        // ]; // 랜덤 텍스트 생성 (테스트 용임)

        if(arrScore.includes(null)){
            alert('[Fail!] : There are unfinished test questions!');
            console.log("null 포함 돼있음")
        }
        else {
            var averageScore = getAverageScore(arrScore); // 평균 점수 구하기
            console.log(arrScore)

            // 디비 넣기 : 현재 주소 파라미터 값 뽑아와서 스피킹 시험지에 일치하는 [스피킹 문제] 테이블에서 id 값을 오름차순으로 넣으면 됨

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
                    body: JSON.stringify({
                        arrScore: arrScore,
                        arrText: arrText
                    })
                })
                    .then(response => response.text())
                    .then(text => {
                        console.log(text); // 또는 적절히 처리
                        alert('Submission successful!\nYour average score : ' + averageScore);
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
        }
    });
    const highlight = (text, from, to, color) => {
        let replacement = highlightBackground(text.slice(from, to), color);
        return text.substring(0, from) + replacement + text.substring(to);
    }

    const highlightBackground = (sample, color) => `<span style="background-color: ${color};">${sample}</span>`;

    checkButton.addEventListener('click', () => {

        let nowPage = currentPage;
        let noteElement = document.querySelector(`#text${nowPage}`);

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
                        arrText[nowPage - 1] = "Calculating... Solve the next problem first!";
                        test.textContent = arrText[nowPage - 1];

                        noteElement.style.color = 'black'
                        noteElement.textContent = "Page " + nowPage + " : " + "Calculating..."

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
                                    console.log("받은 페이지", nowPage);

                                    if (data.score === 0) {
                                        arrColor[nowPage - 1] = 'red';
                                        arrText[nowPage - 1] = "[Fail!] " + "You say : " + data.result;
                                        // 어차피 모든 인식이 돼야 submit 허용 할거기 때문에 필요 없음

                                        noteElement.style.color = 'red'
                                        noteElement.textContent = "Page " + nowPage + " : " + "Fail";

                                        if(nowPage === currentPage) {
                                            test.style.color = arrColor[nowPage - 1];
                                            test.textContent = arrText[nowPage - 1];
                                        }

                                    }
                                    else{
                                        arrColor[nowPage - 1] = 'blue';
                                        arrText[nowPage - 1] = "[Success!] " + "Your score : " + data.score * 20
                                        arrScore[nowPage - 1] = data.score * 20; // 페이지당 점수

                                        noteElement.style.color = 'blue'
                                        noteElement.textContent = "Page " + nowPage + " : " + data.score * 20 + " points";

                                        if(nowPage === currentPage) {
                                            test.style.color = arrColor[nowPage - 1];
                                            test.textContent = arrText[nowPage - 1];
                                        }

                                        if(data.graph !== 0){
                                            let graphSrc = `data:image/png;base64,${data.graph}`;

                                            switch (nowPage) {
                                                case 1:
                                                    imgA.src = graphSrc;
                                                    break;
                                                case 2:
                                                    imgB.src = graphSrc;
                                                    break;
                                                case 3:
                                                    imgC.src = graphSrc;
                                                    break;
                                                case 4:
                                                    imgD.src = graphSrc;
                                                    break;
                                                case 5:
                                                    imgE.src = graphSrc;
                                                    break;
                                                case 6:
                                                    imgF.src = graphSrc;
                                                    break;
                                                case 7:
                                                    imgG.src = graphSrc;
                                                    break;
                                                case 8:
                                                    imgH.src = graphSrc;
                                                    break;
                                                case 9:
                                                    imgI.src = graphSrc;
                                                    break;
                                                default:
                                                    console.log("Invalid page number");
                                            }

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
window.addEventListener('scroll', function() {
    var cylinder = document.querySelector('.nono');
    var left = document.querySelector('.button-left');
    var right = document.querySelector('.button-right');
    // 현재 스크롤 위치를 확인합니다.
    var scrollY = window.scrollY;

    // 스크롤이 일정 수준 이상 내려갔을 때 fixed 속성을 해제하고 absolute로 변경합니다.
    if (scrollY > 100) {
        cylinder.style.position = 'absolute';
        cylinder.style.top = scrollY + 'px';

        left.style.position = 'absolute';
        left.style.top = scrollY + 'px';

        right.style.position = 'absolute';
        right.style.top = scrollY + 'px';
    } else {
        // 스크롤이 위로 올라오면 다시 fixed로 설정합니다.
        cylinder.style.position = 'fixed';
        cylinder.style.top = '0';

        left.style.position = 'absolute';
        left.style.top = scrollY + 'px';

        right.style.position = 'absolute';
        right.style.top = scrollY + 'px';
    }
});