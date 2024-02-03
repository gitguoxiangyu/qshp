import Vditor from 'vditor'

import { createRef, useEffect } from 'react'

import {
  Typography,
  darken,
  getContrastRatio,
  getLuminance,
  lighten,
} from '@mui/material'

import { PostFloor } from '@/common/interfaces/response'
import { getPreviewOptions } from '@/components/RichText/vditorConfig'
import { useAppState } from '@/states'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bbcode2html from '@/utils/bbcode/bbcode'

import './richtext.css'

const kAuthoredColor = 'authoredColor'
const kColorManipulated = 'colorManipulated'

export const UserHtmlRenderer = ({ html }: { html: string }) => {
  const { state } = useAppState()
  const contentRef = createRef<HTMLDivElement>()
  const findParentBackgroundColor = (
    el: HTMLElement,
    upTo: HTMLElement | null
  ) => {
    let cur: HTMLElement | null = el
    for (; cur && cur != upTo; cur = cur.parentElement) {
      if (cur.style.backgroundColor) {
        return getComputedStyle(cur).backgroundColor
      }
    }
  }
  useEffect(() => {
    if (contentRef.current) {
      ;[].forEach.call(
        contentRef.current.querySelectorAll('font, *[style]'),
        (el: HTMLElement) => {
          let authoredColor = el.dataset[kAuthoredColor]
          if (!authoredColor) {
            if (
              (el.tagName.toLowerCase() == 'font' &&
                el.getAttribute('color')) ||
              el.style.color
            ) {
              authoredColor = getComputedStyle(el).color
            }
          }
          const backColor = findParentBackgroundColor(el, contentRef.current)
          if (backColor) {
            if (!authoredColor) {
              el.style.color = 'rgba(0, 0, 0, 0.87)'
              el.dataset[kAuthoredColor] = ''
            }
            return
          }
          if (!authoredColor) {
            return
          }
          let manipulation = el.dataset[kColorManipulated]
          if (
            (manipulation == 'lighten' && state.theme == 'light') ||
            (manipulation == 'darken' && state.theme == 'dark')
          ) {
            el.style.color = authoredColor
            delete el.dataset[kColorManipulated]
            return
          }
          const luminance = getLuminance(authoredColor)
          const contrast = getContrastRatio(
            authoredColor,
            state.theme == 'light' ? '#ffffff' : '#313742'
          )
          if (contrast > 4) {
            return
          }
          let newColor = authoredColor
          if (state.theme == 'light' && luminance > 0.75) {
            newColor = darken(
              newColor,
              Math.pow(4, 0.6) * Math.pow(1 - luminance, 0.6)
            )
            manipulation = 'darken'
          } else if (state.theme == 'dark' && luminance < 0.25) {
            newColor = lighten(
              newColor,
              -Math.pow(4, 0.6) * Math.pow(luminance, 0.6) + 1
            )
            manipulation = 'lighten'
          }
          if (newColor != authoredColor) {
            el.style.color = newColor
            if (manipulation) {
              el.dataset[kColorManipulated] = manipulation
            }
            if (el.dataset[kAuthoredColor] == undefined) {
              el.dataset[kAuthoredColor] = authoredColor
            }
          }
        }
      )
    }
  }, [state.theme])
  return (
    <div
      ref={contentRef}
      className={`rich-text-content rich-text-content-legacy rich-text-theme-${state.theme}`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></div>
  )
}

const LegacyPostRenderer = ({ post }: { post: PostFloor }) => {
  return (
    <UserHtmlRenderer
      html={bbcode2html(post.message, {
        allowimgurl: true,
        bbcodeoff: post.format != 0,
        smileyoff: post.smileyoff,
      })}
    />
  )
}

const MarkdownPostRenderer = ({ message }: { message: string }) => {
  const { state } = useAppState()
  const el = createRef<HTMLDivElement>()
  useEffect(() => {
    el.current &&
      Vditor.preview(el.current, message, getPreviewOptions(state.theme))
  }, [message])
  return (
    <div
      className={`rich-text-content rich-text-content-markdown rich-text-theme-${state.theme}`}
    >
      <Typography color="text.primary" ref={el}></Typography>
    </div>
  )
}

export const PostRenderer = ({ post }: { post: PostFloor }) => {
  return post.format == 2 ? (
    <MarkdownPostRenderer message={post.message} />
  ) : (
    <LegacyPostRenderer post={post} />
  )
}

export const RichTextRenderer = ({
  message,
  format,
}: {
  message: string
  format: 'bbcode' | 'markdown'
}) =>
  format == 'bbcode' ? (
    <LegacyPostRenderer post={{ message, format: 0 } as PostFloor} />
  ) : (
    <MarkdownPostRenderer message={message} />
  )
