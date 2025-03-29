import Image from "next/image"

export default function Home() {
  return (
    <main>
      {/* 🚀 Full-Width Hero Section */}


      <section className="relative flex items-center justify-center h-[650px] bg-gray-200">
        <Image
          src="https://i.imghippo.com/files/NmX4787FXk.jpg" // Replace with actual image path
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute text-white text-xl z-10">Overlay Content</div>
      </section>






      {/* ✅ Normal Content Inside max-w-6xl */}
      <div className="max-w-6xl mx-auto px-8">
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
        <p className="mt-8 text-lg">This is the homepage content...</p>
      </div>
    </main>
  )
}
