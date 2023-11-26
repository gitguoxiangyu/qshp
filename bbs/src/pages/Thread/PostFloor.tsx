import { Card } from '@mui/material'

import { FloorItem } from '@/common/interfaces/response'
import { chineseTime } from '@/utils/dayjs'

import Floor from './Floor'
import { ParsePost } from './ParserPost'

type props = {
  // children: React.ReactElement
  item: FloorItem
  set_reply: (data: number) => void
}

export function PostFloor({ item, set_reply }: props) {
  return (
    <Card className="mb-4 !px-0" key={item.position}>
      <section id={item.position.toString()}>
        <Floor item={item} set_reply={set_reply}>
          <>
            <strong>{item.subject}</strong>
            <div className="text-sm text-slate-300 flex justify-between">
              <div>{chineseTime(item.dateline * 1000)}</div>
              <div className="flex flex-row gap-3 justify-between">
                <div
                  className="hover:text-blue-500"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.href.split('#')[0] + '#' + item.position
                    )
                  }}
                >
                  分享
                </div>
                <div>#{item.position}</div>
              </div>
            </div>
            <ParsePost post={item} />
          </>
        </Floor>
      </section>
    </Card>
  )
}
