import { Box, Stack } from '@mui/material'

import { type FloorItem } from '@/common/interfaces/response'
import Avatar from '@/components/Avatar'
import UserCard from '@/components/UserCard'

import Footer from './Footer'

type props = {
  children: React.ReactElement
  item: FloorItem
  set_reply: (data: number) => void
}

const Floor = ({ children, item, set_reply }: props) => {
  return (
    <Box className="py-0">
      <Stack direction="row">
        <Box className="w-40 flex justify-center pt-6 bg-[#D2E2FD]">
          <UserCard item={item}>
            <div>
              <Avatar
                className="m-auto"
                alt="Remy Sharp"
                uid={item.author_id}
                sx={{ width: 48, height: 48 }}
                variant="rounded"
              />
              <div className="text-center text-blue-500">{item.author}</div>
              <Box>{item.sign}</Box>
            </div>
          </UserCard>

          {/* <Typography  */}
        </Box>
        <Box className="flex-1 mx-8 my-4">
          <Box>{children}</Box>
          <Footer floor={item.position} set_reply={set_reply} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Floor
