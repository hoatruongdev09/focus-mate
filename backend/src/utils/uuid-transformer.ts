import { ValueTransformer } from "typeorm";

export const removeDashes: ValueTransformer = {
    from: (str: string | null | undefined) => str != null ? str.replace(/-/g, "") : str,
    to: (str: string | null | undefined) => str != null ? str.replace(/-/g, "") : str,
}