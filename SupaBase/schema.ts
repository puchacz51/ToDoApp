export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          category: string
          completed_at: string | null
          created_at: string
          description: string
          id: string
          last_modified_at: string | null
          tittle: string
          userId: string
        }
        Insert: {
          category?: string
          completed_at?: string | null
          created_at?: string
          description: string
          id: string
          last_modified_at?: string | null
          tittle: string
          userId: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          last_modified_at?: string | null
          tittle?: string
          userId?: string
        }
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
