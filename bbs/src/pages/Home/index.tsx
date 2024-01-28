import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Box, List, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import { getIndexData } from '@/apis/common'
import headerImg from '@/assets/header.jpg'
import Aside from '@/components/Aside'
import Banner from '@/components/Banner'
import CampusService from '@/components/Header/CampusService'
import HeaderCards from '@/components/Header/HeaderCards'
import OverviewInfo from '@/components/Header/OverviewInfo'
import { globalCache, setForumListCache, useAppState } from '@/states'

import { ForumGroup } from './ForumCover'

const Home = () => {
  const { state } = useAppState()
  const location = useLocation()

  const theme = useTheme()
  const {
    data: indexData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['index'],
    queryFn: () => {
      return getIndexData({
        globalStat: true,
        forumList: true,
        topList: ['newreply', 'newthread', 'digest', 'life', 'hotlist'],
      })
    },
  })
  useEffect(() => {
    if (indexData?.forum_list) {
      setForumListCache(indexData.forum_list)
    }
    if (indexData?.top_list) {
      globalCache.topList = indexData.top_list
    }
  }, [indexData])
  useEffect(() => {
    refetch()
  }, [state.user.uid, location.key])
  return (
    <>
      <Banner src={headerImg}>
        <Box className="text-white text-center">
          <Typography variant="h4">清水河畔</Typography>
          <Typography color={theme.palette.grey[400]}>
            说你想说，做你想做
          </Typography>
        </Box>
      </Banner>
      <OverviewInfo data={indexData?.global_stat} />
      {!indexData?.top_list && isLoading ? (
        <Skeleton height={480} />
      ) : (
        indexData?.top_list &&
        state.user.uid && <HeaderCards topLists={indexData?.top_list} />
      )}
      <CampusService />

      <Stack direction="row">
        <Box className="flex-1">
          {!indexData?.forum_list?.length ? (
            <>
              <Skeleton variant="rounded" height={40} />
              <Box className="flex-1" display="flex">
                {Array.from(new Array(2)).map((index) => (
                  <Box
                    key={index}
                    sx={{ flexGrow: 1, marginRight: 1.1, my: 2 }}
                  >
                    <Skeleton variant="rectangular" height={118} />
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <List>
              {indexData.forum_list.map((item) => (
                <ForumGroup data={item} key={item.name} />
              ))}
            </List>
          )}
        </Box>
        <Aside topList={indexData?.top_list} homepage />
      </Stack>
    </>
  )
}
export default Home
