import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "@/payload/access/anyone";
import fields from "./fields";
import {
  revalidateEducation,
  revalidateEducationDelete,
} from "./actions";

export const Education: CollectionConfig = {
  slug: "education",
  labels: {
    singular: "Education",
    plural: "Educations",
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
    useAsTitle: "schoolName",
    defaultColumns: [
      "schoolName",
      "course",
      "fromYear",
      "toYear",
      "gradeValue",
    ],
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateEducation],
    afterDelete: [revalidateEducationDelete],
  },
  fields: fields,
};
