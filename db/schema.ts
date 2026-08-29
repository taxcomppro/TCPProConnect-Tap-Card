import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const proConnectProfiles = sqliteTable("proconnect_profiles", {
  id: text("id").primaryKey(),
  taxCompProUserId: text("tax_comp_pro_user_id").notNull().unique(),
  slug: text("slug").notNull().unique(),
  fullName: text("full_name").notNull(),
  title: text("title").notNull().default("Tax Professional"),
  company: text("company").notNull().default(""),
  location: text("location").notNull().default(""),
  bio: text("bio").notNull().default(""),
  initials: text("initials").notNull().default("TCP"),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  website: text("website").notNull().default(""),
  bookingUrl: text("booking_url").notNull().default(""),
  marketplaceUrl: text("marketplace_url").notNull().default(""),
  specialtiesJson: text("specialties_json").notNull().default("[]"),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const proConnectCards = sqliteTable("proconnect_cards", {
  id: text("id").primaryKey(),
  tokenHash: text("token_hash").notNull().unique(),
  displayCode: text("display_code").notNull().unique(),
  status: text("status", { enum: ["AVAILABLE", "ACTIVE", "SUSPENDED", "RETIRED"] }).notNull().default("AVAILABLE"),
  createdAt: text("created_at").notNull(),
  activatedAt: text("activated_at"),
  suspendedAt: text("suspended_at"),
}, (table) => [index("idx_proconnect_cards_status").on(table.status)]);

export const proConnectCardAssignments = sqliteTable("proconnect_card_assignments", {
  id: text("id").primaryKey(),
  cardId: text("card_id").notNull().references(() => proConnectCards.id),
  profileId: text("profile_id").notNull().references(() => proConnectProfiles.id),
  signupSessionId: text("signup_session_id").notNull(),
  membershipId: text("membership_id").notNull(),
  membershipPlan: text("membership_plan").notNull(),
  issuedByStaffId: text("issued_by_staff_id").notNull(),
  status: text("status", { enum: ["ACTIVE", "REVOKED"] }).notNull().default("ACTIVE"),
  assignedAt: text("assigned_at").notNull(),
  revokedAt: text("revoked_at"),
}, (table) => [
  uniqueIndex("uq_proconnect_assignment_card_active").on(table.cardId).where(sql`${table.status} = 'ACTIVE'`),
  uniqueIndex("uq_proconnect_assignment_signup_active").on(table.signupSessionId).where(sql`${table.status} = 'ACTIVE'`),
  index("idx_proconnect_assignments_profile_status").on(table.profileId, table.status),
  index("idx_proconnect_assignments_signup_session").on(table.signupSessionId),
]);

export const proConnectLinks = sqliteTable("proconnect_links", {
  id: text("id").primaryKey(),
  profileId: text("profile_id").notNull().references(() => proConnectProfiles.id),
  label: text("label").notNull(),
  description: text("description").notNull().default(""),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  visibility: text("visibility", { enum: ["PUBLIC", "MEMBERS_ONLY", "PRIVATE"] }).notNull().default("PUBLIC"),
}, (table) => [index("idx_proconnect_links_profile_sort").on(table.profileId, table.sortOrder)]);

export const proConnectConnections = sqliteTable("proconnect_connections", {
  id: text("id").primaryKey(),
  profileId: text("profile_id").notNull().references(() => proConnectProfiles.id),
  cardId: text("card_id").notNull().references(() => proConnectCards.id),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  note: text("note").notNull().default(""),
  consentedAt: text("consented_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [index("idx_proconnect_connections_profile_created").on(table.profileId, table.createdAt)]);

export const proConnectEvents = sqliteTable("proconnect_events", {
  id: text("id").primaryKey(),
  cardId: text("card_id").notNull().references(() => proConnectCards.id),
  profileId: text("profile_id").notNull().references(() => proConnectProfiles.id),
  eventType: text("event_type", { enum: ["PROFILE_VIEW", "CONTACT_SAVE", "LINK_CLICK", "CONNECTION_SHARED"] }).notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [index("idx_proconnect_events_profile_created").on(table.profileId, table.createdAt)]);
