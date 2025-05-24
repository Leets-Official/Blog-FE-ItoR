import { atom } from "jotai";

export interface Post {
  type: "paragraph" | "image";
  url?: string;
  children: { text: string }[];
}

export const isModifyAtom = atom(false);

export const postElementsAtom = atom<Post[]>([]);
