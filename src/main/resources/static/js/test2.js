// // app.js
// document.addEventListener('DOMContentLoaded', () => {
//     const uploadURL = "http://127.0.0.1:5000/upload";
//     const btn = document.getElementById('btn');
//     const buffering = document.getElementById('buffering');
//     const test = document.getElementById('test');
//     const highlight = (text, from, to, color) => {
//         let replacement = highlightBackground(text.slice(from, to), color);
//         return text.substring(0, from) + replacement + text.substring(to);
//     }
//
//     const highlightBackground = (sample, color) => `<span style="background-color: ${color};">${sample}</span>`;
//
//     btn.addEventListener('click', () => {
//         const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//         recognition.lang = 'en-US';  // 영어로 설정
//         recognition.interimResults = true;
//
//         let textElement = document.getElementById('text');
//         let originalText = textElement.innerText;
//         let isComplete = false;
//         let finalTranscript = "";
//
//         // 음성 인식 처리
//         recognition.addEventListener('result', event => {
//             const transcript = Array.from(event.results)
//                 .map(result => result[0])
//                 .map(result => result.transcript)
//                 .join('');
//
//             let lastCharIndex = originalText.indexOf(transcript);
//             if (lastCharIndex !== -1) {
//                 // 하이라이트 적용
//                 textElement.innerHTML = highlight(originalText, lastCharIndex, lastCharIndex + transcript.length, 'yellow');
//
//                 // 전체 텍스트 일치 여부 확인
//                 if (transcript.trim() === originalText.trim()) {
//                     isComplete = true;
//                 }
//             }
//
//             // 인식 완료 시 하이라이트 색 변경
//             if (isComplete) {
//                 textElement.innerHTML = highlight(originalText, 0, originalText.length, 'lightgreen');
//                 finalTranscript = transcript.trim();  // 최종 텍스트 저장
//                 recognition.stop();  // 음성 인식 중지
//             }
//         });
//
//         recognition.addEventListener('end', () => {
//             if (!isComplete) recognition.start();  // 음성 인식 계속
//         });
//
//         recognition.start();  // 음성 인식 시작
//
//         if (!navigator.mediaDevices) {
//             console.error("getUserMedia not supported.");
//             return;
//         }
//
//         const constraints = { audio: true };
//
//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(function(stream) {
//                 let chunks = [];
//                 let recorder = new MediaRecorder(stream);
//
//                 // 녹음 데이터 처리
//                 recorder.ondataavailable = event => {
//                     chunks.push(event.data);
//                 };
//
//                 recorder.onstop = event => {
//                     console.log("Recording stopped.");
//                     let blob = new Blob(chunks, { type: recorder.mimeType });
//                     chunks = [];
//
//                     // 필터링된 문장과 연동된 녹음 전송
//                     if (isComplete) {
//                         buffering.style.display = 'block'; // 움짤 띄우기
//                         let formData = new FormData();
//                         formData.append("audio_file", blob);
//                         formData.append("transcript", finalTranscript); // 필터링된 문장 전송
//
//                         fetch(uploadURL, {
//                             method: "POST",
//                             cache: "no-cache",
//                             body: formData
//                         })
//                             .then(resp => {
//                                 if (resp.ok) {
//                                     return resp.json();  // 응답을 JSON으로 파싱
//                                 } else {
//                                     console.error("Error:", resp);
//                                 }
//                             })
//                             .then(data => {
//                                 if (data) {
//                                     console.log("Received transcript:", data.transcript);
//                                     console.log("Received score:", data.score);
//                                     console.log("Received result:", data.result);
//
//                                     buffering.style.display = 'none'; // 움짤 끄기
//
//                                     if (data.score === 0) {
//                                         test.style.color = 'red';
//                                         test.textContent = "[Fail!] " + "You say : " + data.result;
//                                     }
//                                     else{
//                                         test.style.color = 'blue';
//                                         test.textContent = "[Success!] " + "Your score : " + data.score * 20
//                                     }
//
//                                     btn.disabled = false;
//
//                                     // 추가 처리 로직...
//                                 }
//                             })
//                             .catch(err => {
//                                 console.error("Fetch error:", err);
//                             });
//                     }
//                 };
//
//                 recorder.onstart = event => {
//                     console.log("Recording started.");
//                     btn.disabled = true;
//                 };
//
//                 // 음성 인식 완료 시 녹음을 중지하도록 설정
//                 recognition.addEventListener('result', () => {
//                     if (isComplete) {
//                         recorder.stop();  // 녹음 중지
//                     }
//                 });
//
//                 recorder.start();  // 녹음 시작
//
//             })
//             .catch(function(err) {
//                 console.error(err);
//             });
//     });
// });
