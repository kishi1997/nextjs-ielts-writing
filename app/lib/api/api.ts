// 画像のパスからBase64文字列を作るヘルパー関数
export const urlToBase64 = async (url: string): Promise<string> => {
  if (url == null) {
    throw new Error('URL is null or undefined');
  }
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // "data:image/png;base64,..." の形式からカンマ以降を取り出す
      const base64String = (reader.result as string)?.split(',')[1];
      resolve(base64String);
    };
    reader.readAsDataURL(blob);
  });
};
// APIを叩く関数
export const submitIeltsAnswer = async (answer: string, imagePath: string) => {
  if (answer == null || imagePath == null) {
    throw new Error('Answer or ImagePath is null or undefined');
  }
  const base64Image = await urlToBase64(imagePath);
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: answer,
      image: base64Image,
    }),
  });
  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }
  const data = await res.json();
  return data.output;
};
