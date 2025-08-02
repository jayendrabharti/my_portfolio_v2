import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { GlobalConfig } from "payload";
import fields from "./fields";
import { revalidateProfile } from "./actions";

export const Profile: GlobalConfig = {
  slug: "profile",
  label: "Profile",
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
  hooks: {
    afterChange: [revalidateProfile],
  },
  fields: fields,
};
