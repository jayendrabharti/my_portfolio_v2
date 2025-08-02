import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { anyone } from "@/payload/access/anyone";
import fields from "./fields";
import {
  revalidateWorkExperience,
  revalidateWorkExperienceDelete,
} from "./actions";

export const WorkExperience: CollectionConfig = {
  slug: "work-experience",
  labels: {
    singular: "Work Experience",
    plural: "Work Experiences",
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
    useAsTitle: "companyName",
    defaultColumns: [
      "companyName",
      "position",
      "current",
      "startDate",
      "endDate",
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
    afterChange: [revalidateWorkExperience],
    afterDelete: [revalidateWorkExperienceDelete],
  },
  fields: fields,
};
