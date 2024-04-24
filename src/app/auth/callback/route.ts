import { TABLES } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createServerClient()

    await supabase.auth.exchangeCodeForSession(code)

    const userData = (await supabase.auth.getUser()).data.user

    await supabase
      .from(TABLES.USERS)
      .update({ description: request.url, website: requestUrl.origin })
      .eq('id', userData?.id)
  }

  return NextResponse.redirect(requestUrl.origin)
}
