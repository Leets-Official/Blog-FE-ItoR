import { Post } from '@/types/post';
import { faker } from '@faker-js/faker';

export const mockPosts: Post[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: faker.lorem.words(),
  content: Math.random() < 0.5 ? faker.lorem.paragraph() : faker.lorem.paragraphs(),
  nickName: faker.internet.username(),
  createAt: faker.date.recent().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  image:
    Math.random() < 0.5 ? `https://picsum.photos/seed/${faker.string.uuid()}/220/220` : undefined,
  commentCount: faker.number.int({ min: 0, max: 20 }),
  profileImage: faker.image.avatar(),
}));
