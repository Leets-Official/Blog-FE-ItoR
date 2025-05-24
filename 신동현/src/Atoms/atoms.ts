import { atom } from "jotai";

export type Post = {
  type: "paragraph" | "image";
  url?: string;
  children: { text: string }[];
};

export const isModifyAtom = atom(false);

export const postElementsAtom = atom<Post[]>([]);
