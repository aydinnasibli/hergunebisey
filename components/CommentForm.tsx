"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { createComment } from '@/lib/sanity.queries';

interface CommentFormProps {
    blogId: string;
}

export default function CommentForm({ blogId }: CommentFormProps) {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isSignedIn, isLoaded, user } = useUser();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSignedIn) {
            alert('Yorum yapabilmek için giriş yapmalısınız.');
            return;
        }

        if (!comment.trim()) {
            alert('Yorum boş olamaz.');
            return;
        }

        try {
            setIsSubmitting(true);

            await createComment({
                name: user?.fullName || 'Misafir',
                email: user?.primaryEmailAddress?.emailAddress || '',
                clerkId: user?.id || '',
                comment: comment.trim(),
                blogId: blogId,
            });

            setComment('');
            router.refresh(); // Refresh the page to show the new comment

        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="mb-8 pb-8 border-b border-gray-200">
            <h4 className="text-lg font-medium mb-4">Yorum Yap</h4>

            {isSignedIn ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Düşüncelerinizi paylaşın..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-32"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Gönderiliyor...' : 'Yorum Yap'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="mb-4">Yorum yapabilmek için giriş yapmalısınız.</p>
                    <button
                        onClick={() => router.push('/sign-in')}
                        className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                        Giriş Yap
                    </button>
                </div>
            )}
        </div>
    );
}