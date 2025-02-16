import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const { handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google, Github],
});

export const { GET, POST } = handlers;
