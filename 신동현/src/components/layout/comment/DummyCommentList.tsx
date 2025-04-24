import { faker } from "@faker-js/faker";
import Image from "@/components/ui/Image";

interface DummyCommentListProps {
  commentCount: number;
}

const DummyCommentList = ({ commentCount }: DummyCommentListProps) => {
  const commentList = Array.from({ length: commentCount }, () => ({
    id: faker.string.uuid(),
    nickname: faker.person.fullName(),
    content: faker.lorem.paragraphs(1),
    profileImage: <Image src={faker.image.avatar()} width="20px" height="20px" alt="profile image" />,
    writeDate: faker.date.recent(),
  }));
  return commentList;
};

export default DummyCommentList;


