'use client';

import { useEditor, EditorContent, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import { Bold as TiptapBold } from '@tiptap/extension-bold';

import React, { useEffect } from 'react';
import { FieldInputProps, FormikProps } from 'formik';

interface TiptapEditorProps {
    field: FieldInputProps<string>;
    form: FormikProps<any>;
}

const MenuBar = ({ editor }) => {

    if (!editor) {
        return null
    }

    return (
        <div className="control-group mb-2">
            <div className="button-group flex flex-wrap gap-2">
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    Bold
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCode().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    Code
                </button>
                <button onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetAllMarks().run() }}>
                    Clear marks
                </button>
                <button onClick={(e) => { e.preventDefault(); editor.chain().focus().clearNodes().run() }}>
                    Clear nodes
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().setParagraph().run() }}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run() }}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    H3
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 4 }).run() }}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    H4
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 5 }).run() }}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    H5
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 6 }).run() }}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    H6
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Bullet list
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    Ordered list
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run() }}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code block
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Blockquote
                </button>
                <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run() }}>
                    Horizontal rule
                </button>
                <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setHardBreak().run() }}>
                    Hard break
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    Undo
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run() }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    Redo
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); editor.chain().focus().setColor('#958DF1').run() }}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                >
                    Purple
                </button>
            </div>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]


const TiptapEditor: React.FC<TiptapEditorProps> = ({ field, form }) => {
    const editor = useEditor({
        extensions,
        content: field.value,
        onUpdate: ({ editor }) => {
            form.setFieldValue(field.name, editor.getHTML());
        },
    });

    // Sync external changes
    useEffect(() => {
        if (editor && editor.getHTML() !== field.value) {
            editor.commands.setContent(field.value);
        }
    }, [field.value, editor]);

    return (
        <div className="shadow-md p-2 rounded min-h-[150px]">
            {<MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
