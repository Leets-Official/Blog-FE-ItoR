import { faker } from "@faker-js/faker";
import Image from "@/components/ui/Image";

interface DummyPostListProps {
  postCount: number;
}

const DummyPostList = ({ postCount }: DummyPostListProps) => {
  const postList = Array.from({ length: postCount }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(10),
    content: faker.lorem.paragraphs(1),
    userProfileImage: <Image src={faker.image.avatar()} width="16px" height="16px" alt="profile image" />,
    userName: faker.person.fullName(),
    writeDate: faker.date.recent(),
    commentCount: faker.number.int({ min: 0, max: 100 }),
    postImage: <Image src={faker.image.url({ width: 100, height: 100 })} alt="post image" />,
  }));
  return postList;
};

export default DummyPostList;


