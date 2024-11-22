import { authOptions } from "../../../../../utils/authOptions";

const { default: NextAuth } = require("next-auth/next");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
