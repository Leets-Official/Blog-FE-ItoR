import { Post } from '@/types/post';
import { faker } from '@faker-js/faker';

export const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  nickName: faker.internet.username(),
  createAt: faker.date.recent().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  image: faker.image.urlPicsumPhotos(),
  commentCount: faker.number.int({ min: 0, max: 20 }),
  profileImage: faker.image.avatar(),
}));
