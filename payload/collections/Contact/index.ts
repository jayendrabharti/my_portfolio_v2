import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "@/payload/access/anyone";
import fields from "./fields";

export const Contact: CollectionConfig = {
  slug: "contact",
  labels: {
    singular: "Contact",
    plural: "Contacts",
  },
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
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    create: anyone,
    read: anyone,
    admin: authenticated,
    delete: authenticated,
    update: authenticated,
  },
  fields: fields,
};
