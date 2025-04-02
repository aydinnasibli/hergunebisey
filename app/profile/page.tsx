"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [activeTab, setActiveTab] = useState<'profile'>('profile');
    const router = useRouter();

    // Use useEffect for client-side redirection
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Don't render the profile content until we're sure the user is signed in
    if (!isSignedIn) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-black text-white p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500">
                                <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                                <p className="text-gray-300">{user?.primaryEmailAddress?.emailAddress}</p>
                                <p className="text-sm mt-2">Üye olma tarihi: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Profil Bilgileri
                            </button>


                        </nav>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Profil Bilgileri</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-500 text-sm">Ad Soyad</p>
                                        <p className="font-medium">{user?.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">E-posta</p>
                                        <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Kullanıcı Adı</p>
                                        <p className="font-medium">{user?.username || 'Belirlenmemiş'}</p>
                                    </div>
                                </div>
                            </div>
                        )}




                    </div>
                </div>
            </div>
        </div>
    );
}







