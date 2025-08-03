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
import { WorkExperience } from "./payload/collections/WorkExperience";
import { Contact } from "./payload/collections/Contact";
import { Profile } from "./payload/globals/Profile";
import { Skills } from "./payload/globals/Skills";
import { Settings } from "./payload/globals/Settings";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

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
  globals: [Profile, Skills, Settings],
  collections: [Users, Blogs, Projects, Media, WorkExperience, Contact],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload/payload-types.ts"),
  },
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER ?? "info@payloadcms.com",
    defaultFromName: "Payload",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
});
