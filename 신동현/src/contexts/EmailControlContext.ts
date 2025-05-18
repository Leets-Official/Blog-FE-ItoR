import { signUpEmailSchema } from "@/schema/auth";
import { createContext } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

export const EmailControlContext = createContext<{ control: Control<z.infer<typeof signUpEmailSchema>> } | null>(null);

