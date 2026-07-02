document.getElementById('submit-btn').addEventListener('click', () => {
  const form = document.getElementById('quiz-form');
  const data = new FormData(form);

  const answers = {
    q1: data.get('q1'),
    q2: data.get('q2'),
    q3: data.get('q3')
  };

  // 未回答チェック
  if (!answers.q1 || !answers.q2 || !answers.q3) {
    alert('すべての質問に答えてください。');
    return;
  }

  // 集計（ここは好きなロジックに変えられる）
  let score = {
    E: 0, I: 0,
    N: 0, S: 0,
    F: 0, T: 0
  };

  Object.values(answers).forEach(v => {
    score[v] += 1;
  });

  // ざっくりタイプ判定
  const type =
    (score.E >= score.I ? 'E' : 'I') +
    (score.N >= score.S ? 'N' : 'S') +
    (score.F >= score.T ? 'F' : 'T');

  const resultTypeEl = document.getElementById('result-type');
  const resultTextEl = document.getElementById('result-text');
  const resultBox = document.getElementById('result');

  resultTypeEl.textContent = `あなたのタイプは「${type}タイプ」です。`;

  let description = '';
  switch (type) {
    case 'ENF':
      description = '明るくて人とのつながりを大事にする、アイデア豊富なタイプ。チームで動くと力を発揮しやすいです。';
      break;
    case 'INF':
      description = '静かだけど芯が強く、じっくり人と向き合うタイプ。深い関係を大切にする傾向があります。';
      break;
    // 好きなだけ増やしてOK
    default:
      description = 'バランス型のあなたは、状況に合わせて柔軟に動けるタイプです。自分の強みを少しずつ探してみましょう。';
  }

  resultTextEl.textContent = description;
  resultBox.classList.remove('hidden');
});
