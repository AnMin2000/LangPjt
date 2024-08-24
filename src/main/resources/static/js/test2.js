
    const btn = document.getElementById('btn');

    const highlight = (text, from, to, color) => {
    let replacement = highlightBackground(text.slice(from, to), color);
    return text.substring(0, from) + replacement + text.substring(to);
}

    const highlightBackground = (sample, color) => `<span style="background-color: ${color};">${sample}</span>`;

    btn.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = true;

    let textElement = document.getElementById('text');
    let originalText = textElement.innerText;
    let isComplete = false;

    recognition.addEventListener('result', event => {
    const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    let lastCharIndex = originalText.indexOf(transcript);
    if (lastCharIndex !== -1) {
    // 노란색으로 하이라이트
    textElement.innerHTML = highlight(originalText, lastCharIndex, lastCharIndex + transcript.length, 'yellow');

    // 인식된 텍스트가 원본 텍스트와 정확히 일치하는지 확인
    if (transcript.trim() === originalText.trim()) {
    isComplete = true;
}
}

    // 전체 텍스트가 인식되었으면 연한 초록색으로 변경
    if (isComplete) {
    textElement.innerHTML = highlight(originalText, 0, originalText.length, 'lightgreen');
    recognition.stop();  // 인식을 중지
}
});

    recognition.addEventListener('end', () => {
    if (!isComplete) recognition.start();  // 계속 인식
});

    recognition.start();
});
