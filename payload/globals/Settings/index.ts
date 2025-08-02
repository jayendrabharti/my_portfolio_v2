import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";
import { GlobalConfig } from "payload";
import fields from "./fields";
import { revalidateSettings } from "./actions";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Settings",
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateSettings],
  },
  fields: fields,
};
