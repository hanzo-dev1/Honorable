import type { ComponentType } from "react";
import { N8nLogo } from "@/components/logos/N8nLogo";
import { OpenAILogo } from "@/components/logos/OpenAILogo";
import { AnthropicLogo } from "@/components/logos/AnthropicLogo";
import { SupabaseLogo } from "@/components/logos/SupabaseLogo";
import { PaystackLogo } from "@/components/logos/PaystackLogo";
import { TelegramLogo } from "@/components/logos/TelegramLogo";
import { WhatsAppLogo } from "@/components/logos/WhatsAppLogo";
import { GoogleSheetsLogo } from "@/components/logos/GoogleSheetsLogo";
import { GmailLogo } from "@/components/logos/GmailLogo";
import { GoogleCalendarLogo } from "@/components/logos/GoogleCalendarLogo";
import { PostgresqlLogo } from "@/components/logos/PostgresqlLogo";
import { RedisLogo } from "@/components/logos/RedisLogo";
import { VercelLogo } from "@/components/logos/VercelLogo";
import { NextJsLogo } from "@/components/logos/NextJsLogo";
import { TypeScriptLogo } from "@/components/logos/TypeScriptLogo";
import { TailwindLogo } from "@/components/logos/TailwindLogo";
import { TwilioLogo } from "@/components/logos/TwilioLogo";
import { StripeLogo } from "@/components/logos/StripeLogo";
import { AirtableLogo } from "@/components/logos/AirtableLogo";
import { SlackLogo } from "@/components/logos/SlackLogo";
import { NotionLogo } from "@/components/logos/NotionLogo";
import { HubSpotLogo } from "@/components/logos/HubSpotLogo";
import { ZapierLogo } from "@/components/logos/ZapierLogo";
import { MakeLogo } from "@/components/logos/MakeLogo";
import { DockerLogo } from "@/components/logos/DockerLogo";
import { GitHubLogo } from "@/components/logos/GitHubLogo";
import { CloudflareLogo } from "@/components/logos/CloudflareLogo";
import { GoogleDriveLogo } from "@/components/logos/GoogleDriveLogo";
import { FigmaLogo } from "@/components/logos/FigmaLogo";
import { ShopifyLogo } from "@/components/logos/ShopifyLogo";
import { MongoDbLogo } from "@/components/logos/MongoDbLogo";
import { PineconeLogo } from "@/components/logos/PineconeLogo";

export interface StackLogo {
  name: string;
  Icon: ComponentType<{ className?: string }>;
}

export const stackRowA: StackLogo[] = [
  { name: "n8n", Icon: N8nLogo },
  { name: "OpenAI", Icon: OpenAILogo },
  { name: "Anthropic", Icon: AnthropicLogo },
  { name: "Supabase", Icon: SupabaseLogo },
  { name: "Paystack", Icon: PaystackLogo },
  { name: "Telegram", Icon: TelegramLogo },
  { name: "WhatsApp", Icon: WhatsAppLogo },
  { name: "Google Sheets", Icon: GoogleSheetsLogo },
  { name: "Gmail", Icon: GmailLogo },
  { name: "Google Calendar", Icon: GoogleCalendarLogo },
  { name: "PostgreSQL", Icon: PostgresqlLogo },
  { name: "Redis", Icon: RedisLogo },
  { name: "Vercel", Icon: VercelLogo },
  { name: "Next.js", Icon: NextJsLogo },
  { name: "TypeScript", Icon: TypeScriptLogo },
  { name: "Tailwind", Icon: TailwindLogo },
];

export const stackRowB: StackLogo[] = [
  { name: "Twilio", Icon: TwilioLogo },
  { name: "Stripe", Icon: StripeLogo },
  { name: "Airtable", Icon: AirtableLogo },
  { name: "Slack", Icon: SlackLogo },
  { name: "Notion", Icon: NotionLogo },
  { name: "HubSpot", Icon: HubSpotLogo },
  { name: "Zapier", Icon: ZapierLogo },
  { name: "Make", Icon: MakeLogo },
  { name: "Docker", Icon: DockerLogo },
  { name: "GitHub", Icon: GitHubLogo },
  { name: "Cloudflare", Icon: CloudflareLogo },
  { name: "Google Drive", Icon: GoogleDriveLogo },
  { name: "Figma", Icon: FigmaLogo },
  { name: "Shopify", Icon: ShopifyLogo },
  { name: "MongoDB", Icon: MongoDbLogo },
  { name: "Pinecone", Icon: PineconeLogo },
];
