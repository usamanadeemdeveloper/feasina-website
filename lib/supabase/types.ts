// Hand-authored, trimmed to only what the storefront actually touches
// (products_storefront, flavours, pack_sizes, place_order). The full schema
// lives in feasina-admin/lib/supabase/types.ts -- update both any time
// supabase/migrations/*.sql changes in feasina-admin (see its docs/ARCHITECTURE.md).

export type FlavourStatus = "active" | "coming_soon" | "out_of_stock" | "discontinued";
export type ClientType = "retail" | "wholesale";
export type LedgerEntryType = "charge" | "payment" | "adjustment";

export interface ClientAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
}

export interface Database {
  public: {
    Tables: {
      flavours: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          status: FlavourStatus;
          is_bestseller: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["flavours"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["flavours"]["Row"]>;
        Relationships: [];
      };
      pack_sizes: {
        Row: {
          id: string;
          label: string;
          sachet_count: number;
        };
        Insert: Partial<Database["public"]["Tables"]["pack_sizes"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["pack_sizes"]["Row"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          client_id: string;
          source: "online" | "manual";
          status: "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
          payment_status: "unpaid" | "paid";
          subtotal: number;
          shipping_fee: number;
          discount_total: number;
          total: number;
          shipping_address: ClientAddress | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Relationships: [];
      };
      // Only the columns the wholesale portal actually reads (dashboard
      // balance/profile) -- client_product_prices is deliberately not
      // modeled here at all, since the website never queries it directly
      // (get_wholesale_catalog()/place_wholesale_order() resolve it
      // server-side; see feasina-admin/supabase/migrations/0020, 0021).
      clients: {
        Row: {
          id: string;
          auth_user_id: string | null;
          client_type: ClientType;
          full_name: string;
          email: string | null;
          phone: string | null;
          address: ClientAddress | null;
          balance: number;
        };
        Insert: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
        Relationships: [];
      };
      client_ledger_entries: {
        Row: {
          id: string;
          client_id: string;
          entry_type: LedgerEntryType;
          amount: number;
          order_id: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["client_ledger_entries"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["client_ledger_entries"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {
      products_storefront: {
        Row: {
          product_id: string;
          sku: string;
          flavour_id: string;
          pack_size_id: string;
          retail_price: number;
          is_active: boolean;
          quantity_on_hand: number;
          flavour_name: string;
          flavour_slug: string;
          flavour_description: string | null;
          flavour_status: FlavourStatus;
          is_bestseller: boolean;
          pack_label: string;
          sachet_count: number;
        };
        Relationships: [];
      };
    };
    Functions: {
      place_order: {
        Args: {
          p_full_name: string;
          p_email: string;
          p_phone: string | null;
          p_address: ClientAddress;
          p_items: { product_id: string; quantity: number }[];
          p_notes?: string | null;
        };
        Returns: Database["public"]["Tables"]["orders"]["Row"];
      };
      get_wholesale_catalog: {
        Args: Record<string, never>;
        Returns: {
          product_id: string;
          sku: string;
          flavour_id: string;
          pack_size_id: string;
          price: number;
          is_active: boolean;
          quantity_on_hand: number;
          flavour_name: string;
          flavour_slug: string;
          flavour_description: string | null;
          flavour_status: FlavourStatus;
          is_bestseller: boolean;
          pack_label: string;
          sachet_count: number;
        }[];
      };
      place_wholesale_order: {
        Args: {
          p_items: { product_id: string; quantity: number }[];
          p_notes?: string | null;
        };
        Returns: Database["public"]["Tables"]["orders"]["Row"];
      };
    };
  };
}
