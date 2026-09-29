export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      demo_leads: {
        Row: {
          company: string
          company_size: string
          created_at: string
          email: string
          full_name: string
          id: string
          source: string | null
          status: string
        }
        Insert: {
          company: string
          company_size: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          source?: string | null
          status?: string
        }
        Update: {
          company?: string
          company_size?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          source?: string | null
          status?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          advance_amount: number
          advance_percent: number
          balance_due: number
          client_address: string | null
          client_company: string
          client_email: string
          client_name: string
          created_at: string
          currency: string
          discount_amount: number
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          items: Json
          last_sent_at: string | null
          notes: string | null
          payment_instructions: string | null
          payment_method: string | null
          sent_to_email: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_percent: number
          total: number
          updated_at: string
        }
        Insert: {
          advance_amount?: number
          advance_percent?: number
          balance_due?: number
          client_address?: string | null
          client_company: string
          client_email: string
          client_name: string
          created_at?: string
          currency?: string
          discount_amount?: number
          due_date: string
          id: string
          invoice_number: string
          issue_date?: string
          items?: Json
          last_sent_at?: string | null
          notes?: string | null
          payment_instructions?: string | null
          payment_method?: string | null
          sent_to_email?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_percent?: number
          total?: number
          updated_at?: string
        }
        Update: {
          advance_amount?: number
          advance_percent?: number
          balance_due?: number
          client_address?: string | null
          client_company?: string
          client_email?: string
          client_name?: string
          created_at?: string
          currency?: string
          discount_amount?: number
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          items?: Json
          last_sent_at?: string | null
          notes?: string | null
          payment_instructions?: string | null
          payment_method?: string | null
          sent_to_email?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_percent?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number
          client_company: string
          client_email: string
          client_name: string
          client_phone: string | null
          client_whatsapp: string | null
          created_at: string
          currency: string
          description: string | null
          id: string
          media_files: Json
          milestones: Json
          notes: string | null
          priority: string
          requirements: Json
          services: Json
          start_date: string
          status: string
          target_launch_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number
          client_company: string
          client_email: string
          client_name: string
          client_phone?: string | null
          client_whatsapp?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id: string
          media_files?: Json
          milestones?: Json
          notes?: string | null
          priority?: string
          requirements?: Json
          services?: Json
          start_date?: string
          status?: string
          target_launch_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number
          client_company?: string
          client_email?: string
          client_name?: string
          client_phone?: string | null
          client_whatsapp?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          media_files?: Json
          milestones?: Json
          notes?: string | null
          priority?: string
          requirements?: Json
          services?: Json
          start_date?: string
          status?: string
          target_launch_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
