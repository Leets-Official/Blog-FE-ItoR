import { Post } from '@/types/post';
import { faker } from '@faker-js/faker';

export const mockPosts: Post[] = Array.from({ length: 30 }, (_, i) => {
  const now = new Date();

  const createAt = (() => {
    // test
    if (i < 5) {
      // 하루 이상 지난 날짜 (2일전)
      const pastDate = new Date(now);
      pastDate.setDate(pastDate.getDate() - 2);
      return pastDate.toISOString();
    } else {
      // 하루 이하 ( 13시간 전)
      const recentDate = new Date(now);
      recentDate.setHours(recentDate.getHours() - 13);
      return recentDate.toISOString();
    }
  })();

  return {
    id: i + 1,
    title: faker.lorem.words(),
    content: Math.random() < 0.5 ? faker.lorem.paragraph() : faker.lorem.paragraphs(),
    nickName: faker.internet.username(),
    createAt,
    image:
      Math.random() < 0.5 ? `https://picsum.photos/seed/${faker.string.uuid()}/220/220` : undefined,
    commentCount: faker.number.int({ min: 0, max: 20 }),
    profileImage: faker.image.avatar(),
  };
});
