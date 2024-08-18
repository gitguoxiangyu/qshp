import { ExtCreditMap } from './base'

export const errRateLimited = 2
export const errForumRestrictedByCredits = 21
export const errForumRestrictedByPay = 22
export const errThreadRedirected = 301

export type ForumRestrictions = {
  forum_id: number
  ext_credits: ExtCreditMap
  ext_credits_delta?: ExtCreditMap
  prompt?: string
}
