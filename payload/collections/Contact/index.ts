import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "@/payload/access/anyone";
import fields from "./fields";
import { revalidateContact, revalidateContactDelete } from "./actions";

export const Contact: CollectionConfig = {
  slug: "contact",
  labels: {
    singular: "Contact",
    plural: "Contacts",
  },
  timestamps: true,
  orderable: true,
  trash: true,
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
  hooks: {
    afterChange: [revalidateContact],
    afterDelete: [revalidateContactDelete],
  },
  fields: fields,
};
