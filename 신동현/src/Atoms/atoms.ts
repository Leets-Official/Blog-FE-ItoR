import { PostAtom, PostContent, Comment } from "@/type/Post/Post";

import { atom } from "jotai";

export const isModifyAtom = atom(false);

export const postElementsAtom = atom<PostAtom[]>([]);

export const isOwnerAtom = atom(false);

export const postContentAtom = atom<PostContent>({
  postId: '',
  title: '',
  contents: [],
  isOwner: false,
  comments: [],
  nickName: '',
  profileUrl: '',
  createdAt: ''
});

export const postCommentAtom = atom<Comment[]>([]);
