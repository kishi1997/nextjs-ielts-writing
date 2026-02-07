// 単語数の計算
export const getWordCount = (text: string): number => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};
