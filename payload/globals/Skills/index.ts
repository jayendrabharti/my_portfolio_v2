import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { GlobalConfig } from "payload";
import fields from "./fields";
import { revalidateSkills } from "./actions";

export const Skills: GlobalConfig = {
  slug: "skills",
  label: "Skills",
  access: {
    read: anyone,
    update: authenticated,
  },

  admin: {
    description:
      "Manage your skills, including names, icons, URLs, and descriptions.",
  },
  hooks: {
    afterChange: [revalidateSkills],
  },
  fields: fields,
};
