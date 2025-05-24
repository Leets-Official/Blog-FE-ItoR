import { PostAtom } from "@/assets/type/Post";
import { PostComment } from "@/assets/type/PostCommnet";
import { PostContent } from "@/assets/type/PostContent";
import { atom } from "jotai";

export const isModifyAtom = atom(false);

export const postElementsAtom = atom<PostAtom[]>([]);

export const isOwnerAtom = atom(false);

export const postContentAtom = atom<PostContent>({
  title: '',
  contents: [],
  nickName: '',
  profileUrl: '',
  createdAt: '',
  commentCount: 0
});

export const postCommentAtom = atom<PostComment[]>([]);
