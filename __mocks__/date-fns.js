export const isToday = (time) => time.dateString === 'today';
export const isYesterday = (time) => time.dateString === 'yesterday';
export const isSameWeek = (time1) => time1.dateString === 'sameWeek'; // ignore the second argument
export const format = (time, pattern) => `${time} ${pattern}`;
