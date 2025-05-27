import { signUpSocialSchema } from "@/schema/auth";
import { Control } from "react-hook-form";
import { createContext } from "react";
import { z } from "zod";

export const SocialControlContext = createContext<{ control: Control<z.infer<typeof signUpSocialSchema>> } | null>(null);
