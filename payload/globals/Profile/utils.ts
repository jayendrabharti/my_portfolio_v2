import { Profile } from "@/payload/payload-types";

export default function isProfileComplete(profile: Profile): boolean {
  if (
    !profile ||
    !profile.id ||
    !profile.name ||
    !profile.email ||
    !profile.logoText ||
    !profile.avatar ||
    !profile.bio
  ) {
    return false;
  } else {
    return true;
  }
}
