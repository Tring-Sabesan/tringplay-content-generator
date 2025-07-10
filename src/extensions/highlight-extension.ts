import { Mark } from '@tiptap/core';
import { Extension } from '@tiptap/core';

export const CustomHighlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
        getAttrs: (el) => {
          if (typeof el === 'string') return {};
          const style = (el as HTMLElement).getAttribute('style');
          const colorMatch = style?.match(
            /background-color:\s*(#[0-9a-fA-F]{3,6})/
          );
          return colorMatch ? { color: colorMatch[1] } : {};
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { color, ...rest } = HTMLAttributes;
    return [
      'mark',
      {
        ...rest,
        style: color ? `background-color: ${color}` : '',
      },
      0,
    ];
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (el) => el.style.backgroundColor || null,
        renderHTML: (attrs) => {
          if (!attrs.color) return {};
          return { style: `background-color: ${attrs.color}` };
        },
      },
    };
  },
});

export const ClearHighlightOnArrow = Extension.create({
  name: 'clearHighlightOnArrow',

  addKeyboardShortcuts() {
    return {
      ArrowRight: () => {
        const { state, commands } = this.editor;
        const { from, empty } = state.selection;

        if (empty) {
          const marks = state.doc.resolve(from).marks();
          const hasHighlight = marks.some(
            (mark) => mark.type.name === 'highlight'
          );

          if (hasHighlight) {
            commands.unsetMark('highlight');
          }
        }

        return false;
      },
    };
  },
});
