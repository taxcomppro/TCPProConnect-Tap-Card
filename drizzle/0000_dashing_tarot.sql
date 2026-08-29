CREATE TABLE `proconnect_card_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`card_id` text NOT NULL,
	`profile_id` text NOT NULL,
	`signup_session_id` text NOT NULL,
	`membership_id` text NOT NULL,
	`membership_plan` text NOT NULL,
	`issued_by_staff_id` text NOT NULL,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`assigned_at` text NOT NULL,
	`revoked_at` text,
	FOREIGN KEY (`card_id`) REFERENCES `proconnect_cards`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_id`) REFERENCES `proconnect_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_proconnect_assignment_card_active` ON `proconnect_card_assignments` (`card_id`) WHERE "proconnect_card_assignments"."status" = 'ACTIVE';--> statement-breakpoint
CREATE INDEX `idx_proconnect_assignments_profile_status` ON `proconnect_card_assignments` (`profile_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_proconnect_assignments_signup_session` ON `proconnect_card_assignments` (`signup_session_id`);--> statement-breakpoint
CREATE TABLE `proconnect_cards` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`display_code` text NOT NULL,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`created_at` text NOT NULL,
	`activated_at` text,
	`suspended_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `proconnect_cards_token_hash_unique` ON `proconnect_cards` (`token_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `proconnect_cards_display_code_unique` ON `proconnect_cards` (`display_code`);--> statement-breakpoint
CREATE INDEX `idx_proconnect_cards_status` ON `proconnect_cards` (`status`);--> statement-breakpoint
CREATE TABLE `proconnect_connections` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`card_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`consented_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `proconnect_profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`card_id`) REFERENCES `proconnect_cards`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_proconnect_connections_profile_created` ON `proconnect_connections` (`profile_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `proconnect_events` (
	`id` text PRIMARY KEY NOT NULL,
	`card_id` text NOT NULL,
	`profile_id` text NOT NULL,
	`event_type` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`card_id`) REFERENCES `proconnect_cards`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_id`) REFERENCES `proconnect_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_proconnect_events_profile_created` ON `proconnect_events` (`profile_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `proconnect_links` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`label` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`visibility` text DEFAULT 'PUBLIC' NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `proconnect_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_proconnect_links_profile_sort` ON `proconnect_links` (`profile_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `proconnect_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`tax_comp_pro_user_id` text NOT NULL,
	`slug` text NOT NULL,
	`full_name` text NOT NULL,
	`title` text DEFAULT 'Tax Professional' NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`initials` text DEFAULT 'TCP' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`booking_url` text DEFAULT '' NOT NULL,
	`marketplace_url` text DEFAULT '' NOT NULL,
	`specialties_json` text DEFAULT '[]' NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `proconnect_profiles_tax_comp_pro_user_id_unique` ON `proconnect_profiles` (`tax_comp_pro_user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `proconnect_profiles_slug_unique` ON `proconnect_profiles` (`slug`);