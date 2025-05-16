// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Spond Club</h1>
        
        <p className="mb-8 text-gray-600">
          Simplify club membership management and group activities with our platform.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/signup" 
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
          >
            Sign Up for Club Membership
          </Link>
          
          <Link 
            href="/about" 
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium transition-colors"
          >
            Learn More About Spond
          </Link>
        </div>
      </div>
      
      <div className="mt-12 max-w-2xl text-center">
        <h2 className="text-xl font-semibold mb-4">Upcoming Club Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-bold">Coding camp summer 2025</h3>
            <p className="text-gray-600">Registration opens: Dec 16, 2024</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-bold">Spring Developer Meetup</h3>
            <p className="text-gray-600">Registration open now</p>
          </div>
        </div>
      </div>
    </div>
  );
}