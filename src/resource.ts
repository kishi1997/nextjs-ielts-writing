import { IMAGE_PATH } from './lib/constants';
import { Task } from './types/type';

export const TASK_LIST: Task[] = [
  {
    id: 'task-1',
    title: 'General Writing Mock',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription:
      'Summarise the main information in the visual and make comparisons where relevant.',
    modelAnswer:
      'The chart shows a clear overall pattern, with the largest category accounting for the greatest share throughout the period. By contrast, the smaller categories changed more gradually and remained well below the leading figure. Overall, the most important feature is the gap between the highest and lowest values, while the middle group shows only moderate movement.',
    explanation:
      'Task 1では、最初に全体傾向をつかみ、細かい数字を全部並べるよりも「最大・最小・大きな差・変化の方向」を優先して説明します。',
    // 今後追加：ジャンルのアイコン画像パス
    // genle: "",
  },
  {
    id: 'task-2',
    title: 'General Writing Mock2',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription:
      'Describe the key trends and support your overview with selected details.',
    modelAnswer:
      'Overall, the data suggests that one figure rose steadily, while another stayed relatively stable. The remaining category fluctuated slightly but did not change as dramatically as the main upward trend. The most noticeable point is therefore not every small movement, but the contrast between steady growth and limited change.',
    explanation:
      '上昇・横ばい・変動のように、動きの種類で整理すると書きやすくなります。細部に入る前に overview で一番大きな特徴を述べます。',
  },
  {
    id: 'task-3',
    title: 'General Writing Mock3',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription:
      'Write a concise report that compares the most significant figures.',
    modelAnswer:
      'The most striking feature is that the highest figure was substantially larger than the others. Although there were some changes among the remaining groups, these differences were relatively small. In general, the data can be divided into a dominant category and several lower categories with less significant variation.',
    explanation:
      '比較問題では、似ている項目をまとめると読みやすくなります。「dominant category」「lower categories」のようにグループ化して説明します。',
  },
  {
    id: 'task-4',
    title: 'General Writing Mock4',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription:
      'Summarise the information by selecting the most important features.',
    modelAnswer:
      'Overall, the visual indicates a clear difference between the main category and the rest. The leading figure remained the most prominent, while the other figures were comparatively modest. Rather than listing every value, the report should focus on the overall ranking, the size of the differences, and any major changes.',
    explanation:
      'IELTS Task 1は全データの説明ではなく、重要な特徴の選択が大切です。順位、差、変化の大きさを中心に書くと要点が伝わります。',
  },
];
