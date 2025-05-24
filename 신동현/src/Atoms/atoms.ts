import { PostAtom } from "@/type/Post/Post";
import { PostComment } from "@/type/Post/PostCommnet";
import { PostContent } from "@/type/Post/PostContent";
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
