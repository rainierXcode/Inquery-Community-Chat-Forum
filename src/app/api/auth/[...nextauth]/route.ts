import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import  CredentialsProvider  from "next-auth/providers/credentials";
import { queryDatabase } from "@/lib/db";
import bcrypt from "bcrypt";


export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!
      }),

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const query = "SELECT * FROM users WHERE email = $1"
          const params = [credentials?.email]

         
          try{
            const res = await queryDatabase(query, params);
            const user  = res.rows[0];
           
            if (user) {
              
              if (!credentials?.password) {
                throw new Error("Missing credentials");
              }

              if (!user?.password_hash) {
                throw new Error("Missing stored password hash.");
              }

              const isValid = await bcrypt.compare(credentials?.password, user.password_hash);

     
          
              if (!isValid) {
                throw new Error("Not valid: " );
                return null;
              }
              
              return { id: user.id, email: user.email }
            } else {
              return null
            }
          }catch (error) {
            console.error("Login error:", error);
            return null;
          }
        }
      })
    ],
    debug: true
  };
  
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
