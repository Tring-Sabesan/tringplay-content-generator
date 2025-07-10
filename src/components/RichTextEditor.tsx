import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from 'tiptap-extension-font-size';
import './RichEditor.css';
import LightMode from '../assets/ic_light-mode.svg';
import DarkMode from '../assets/ic_night_mode.svg';

const FONT_FAMILIES = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Monospace', value: 'monospace' },
];

const DEFAULT_FONT_FAMILY = 'Arial';
const DEFAULT_FONT_SIZE = '20px';
const DEFAULT_TEXT_COLOR = '#222222';
const DEFAULT_HIGHLIGHT_COLOR = '#ffff00';
const DEFAULT_TITLE = 'My Document';

const RichEditor = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      BulletList,
      ListItem,
      OrderedList,
      TextStyle,
      Color,
      Highlight,
      FontFamily,
      FontSize,
    ],
    content: `<h2>All great achievements require time.</h2><p>— Maya Angelou</p>`,
  });

  // Helpers for color pickers
  const getCurrentColor = () =>
    editor?.getAttributes('textStyle').color || DEFAULT_TEXT_COLOR;

  const getCurrentHighlight = () =>
    editor?.getAttributes('highlight').color || DEFAULT_HIGHLIGHT_COLOR;

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const setHeading = (level: 1 | 2) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  const setFontFamily = (family: string) => {
    editor?.chain().focus().setFontFamily(family).run();
  };

  const setFontSize = (size: string) => {
    editor?.chain().focus().setFontSize(size).run();
  };

  const setColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  const setHighlight = (color: string) => {
    editor?.chain().focus().toggleHighlight({ color }).run();
  };

  const handleLink = () => {
    let url = prompt('Enter URL');

    if (url) {
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }

      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  // Themed HTML export
  const downloadHTML = () => {
    const contentHTML = editor?.getHTML() || '';
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: ${theme === 'dark' ? '#1e1e1e' : '#ffffff'};
      color: ${theme === 'dark' ? '#f5f5f5' : '#000000'};
      padding: 20px;
    }
    h1, h2 { color: ${theme === 'dark' ? '#90caf9' : '#333'}; }
    a { color: #007acc; }
  </style>
</head>
<body>
  ${contentHTML}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';
    link.click();
  };

  if (!editor) return null;

  return (
    <div className={`editor-wrapper ${theme}`}>
      <div className='editor-container-wrapper'>
        <div className='toolbar'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Document Title'
            className='title-input'
            title='Document Title'
            style={{
              width: 160,
              fontWeight: 600,
              fontSize: 16,
              marginRight: 8,
            }}
          />
          <button
            className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
            onClick={() => setHeading(1)}
            title='Heading 1'>
            H1
          </button>
          <button
            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
            onClick={() => setHeading(2)}
            title='Heading 2'>
            H2
          </button>
          <select
            onChange={(e) => setFontFamily(e.target.value)}
            defaultValue={DEFAULT_FONT_FAMILY}
            title='Font Family'>
            {FONT_FAMILIES.map((f) => (
              <option value={f.value} key={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <input
            type='number'
            min={10}
            max={48}
            defaultValue={parseInt(DEFAULT_FONT_SIZE)}
            onChange={(e) => setFontSize(`${e.target.value}px`)}
            style={{ width: 50 }}
            title='Font Size'
          />
          <button
            className={editor.isActive('bold') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title='Bold'>
            <b>B</b>
          </button>
          <button
            className={editor.isActive('italic') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title='Italic'>
            <i>I</i>
          </button>
          <button
            className={editor.isActive('underline') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title='Underline'>
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'active' : ''}
            title='Bullet List'>
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'active' : ''}
            title='Numbered List'>
            1.
          </button>
          <div className='color-picker-wrapper'>
            <button className='icon-btn' title='Text Color'>
              🎨
              <input
                type='color'
                value={getCurrentColor()}
                onChange={(e) => setColor(e.target.value)}
                className='color-input-overlay'
              />
            </button>
          </div>

          <div className='color-picker-wrapper'>
            <button className='icon-btn' title='Highlight'>
              🖍
              <input
                type='color'
                value={getCurrentHighlight()}
                onChange={(e) => setHighlight(e.target.value)}
                className='color-input-overlay'
              />
            </button>
          </div>

          <button onClick={handleLink} title='Add/Edit Link'>
            <span role='img' aria-label='link' style={{ opacity: 0.5 }}>
              🔗
            </span>
          </button>
          <button onClick={toggleTheme} title='Toggle Theme'>
            <span role='img' aria-label='theme'>
              {theme === 'light' ? (
                <img src={DarkMode} />
              ) : (
                <img src={LightMode} />
              )}
            </span>
          </button>
          <button
            onClick={downloadHTML}
            title='Download HTML'
            className='save-btn'>
            <span role='img' aria-label='save'>
              💾
            </span>
          </button>
        </div>
        <div className='editor-container'>
          <div className='editor-inner'>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichEditor;
