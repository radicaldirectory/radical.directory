import { config } from "@keystone-next/keystone";
import { statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";

import { lists } from "./schema";

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `id name role {
    canManageContent
    canManageUsers
  }`,
  initFirstItem: {
    fields: ["name", "email", "password"],
    itemData: {
      role: {
        create: {
          name: "Super User",
          canManageContent: true,
          canManageUsers: true,
        },
      },
    },
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: process.env.DB_PASSWORD
        ? `postgresql://doadmin:${process.env.DB_PASSWORD}@app-375043ea-83f4-478e-b2b5-479d6c35ae5e-do-user-7952506-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require&schema=public`
        : "postgres://postgres:postgres@localhost:5432/rd-keystone",
      useMigrations: true,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    graphql: {
      apolloConfig: {
        introspection: process.env.NODE_ENV !== "production",
      },
    },
  })
);
