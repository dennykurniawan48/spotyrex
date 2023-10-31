import { connectMongo } from "@/helper/database/conn";
import Users from "@/helper/database/model/userModel";
import clientPromise from "@/helper/library/clientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Account, AuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "./auth";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
