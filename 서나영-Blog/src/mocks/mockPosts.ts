import { BlogPost } from '@/types/blogPost';
import ImageExample from '@/assets/Image.jpg';

export const mockPosts: BlogPost[] = [
  {
    postId: '0',
    title: '16 Title one line',
    contents: [
      {
        contentOrder: 1,
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        contentType: 'TEXT',
      },
      {
        contentOrder: 2,
        content: ImageExample,
        contentType: 'IMAGE',
      },
      {
        contentOrder: 3,
        content: `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        contentType: 'TEXT',
      },
      {
        contentOrder: 4,
        content: ImageExample,
        contentType: 'IMAGE',
      },
    ],
    isOwner: true,
    comments: [
      {
        commentId: 1,
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        nickName: '댓글러1',
        isOwner: false,
      },
      {
        commentId: 2,
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        nickName: '닉네임',
        isOwner: true,
      },
    ],
    nickName: 'Nickname',
    profileUrl: '',
    createdAt: '2025-04-04T10:00:00Z',
  },
  {
    postId: '1',
    title: '16 Title one line',
    contents: [
      {
        contentOrder: 1,
        content: `텍스트, 이미지가 있는 게시글입니다.`,
        contentType: 'TEXT',
      },
      {
        contentOrder: 2,
        content: ImageExample,
        contentType: 'IMAGE',
      },
    ],
    isOwner: true,
    comments: [],
    nickName: '닉네임',
    profileUrl: '',
    createdAt: '2025-04-01T10:00:00Z',
  },
  {
    postId: '2',
    title: '16 Title one line',
    contents: [
      {
        contentOrder: 1,
        content: `댓글이 있는 게시글입니다.`,
        contentType: 'TEXT',
      },
    ],
    isOwner: true,
    comments: [
      {
        commentId: 1,
        content: '댓글입니다.',
        nickName: '닉네임1',
        isOwner: false,
      },
      {
        commentId: 2,
        content: '댓글일겁니다.',
        nickName: '닉네임2',
        isOwner: true,
      },
    ],
    nickName: '닉네임',
    profileUrl: ImageExample,
    createdAt: '2025-03-25T10:00:00Z',
  },
  {
    postId: '3',
    title: '16 Title one line',
    contents: [
      {
        contentOrder: 1,
        content: `텍스트만 있는 게시글입니다.`,
        contentType: 'TEXT',
      },
    ],
    isOwner: true,
    comments: [],
    nickName: '닉네임',
    profileUrl: '',
    createdAt: '2025-03-01T10:00:00Z',
  },
  {
    postId: '4',
    title: '16 Title one line',
    contents: [
      {
        contentOrder: 1,
        content: `텍스트만 있는 게시글입니다.`,
        contentType: 'TEXT',
      },
    ],
    isOwner: true,
    comments: [],
    nickName: '닉네임2',
    profileUrl: '',
    createdAt: '2025-02-01T10:00:00Z',
  },
];
