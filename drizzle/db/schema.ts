import { pgTable, serial, text, timestamp, varchar, pgEnum, smallint } from "drizzle-orm/pg-core";

const priceIdEnum = pgEnum("price_id", [process.env.PRICE_ID_BASIC!, process.env.PRICE_ID_PRO!]);
const socialMediaEnum = pgEnum("social_media", ["X", "Instagram", "LinkedIn"]);
const toneEnum = pgEnum("tone", ["Casual", "Conversational", "Humorous", "Professional", "Empathetic", "Enthusiastic", "Authoritative", "Serious", "Neutral", "Joyful", "Friendly", "Encouraging"]);

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerkId", { length: 100 }).notNull().unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }).unique(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  points: smallint("points").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  subscriptionId: varchar("susbscription_id", { length: 50 }).notNull().unique(),
  user: serial("user")
    .references(() => Users.id)
    .notNull()
    .unique(),
  priceId: priceIdEnum("price_id").notNull(),
})

export const GeneratedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  user: serial("user")
    .references(() => Users.id)
    .notNull(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  tone: toneEnum("tone").notNull(),
  numberOfHashtags: smallint("number_of_hashtags").notNull(),
  socialMedia: socialMediaEnum("social_media").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const XSettings = pgTable("x_settings", {
  id: serial("id").primaryKey(),
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
  numberOfTweets: smallint("number_of_tweets").notNull(),
  maxCharactersCountPerTweet: smallint("max_characters_count_per_tweet").notNull().default(280),
});

export const InstagramSettings = pgTable("instagram_settings", {
  id: serial("id").primaryKey(),
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
  imagePrompt: text("image_prompt"),
});

export const LinkedInSettings = pgTable("linkedin_settings", {
  id: serial("id").primaryKey(),
  generatedContentId: serial("generated_content")
    .references(() => GeneratedContent.id)
    .notNull(),
});