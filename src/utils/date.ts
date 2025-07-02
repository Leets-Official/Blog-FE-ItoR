import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.locale('en');

export const formatPostDate = (dateString: string): string => {
  const now = dayjs();
  const postDate = dayjs(dateString);
  const diffHours = now.diff(postDate, 'hour');

  if (diffHours < 24) {
    return diffHours === 0 ? '방금 전' : `${diffHours}시간 전`;
  } else {
    return postDate.format('MMM D . YYYY.');
  }
};
