import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "@/payload/access/anyone";
import fields from "./fields";
import { revalidateProject, revalidateProjectDelete } from "./actions";

export const Projects: CollectionConfig = {
  slug: "projects",
  timestamps: true,
  orderable: true,
  trash: true,
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt"],
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectDelete],
  },
  fields: fields,
};
