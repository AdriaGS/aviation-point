import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const { handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google, Facebook],
});

export const { GET, POST } = handlers;
