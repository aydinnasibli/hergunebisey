'use client';

import { useState, useCallback } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Link as LinkIcon,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Maximize2,
    Minimize2
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define props
interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    onImageUpload?: (file: File) => Promise<string>; // Optional prop for custom image upload handling
}

export default function TipTapEditor({
    value,
    onChange,
    onImageUpload
}: RichTextEditorProps) {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [selectedImageSize, setSelectedImageSize] = useState<'small' | 'medium' | 'large'>('medium');

    // Initialize editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            // Get HTML content and pass it to the parent
            const html = editor.getHTML();
            onChange(html);
        },
    });

    // Handle image upload
    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !editor) return;

        const file = e.target.files[0];
        try {
            let imageUrl;

            // If a custom upload handler is provided, use it
            if (onImageUpload) {
                imageUrl = await onImageUpload(file);
            } else {
                // Fallback to using a local data URL
                imageUrl = await readFileAsDataURL(file);
            }

            // Insert the image first
            editor.chain().focus().setImage({
                src: imageUrl,
                alt: file.name,
            }).run();

            // Apply classes based on selected size
            setTimeout(() => {
                applyClassesToLastImage(selectedImageSize);
            }, 50);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    }, [editor, selectedImageSize, onImageUpload]);

    // Read file as data URL (for local preview without server upload)
    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Apply classes to the last inserted image
    const applyClassesToLastImage = (size: 'small' | 'medium' | 'large') => {
        if (!editor) return;

        const editorElement = document.querySelector('.ProseMirror');
        if (!editorElement) return;

        const images = editorElement.querySelectorAll('img');
        const lastImage = images[images.length - 1];

        if (lastImage) {
            // Remove existing size classes
            lastImage.classList.remove('w-1/4', 'w-1/2', 'w-full');

            // Add rounded class if not present
            lastImage.classList.add('rounded');

            // Add size class based on selection
            switch (size) {
                case 'small':
                    lastImage.classList.add('w-1/4');
                    break;
                case 'medium':
                    lastImage.classList.add('w-1/2');
                    break;
                case 'large':
                    lastImage.classList.add('w-full');
                    break;
            }
        }
    };

    // Handle adding a link
    const addLink = useCallback(() => {
        if (!linkUrl || !editor) return;

        // Update link
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: linkUrl })
            .run();

        // Reset and close dialog
        setLinkUrl('');
        setIsLinkDialogOpen(false);
    }, [editor, linkUrl]);

    // Handle alignment
    const setAlignment = useCallback((align: 'left' | 'center' | 'right') => {
        editor?.chain().focus().setTextAlign(align).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="rich-text-editor">
            <div className="flex flex-wrap gap-2 mb-4 p-2 border border-gray-200 rounded bg-gray-50">
                <Button
                    size="sm"
                    variant={editor.isActive('bold') ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive('italic') ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="sm"
                            variant={editor.isActive('link') ? "secondary" : "ghost"}
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Link</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                />
                            </div>
                            <Button onClick={addLink}>Add Link</Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 1 }) ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 2 }) ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 3 }) ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive('bulletList') ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive('orderedList') ? "secondary" : "ghost"}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <div className="h-6 w-px bg-gray-300 mx-2" />

                <label>
                    <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => document.getElementById('image-upload')?.click()}
                    >
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </label>

                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'left' }) ? "secondary" : "ghost"}
                    onClick={() => setAlignment('left')}
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'center' }) ? "secondary" : "ghost"}
                    onClick={() => setAlignment('center')}
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'right' }) ? "secondary" : "ghost"}
                    onClick={() => setAlignment('right')}
                >
                    <AlignRight className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={selectedImageSize === 'small' ? "secondary" : "ghost"}
                    onClick={() => setSelectedImageSize('small')}
                >
                    <Minimize2 className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant={selectedImageSize === 'large' ? "secondary" : "ghost"}
                    onClick={() => setSelectedImageSize('large')}
                >
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="prose prose-sm max-w-none min-h-[300px] border rounded-md p-4">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}