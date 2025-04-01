import { Post } from '@/types/post';
import { faker } from '@faker-js/faker';

export const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => {
  const now = new Date();

  const randomMinutesAgo = faker.number.int({ min: 0, max: 7200 });
  const createdAt = new Date(now.getTime() - randomMinutesAgo * 60 * 1000).toISOString();

  return {
    id: i + 1,
    title: faker.lorem.words(),
    content: Math.random() < 0.5 ? faker.lorem.paragraph() : faker.lorem.paragraphs(),
    nickName: faker.internet.username(),
    createAt: createdAt,
    image:
      Math.random() < 0.5 ? `https://picsum.photos/seed/${faker.string.uuid()}/220/220` : undefined,
    commentCount: faker.number.int({ min: 0, max: 20 }),
    profileImage: faker.image.avatar(),
  };
});
