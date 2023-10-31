import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { connectMongo } from "@/helper/database/conn";
import Users from "@/helper/database/model/userModel";
import clientPromise from "@/helper/library/clientPromise";
import { Account, AuthOptions, Session, SessionStrategy, User } from "next-auth";
const jwt = require("jsonwebtoken");

export const authOptions = {
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt(params:{ token: JWT, account: Account, user: User}) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        return params.token
      },
      async session(params: { session: Session, token: JWT }): Promise<Session> {
      //   console.log(params)
        params.session.user = params.token
        return params.session
      },
      async redirect(params: { url: string, baseUrl: string }) {
        return "/"
      }
    },
    session: {
      strategy: "jwt" as SessionStrategy,
      maxAge: 60 * 60 * 24 * 30,
    },
    jwt: {
      async encode(params: {
        token: JWT;
        secret: string;
        maxAge: number;
      }): Promise<string> {
        // return a custom encoded JWT string
        connectMongo().catch((err) => {
          console.log("error")
        });
  
        const data = await Users.findOne({email: params.token.email})
        
      //   const user = await prisma.user.findUnique({where:{email: params.token.email!}})
        return jwt.sign(
          {
            name: params.token.name,
            sub: params.token.sub,
            email: params.token.email,
            picture: params.token.picture,
            exp: Math.floor(Date.now() / 1000) + params.maxAge,
            id: data._id
          },
          params.secret
        );
       },
      async decode(params: {
        token: string;
        secret: string;
      }): Promise<JWT | null> {
        // return a `JWT` object, or `null` if decoding failed
        return new Promise((resolve, reject) => {
          try {
            const decoded = jwt.verify(params.token, params.secret);
            resolve(decoded);
          } catch (err) {
            resolve(null);
          }
        });
      },
    }
  };