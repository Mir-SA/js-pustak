import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
// import codeShift from "jscodeshift";
import Hightlighter from "monaco-jsx-highlighter";
import "./code-editor.css";
import "./syntax.css";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();
    // Takes a callback as first arg and editor instance as second arg
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        const babelParse = (code: any) =>
            parse(code, { sourceType: "module", plugins: ["jsx"] });
        const highlighter = new Hightlighter(
            // @ts-ignore
            window.monaco,
            babelParse,
            traverse,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent(
            100,
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const formatOnClick = () => {
        // get value from editor
        const unformatted = editorRef.current.getModel().getValue();
        // format that value

        const formatted = prettier
            .format(unformatted, {
                parser: "babel",
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, "");
        // set the formatted value in editor

        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <input
                className="button button-format is-primary is-small"
                type="button"
                value="Format"
                onClick={formatOnClick}
            />
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                theme="dark"
                language="javascript"
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                height="100%"
            />
        </div>
    );
};

export default CodeEditor;
