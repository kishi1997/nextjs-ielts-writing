const REVIEW_TASK_IDS_KEY = 'ielts-writing-review-task-ids';
const REVIEW_TASK_IDS_EVENT = 'ielts-writing-review-task-ids-change';
const EMPTY_REVIEW_TASK_IDS: string[] = [];

let cachedSavedValue: string | null | undefined;
let cachedTaskIds = EMPTY_REVIEW_TASK_IDS;

const isBrowser = () => typeof window !== 'undefined';

const emitReviewTaskIdsChange = () => {
  window.dispatchEvent(new Event(REVIEW_TASK_IDS_EVENT));
};

export const getReviewTaskIds = (): string[] => {
  if (!isBrowser()) return EMPTY_REVIEW_TASK_IDS;

  const savedValue = window.localStorage.getItem(REVIEW_TASK_IDS_KEY);
  if (savedValue === cachedSavedValue) return cachedTaskIds;

  cachedSavedValue = savedValue;
  if (savedValue == null) {
    cachedTaskIds = EMPTY_REVIEW_TASK_IDS;
    return cachedTaskIds;
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    cachedTaskIds = Array.isArray(parsedValue)
      ? parsedValue.filter(
          (taskId): taskId is string => typeof taskId === 'string',
        )
      : EMPTY_REVIEW_TASK_IDS;
  } catch {
    cachedTaskIds = EMPTY_REVIEW_TASK_IDS;
  }

  return cachedTaskIds;
};

export const getServerReviewTaskIds = () => EMPTY_REVIEW_TASK_IDS;

export const addReviewTaskId = (taskId: string): string[] => {
  const nextTaskIds = Array.from(new Set([...getReviewTaskIds(), taskId]));
  window.localStorage.setItem(REVIEW_TASK_IDS_KEY, JSON.stringify(nextTaskIds));
  emitReviewTaskIdsChange();
  return nextTaskIds;
};

export const removeReviewTaskId = (taskId: string): string[] => {
  const nextTaskIds = getReviewTaskIds().filter(
    (reviewTaskId) => reviewTaskId !== taskId,
  );
  window.localStorage.setItem(REVIEW_TASK_IDS_KEY, JSON.stringify(nextTaskIds));
  emitReviewTaskIdsChange();
  return nextTaskIds;
};

export const hasReviewTaskId = (taskId: string): boolean => {
  return getReviewTaskIds().includes(taskId);
};

export const subscribeReviewTaskIds = (onStoreChange: () => void) => {
  if (!isBrowser()) return () => {};

  window.addEventListener(REVIEW_TASK_IDS_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener(REVIEW_TASK_IDS_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
};
