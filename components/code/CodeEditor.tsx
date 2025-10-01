import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language = 'python',
  readOnly = false,
  onChange,
  height = '400px',
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={initialCode}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: 'on',
        }}
      />
    </div>
  );
};

export default CodeEditor;
