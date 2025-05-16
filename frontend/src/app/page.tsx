import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 rounded-md py-1 px-3 text-sm font-medium">
              New season
            </span>
            <h1 className="text-4xl font-bold mt-2">
              Spond Club Membership
            </h1>
          </div>

          <p className="text-lg text-gray-600">
            Join our community and get access to exclusive benefits, activities, and events. 
            Simplify club membership management and group activities with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/signup" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Sign Up Now
            </Link>
            {/*<Link 
              href="/about" 
              className="inline-block bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Learn more
            </Link>*/}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-bold">Coding camp summer 2025</h3>
              <p className="mt-2 text-gray-600">
                Join our intensive summer coding program with hands-on projects and expert mentorship.
              </p>
              <p className="mt-3 text-sm font-semibold text-blue-600">
                Registration opens: May 16, 2025
              </p>
            </div>
            <div className="bg-gray-50 border-t rounded-b-lg p-3">
              <Link 
                href="/signup" 
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Register when available
              </Link>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4">
              <h3 className="text-lg font-bold">Spring Developer Meetup</h3>
              <p className="mt-2 text-gray-600">
                Network with fellow developers and learn about the latest technologies and trends.
              </p>
              <p className="mt-3 text-sm font-semibold text-green-600">
                Registration open now
              </p>
            </div>
            <div className="bg-gray-50 border-t rounded-b-lg p-3">
              <Link 
                href="/signup" 
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}