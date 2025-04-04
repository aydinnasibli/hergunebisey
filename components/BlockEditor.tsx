'use client';

import { useState, useCallback } from 'react';
import { BlockContentProps } from '@portabletext/react';
import { BlockEditorProvider, useBlockEditor } from '@sanity/block-editor';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Link,
    Heading1,
    Heading2,
    Heading3,
    List,
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

interface BlockEditorProps {
    value: any[];
    onChange: (value: any[]) => void;
}

// Main component
export default function BlockEditor({ value, onChange }: BlockEditorProps) {
    // Create necessary configuration
    const schemaTypes = {
        block: {
            name: 'block',
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                name: 'href',
                                type: 'string',
                            }
                        ]
                    }
                ]
            }
        },
        image: {
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    };

    // Set up uploading function
    const uploadImage = useCallback(async (file: File) => {
        try {
            const asset = await client.assets.upload('image', file);
            return {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                }
            };
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    }, []);

    return (
        <BlockEditorProvider
            value={value}
            onChange={onChange}
            schemaTypes={schemaTypes}
        >
            <EditorToolbar uploadImage={uploadImage} />
            <EditorContent />
        </BlockEditorProvider>
    );
}

// Toolbar component
function EditorToolbar({ uploadImage }: { uploadImage: (file: File) => Promise<any> }) {
    const editor = useBlockEditor();
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const image = await uploadImage(file);
        if (image) {
            editor.insertValue([image]);
        }
    };

    const addLink = () => {
        if (!linkUrl) return;

        editor.focus();
        editor.addAnnotation({
            type: 'link',
            attrs: {
                href: linkUrl
            }
        });

        setLinkUrl('');
        setIsLinkDialogOpen(false);
    };

    const handleImageSizeChange = (size: 'small' | 'medium' | 'large') => {
        const selectedNodes = editor.selectedNodes();
        if (selectedNodes.length === 0) return;

        // Find the first image node
        const imageNode = selectedNodes.find(node => node.type === 'image');
        if (!imageNode) return;

        // Apply size as additional property
        const sizesMap = {
            small: { width: '25%' },
            medium: { width: '50%' },
            large: { width: '100%' }
        };

        editor.patchValue([{
            id: imageNode.id,
            set: {
                ...imageNode,
                customSize: sizesMap[size]
            }
        }]);
    };

    const handleImageAlignment = (alignment: 'left' | 'center' | 'right') => {
        const selectedNodes = editor.selectedNodes();
        if (selectedNodes.length === 0) return;

        // Find the first image node
        const imageNode = selectedNodes.find(node => node.type === 'image');
        if (!imageNode) return;

        // Apply alignment as additional property
        editor.patchValue([{
            id: imageNode.id,
            set: {
                ...imageNode,
                alignment
            }
        }]);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4 p-2 border border-gray-200 rounded bg-gray-50">
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.toggleMark('strong')}
            >
                <Bold className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.toggleMark('em')}
            >
                <Italic className="h-4 w-4" />
            </Button>

            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                        <Link className="h-4 w-4" />
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
                variant="ghost"
                onClick={() => editor.toggleBlock('h1')}
            >
                <Heading1 className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.toggleBlock('h2')}
            >
                <Heading2 className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.toggleBlock('h3')}
            >
                <Heading3 className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.toggleList('bullet')}
            >
                <List className="h-4 w-4" />
            </Button>

            <div className="h-6 w-px bg-gray-300 mx-2" />

            <Button size="sm" variant="ghost" component="label">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
                <ImageIcon className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleImageAlignment('left')}
            >
                <AlignLeft className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleImageAlignment('center')}
            >
                <AlignCenter className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleImageAlignment('right')}
            >
                <AlignRight className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleImageSizeChange('small')}
            >
                <Minimize2 className="h-4 w-4" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => handleImageSizeChange('large')}
            >
                <Maximize2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Editor content area
function EditorContent() {
    const editor = useBlockEditor();

    return (
        <div
            className="prose prose-sm max-w-none min-h-[300px]"
            ref={editor.contentRef}
        />
    );
}