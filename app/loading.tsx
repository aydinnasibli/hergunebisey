// app/loading.tsx
export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-xl">Sayfa yükleniyor...</p>
            </div>
        </div>
    );
}