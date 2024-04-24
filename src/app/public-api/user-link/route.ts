import { QUERIES, TABLES, createServerClient } from '@/utils/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url)
  const user = requestUrl.searchParams.get('user')

  const supabase = createServerClient()
  const fullData = await supabase
    .from(TABLES.USERS)
    .select(QUERIES.USERS)
    .eq('username', user)

  const users = fullData.data
  return NextResponse.json({
    users,
  })
}
