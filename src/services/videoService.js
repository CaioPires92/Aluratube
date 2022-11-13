import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://ygtrrochpmjzeslzkpcw.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndHJyb2NocG1qemVzbHprcGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODkwMDQsImV4cCI6MTk4Mzg2NTAwNH0.JukOeDyk3rUkoD4xZYxRiGdTWXBWfRLXgqxiC7naOfM'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from('video').select('*')
    }
  }
}
