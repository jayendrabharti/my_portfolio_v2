import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { GlobalConfig } from "payload";
import fields from "./fields";

export const TechStack: GlobalConfig = {
  slug: "tech-stack",
  label: "Tech Stack",
  access: {
    read: anyone,
    update: authenticated,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: true,
    },
  },
  fields: fields,
};
