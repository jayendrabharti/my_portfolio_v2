import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import path from "path";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Blogs } from "./payload/collections/Blogs";
import { Projects } from "./payload/collections/Projects";
import { TechStack } from "./payload/globals/TechStack";
import { MyInfo } from "./payload/globals/MyInfo";
import { WorkExperience } from "./payload/collections/WorkExperience";
import { Contact } from "./payload/collections/Contact";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Blogs, Projects, Media, WorkExperience, Contact],
  globals: [MyInfo, TechStack],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload/payload-types.ts"),
  },
});
