import { User } from '@/models'
import { QUERIES, TABLES } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)

    const userId = (await supabase.auth.getUser()).data.user?.id
    const userData = (
      await supabase.from(TABLES.USERS).select('*').eq('id', userId)
    ).data?.[0] as unknown as User

    if (!userData?.username) {
      return NextResponse.redirect(`${requestUrl.origin}/profile`)
    }
  }

  return NextResponse.redirect(requestUrl.origin)
}
