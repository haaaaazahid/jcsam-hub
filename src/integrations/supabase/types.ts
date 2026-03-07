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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          full_name?: string
          id: string
          username?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
      colleges: {
        Row: {
          address: string
          contact_person: string
          created_at: string
          email: string
          id: string
          logo: string
          name: string
          phone: string
          registration_date: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          logo?: string
          name: string
          phone?: string
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          logo?: string
          name?: string
          phone?: string
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      committee_members: {
        Row: {
          created_at: string
          designation: string
          display_order: number
          id: string
          image: string
          institution: string
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          designation?: string
          display_order?: number
          id?: string
          image?: string
          institution?: string
          name: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          designation?: string
          display_order?: number
          id?: string
          image?: string
          institution?: string
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string
          created_at: string
          date: string
          id: string
          sport_id: string | null
          updated_at: string
          url: string
        }
        Insert: {
          caption?: string
          created_at?: string
          date?: string
          id?: string
          sport_id?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          caption?: string
          created_at?: string
          date?: string
          id?: string
          sport_id?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      notices: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          image: string
          pdf_url: string
          priority: string
          sport_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          image?: string
          pdf_url?: string
          priority?: string
          sport_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          image?: string
          pdf_url?: string
          priority?: string
          sport_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notices_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          age: number
          college_id: string | null
          contact: string
          created_at: string
          id: string
          id_document: string
          name: string
          sport_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          age?: number
          college_id?: string | null
          contact?: string
          created_at?: string
          id?: string
          id_document?: string
          name: string
          sport_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          age?: number
          college_id?: string | null
          contact?: string
          created_at?: string
          id?: string
          id_document?: string
          name?: string
          sport_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          created_at: string
          date: string
          id: string
          schedule_id: string | null
          score: string
          sport_id: string | null
          summary: string
          updated_at: string
          winner: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          schedule_id?: string | null
          score?: string
          sport_id?: string | null
          summary?: string
          updated_at?: string
          winner?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          schedule_id?: string | null
          score?: string
          sport_id?: string | null
          summary?: string
          updated_at?: string
          winner?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          date: string
          id: string
          result_id: string | null
          sport_id: string | null
          status: string
          team1: string
          team2: string
          time: string
          title: string
          updated_at: string
          venue: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          result_id?: string | null
          sport_id?: string | null
          status?: string
          team1?: string
          team2?: string
          time?: string
          title: string
          updated_at?: string
          venue?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          result_id?: string | null
          sport_id?: string | null
          status?: string
          team1?: string
          team2?: string
          time?: string
          title?: string
          updated_at?: string
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sport_images: {
        Row: {
          caption: string
          created_at: string
          display_order: number
          id: string
          sport_id: string
          url: string
        }
        Insert: {
          caption?: string
          created_at?: string
          display_order?: number
          id?: string
          sport_id: string
          url: string
        }
        Update: {
          caption?: string
          created_at?: string
          display_order?: number
          id?: string
          sport_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sport_images_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sports: {
        Row: {
          banner_color: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          rules: string
          slug: string
          updated_at: string
        }
        Insert: {
          banner_color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name: string
          rules?: string
          slug: string
          updated_at?: string
        }
        Update: {
          banner_color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          rules?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { _user_id: string }; Returns: boolean }
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
