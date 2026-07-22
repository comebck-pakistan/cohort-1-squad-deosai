export type ReplyAction = "reply" | "handoff";

export type KnowledgeItem = {
  id: string;
  type: "website" | "document" | "qa";
  name: string;
  content: string;
};

export type AgentConfigRow = {
  seller_id: string;
  agent_prompt: string;
  agent_never_do: string;
  agent_memory: string;
  knowledge_items: KnowledgeItem[];
  tone_guidelines: string[];
  conciseness: string;
  hinglish_support: boolean;
  handoff_message: string;
};

export type ProductRow = {
  id: string | number;
  name: string;
  price: number | string | null;
  category: string | null;
  availability_status: string | null;
  description: string | null;
  metadata?: Record<string, unknown> | null;
};

export type SellerRow = {
  id: string;
  business_name: string | null;
  industry: string | null;
  website: string | null;
};

export type ApprovedFact = {
  id: string;
  text: string;
  score: number;
};

export type GroundedReply = {
  reply: string;
  action: ReplyAction;
  evidenceIds: string[];
};
