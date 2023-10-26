
import { image, section, text, column, hero, spacer } from '@/lib/util/get-default-tags/tags'

export const getDefaultTags = (tagName: string) => {
  switch (tagName) {
    case 'mj-image': return image

    case 'mj-section': return section

    case 'mj-text': return text

    case 'mj-column': return column

    case 'mj-hero': return hero

    case 'mj-spacer': return spacer

    default:
      break;
  }

}
