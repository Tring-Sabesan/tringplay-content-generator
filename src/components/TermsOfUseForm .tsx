// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// const TermsOfUseForm = () => {
//   const [title, setTitle] = useState(''); // Main document title
//   const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

//   const [sections, setSections] = useState([
//     { id: Date.now(), title: '', content: '' },
//   ]);
//   const [theme, setTheme] = useState('light');

//   // Add new section
//   const addSection = () => {
//     setSections([...sections, { id: Date.now(), title: '', content: '' }]);
//   };

//   // Delete a section
//   const removeSection = (id: any) => {
//     setSections(sections.filter((section) => section.id !== id));
//   };

//   // Update title/content
//   const updateSection = (id: any, field: any, value: any) => {
//     const updated = sections.map((section) =>
//       section.id === id ? { ...section, [field]: value } : section
//     );
//     setSections(updated);
//   };

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

//   const markdownToHtml = (md: any) => {
//     const div = document.createElement('div');
//     div.innerHTML = md
//       .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//       .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//       .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//       .replace(/\\(.?)\\*/gim, '<strong>$1</strong>')
//       //   .replace(/\(.?)\*/gim, '<em>$1</em>')
//       .replace(/\((.*?)\)\*/gim, '<em>$1</em>')
//       .replace(/\[(.?)\]\((.?)\)/gim, '<a href="$2" target="_blank">$1</a>')
//       .replace(/\n/gim, '<br />');
//     return div.innerHTML;
//   };

//   const downloadHTML = () => {
//     const fileName = prompt(`"Enter file name:", ${title || 'terms'}.html`);
//     if (!fileName) return;

//     const contentHTML = sections
//       .map(
//         (section) => `
//       <h2>${section.title}</h2>
//       ${markdownToHtml(section.content)}
//     `
//       )
//       .join('');

//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//         <title>${title}</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             background: ${theme === 'dark' ? '#1e1e1e' : '#ffffff'};
//             color: ${theme === 'dark' ? '#f5f5f5' : '#000000'};
//             padding: 20px;
//           }
//           h1, h2 { color: ${theme === 'dark' ? '#90caf9' : '#333'}; }
//           a { color: #007acc; }
//         </style>
//       </head>
//       <body>
//         <h1>${title}</h1>
//         ${contentHTML}
//       </body>
//       </html>
//     `;

//     const blob = new Blob([html], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
//     link.click();
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
//         color: theme === 'dark' ? '#fff' : '#000',
//         minHeight: '100vh',
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//       }}>
//       <div style={{ display: 'flex', gap: '20px' }}>
//         {/* Left Side: Form */}
//         <div style={{ flex: 1, marginRight: 20 }}>
//           <h2>📝 Create Your Terms of Use</h2>

//           {/* Title Input */}
//           <input
//             type='text'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder='Document Title'
//             style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
//           />

//           {sections.map((section) => (
//             <div
//               key={section.id}
//               style={{
//                 marginBottom: '20px',
//                 borderBottom: '1px solid #ccc',
//                 paddingBottom: '10px',
//               }}>
//               <input
//                 type='text'
//                 placeholder='Section Title'
//                 value={section.title}
//                 onChange={(e) =>
//                   updateSection(section.id, 'title', e.target.value)
//                 }
//                 style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//               />
//               <textarea
//                 placeholder='Section Content (Markdown supported)'
//                 value={section.content}
//                 onChange={(e) =>
//                   updateSection(section.id, 'content', e.target.value)
//                 }
//                 style={{ width: '100%', height: '100px', padding: '10px' }}
//               />
//               <button
//                 onClick={() => removeSection(section.id)}
//                 style={{ marginTop: '10px', color: 'red' }}>
//                 🗑 Delete Section
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={addSection}
//             style={{ marginTop: '10px', padding: '10px' }}>
//             ➕ Add New Section
//           </button>
//           <button>Add bullet points</button>
//           <button
//             onClick={downloadHTML}
//             style={{ marginTop: '20px', padding: '10px 20px' }}>
//             💾 Export to HTML
//           </button>
//           <button
//             onClick={toggleTheme}
//             style={{ marginTop: '20px', padding: '10px 20px' }}>
//             {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
//           </button>
//         </div>

//         {/* Right Side: Live Preview */}
//         <div
//           style={{
//             flex: 1,
//             backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
//             padding: '20px',
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//             overflowY: 'auto',
//             maxHeight: '80vh',
//           }}>
//           <h1>{title}</h1>
//           {sections.map((section) => (
//             <div key={section.id}>
//               <h2>{section.title}</h2>
//               <ReactMarkdown>{section.content}</ReactMarkdown>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsOfUseForm;

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const TermsOfUseForm = () => {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([
    { id: Date.now(), title: '', content: '' },
  ]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: '', content: '' }]);
  };

  const removeSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
    if (activeSectionId === id) setActiveSectionId(null);
  };

  const updateSection = (
    id: number,
    field: 'title' | 'content',
    value: string
  ) => {
    const updated = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updated);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const markdownToHtml = (md: string) => {
    const div = document.createElement('div');
    div.innerHTML = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n/gim, '<br />');
    return div.innerHTML;
  };

  const downloadHTML = () => {
    const fileName = prompt('Enter file name:', `${title || 'terms'}.html`);
    if (!fileName) return;

    const contentHTML = sections
      .map(
        (section) => `
      <h2>${section.title}</h2>
      ${markdownToHtml(section.content)}
    `
      )
      .join('');

    const html = `<!DOCTYPE html>
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
        <h1>${title}</h1>
        ${contentHTML}
      </body>
      </html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
    link.click();
  };

  const addBulletPoint = () => {
    if (activeSectionId === null) return;
    const section = sections.find((s) => s.id === activeSectionId);
    if (!section) return;

    const newContent =
      section.content.trim() === '' ? '- ' : section.content + '\n- ';
    updateSection(activeSectionId, 'content', newContent);
  };

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Side: Editor */}
        <div style={{ flex: 1, marginRight: 20 }}>
          <h2>📝 Create Your Terms of Use</h2>

          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Document Title'
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
          />

          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
              }}>
              <input
                type='text'
                placeholder='Section Title'
                value={section.title}
                onChange={(e) =>
                  updateSection(section.id, 'title', e.target.value)
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              />
              <textarea
                placeholder='Section Content (Markdown supported)'
                value={section.content}
                onFocus={() => setActiveSectionId(section.id)}
                onChange={(e) =>
                  updateSection(section.id, 'content', e.target.value)
                }
                style={{ width: '100%', height: '100px', padding: '10px' }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => removeSection(section.id)}
                  style={{ color: 'red' }}>
                  🗑 Delete Section
                </button>
                <button onClick={addBulletPoint}>➕ Add Bullet Point</button>
              </div>
            </div>
          ))}

          <button
            onClick={addSection}
            style={{ marginTop: '10px', padding: '10px' }}>
            ➕ Add New Section
          </button>
          <button
            onClick={downloadHTML}
            style={{ marginTop: '20px', padding: '10px 20px' }}>
            💾 Export to HTML
          </button>
          <button
            onClick={toggleTheme}
            style={{ marginTop: '20px', padding: '10px 20px' }}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Right Side: Preview */}
        <div
          style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}>
          <h1>{title}</h1>
          {sections.map((section) => (
            <div key={section.id}>
              <h2>{section.title}</h2>
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseForm;
