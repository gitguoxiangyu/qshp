import { customRenderers } from './renderer'
import { VditorContext } from './types'

export const common = {
  cdn: '/third_party/vditor-patched-0.2',
}
export const commonEmojiPath = {
  emojiPath: `${common.cdn}/dist/images/emoji`,
}

type Mode = 'light' | 'dark'

const previewCommon = (mode: Mode) => ({
  theme: {
    current: mode,
    path: `${common.cdn}/dist/css/content-theme`,
  },
})

export const getPreviewThemeOptions = (mode: Mode): IPreview => ({
  ...previewCommon(mode),
})

export const getPreviewOptions = (
  mode: Mode,
  context: VditorContext
): IPreviewOptions => ({
  ...common,
  mode,
  ...previewCommon(mode),
  ...commonEmojiPath,
  renderers: customRenderers('Preview', context),
})
