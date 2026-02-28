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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          agent_id: string
          company_id: string
          contact_name: string
          country_code: string
          created_at: string
          email: string
          id: number
          mobile: string
          status: number
          user_type: number
        }
        Insert: {
          agent_id: string
          company_id: string
          contact_name: string
          country_code?: string
          created_at?: string
          email?: string
          id?: number
          mobile?: string
          status?: number
          user_type?: number
        }
        Update: {
          agent_id?: string
          company_id?: string
          contact_name?: string
          country_code?: string
          created_at?: string
          email?: string
          id?: number
          mobile?: string
          status?: number
          user_type?: number
        }
        Relationships: []
      }
      badge_translations: {
        Row: {
          badge_id: number
          content: string | null
          details: string | null
          home_header: string | null
          id: number
          impact: string | null
          lang: number
          show_more: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          badge_id: number
          content?: string | null
          details?: string | null
          home_header?: string | null
          id?: number
          impact?: string | null
          lang?: number
          show_more?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          badge_id?: number
          content?: string | null
          details?: string | null
          home_header?: string | null
          id?: number
          impact?: string | null
          lang?: number
          show_more?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "badge_translations_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          code: string | null
          created_at: string
          id: number
          image_url: string | null
          is_active: boolean
          map_url: string | null
          price: number
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_active?: boolean
          map_url?: string | null
          price?: number
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          is_active?: boolean
          map_url?: string | null
          price?: number
        }
        Relationships: []
      }
      companies: {
        Row: {
          address_1: string
          address_2: string
          address_3: string
          company_id: string
          company_name: string
          contact_name: string
          country: string
          country_code: string
          created_at: string
          email: string
          id: number
          mobile: string
          status: number
          tel: string
        }
        Insert: {
          address_1?: string
          address_2?: string
          address_3?: string
          company_id: string
          company_name: string
          contact_name: string
          country?: string
          country_code?: string
          created_at?: string
          email?: string
          id?: number
          mobile?: string
          status?: number
          tel?: string
        }
        Update: {
          address_1?: string
          address_2?: string
          address_3?: string
          company_id?: string
          company_name?: string
          contact_name?: string
          country?: string
          country_code?: string
          created_at?: string
          email?: string
          id?: number
          mobile?: string
          status?: number
          tel?: string
        }
        Relationships: []
      }
      country_codes: {
        Row: {
          country_name: string
          dial_code: string
          id: number
          is_active: boolean
        }
        Insert: {
          country_name: string
          dial_code: string
          id?: number
          is_active?: boolean
        }
        Update: {
          country_name?: string
          dial_code?: string
          id?: number
          is_active?: boolean
        }
        Relationships: []
      }
      orders: {
        Row: {
          badge_id: number
          created_at: string
          extra_help: number
          id: number
          payment_method: string | null
          payment_status: string
          price: number
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          badge_id: number
          created_at?: string
          extra_help?: number
          id?: number
          payment_method?: string | null
          payment_status?: string
          price?: number
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          badge_id?: number
          created_at?: string
          extra_help?: number
          id?: number
          payment_method?: string | null
          payment_status?: string
          price?: number
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact_name: string | null
          country_code: string | null
          created_at: string
          id: string
          lang: number
          mobile: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          contact_name?: string | null
          country_code?: string | null
          created_at?: string
          id: string
          lang?: number
          mobile?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          contact_name?: string | null
          country_code?: string | null
          created_at?: string
          id?: string
          lang?: number
          mobile?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rankings: {
        Row: {
          badge_id: number
          created_at: string
          id: number
          mark_id: number
          user_id: string
        }
        Insert: {
          badge_id: number
          created_at?: string
          id?: number
          mark_id?: number
          user_id: string
        }
        Update: {
          badge_id?: number
          created_at?: string
          id?: number
          mark_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rankings_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      sdg_badges: {
        Row: {
          badge_id: number
          id: number
          sdg_id: number
        }
        Insert: {
          badge_id: number
          id?: number
          sdg_id: number
        }
        Update: {
          badge_id?: number
          id?: number
          sdg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sdg_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      site_content: {
        Row: {
          aboutheader: string
          abouttitle: string
          addextra: string
          badge: string
          boardheader: string
          boardtitle: string
          collected: string
          contact: string
          contactus: string
          currency: string
          description: string
          detail: string
          duplicateerror: string
          email: string
          emailerror: string
          event: string
          faileddesc: string
          failedtitle: string
          formconfirmemail: string
          formdesc: string
          formemail: string
          formheader: string
          formmarketing: string
          formmobile: string
          formname: string
          formterm: string
          formtnc: string
          getstarted: string
          giveus: string
          greeting: string
          home: string
          id: number
          impact: string
          impactheader: string
          impactrecord: string
          impacttitle: string
          invildemail: string
          lang: number
          loginemail: string
          loginmobile: string
          mobileerror: string
          mypassport: string
          nameerror: string
          needhelp: string
          otpdescemail: string
          otpdescsms: string
          otpexpired: string
          otpheader: string
          otpinvalid: string
          passport: string
          reaction: string
          resendotp: string
          sdg: string
          showmore: string
          subheader: string
          submit: string
          successtitle: string
          sucessdesc: string
          summary: string
          support: string
          termerror: string
          travelambassador: string
          tryother: string
          verifyotp: string
          website: string
        }
        Insert: {
          aboutheader?: string
          abouttitle?: string
          addextra?: string
          badge?: string
          boardheader?: string
          boardtitle?: string
          collected?: string
          contact?: string
          contactus?: string
          currency?: string
          description?: string
          detail?: string
          duplicateerror?: string
          email?: string
          emailerror?: string
          event?: string
          faileddesc?: string
          failedtitle?: string
          formconfirmemail?: string
          formdesc?: string
          formemail?: string
          formheader?: string
          formmarketing?: string
          formmobile?: string
          formname?: string
          formterm?: string
          formtnc?: string
          getstarted?: string
          giveus?: string
          greeting?: string
          home?: string
          id: number
          impact?: string
          impactheader?: string
          impactrecord?: string
          impacttitle?: string
          invildemail?: string
          lang?: number
          loginemail?: string
          loginmobile?: string
          mobileerror?: string
          mypassport?: string
          nameerror?: string
          needhelp?: string
          otpdescemail?: string
          otpdescsms?: string
          otpexpired?: string
          otpheader?: string
          otpinvalid?: string
          passport?: string
          reaction?: string
          resendotp?: string
          sdg?: string
          showmore?: string
          subheader?: string
          submit?: string
          successtitle?: string
          sucessdesc?: string
          summary?: string
          support?: string
          termerror?: string
          travelambassador?: string
          tryother?: string
          verifyotp?: string
          website?: string
        }
        Update: {
          aboutheader?: string
          abouttitle?: string
          addextra?: string
          badge?: string
          boardheader?: string
          boardtitle?: string
          collected?: string
          contact?: string
          contactus?: string
          currency?: string
          description?: string
          detail?: string
          duplicateerror?: string
          email?: string
          emailerror?: string
          event?: string
          faileddesc?: string
          failedtitle?: string
          formconfirmemail?: string
          formdesc?: string
          formemail?: string
          formheader?: string
          formmarketing?: string
          formmobile?: string
          formname?: string
          formterm?: string
          formtnc?: string
          getstarted?: string
          giveus?: string
          greeting?: string
          home?: string
          id?: number
          impact?: string
          impactheader?: string
          impactrecord?: string
          impacttitle?: string
          invildemail?: string
          lang?: number
          loginemail?: string
          loginmobile?: string
          mobileerror?: string
          mypassport?: string
          nameerror?: string
          needhelp?: string
          otpdescemail?: string
          otpdescsms?: string
          otpexpired?: string
          otpheader?: string
          otpinvalid?: string
          passport?: string
          reaction?: string
          resendotp?: string
          sdg?: string
          showmore?: string
          subheader?: string
          submit?: string
          successtitle?: string
          sucessdesc?: string
          summary?: string
          support?: string
          termerror?: string
          travelambassador?: string
          tryother?: string
          verifyotp?: string
          website?: string
        }
        Relationships: []
      }
      user_links: {
        Row: {
          child_id: number
          id: number
          master_id: number
          status: number
        }
        Insert: {
          child_id: number
          id?: number
          master_id: number
          status?: number
        }
        Update: {
          child_id?: number
          id?: number
          master_id?: number
          status?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "agent" | "company_admin" | "admin"
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
    Enums: {
      app_role: ["user", "agent", "company_admin", "admin"],
    },
  },
} as const
