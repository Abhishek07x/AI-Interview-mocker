import React from 'react';

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-12 mt-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">1. Sign Up</h3>
              <p className="text-gray-600">Create an account using social or email/password authentication to get started.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">2. Take Mock Interviews</h3>
              <p className="text-gray-600">Engage in AI-driven mock interviews with questions tailored to your job role and industry.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">3. Receive Feedback</h3>
              <p className="text-gray-600">Get personalized feedback and insights on your performance to help you improve.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Benefits</h2>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Realistic Simulation</h3>
              <p className="text-gray-600">Experience interviews that closely mimic real-world scenarios, boosting your confidence and readiness.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">AI-Driven Insights</h3>
              <p className="text-gray-600">Leverage AI technology to get detailed analysis and feedback on your interview performance.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Convenient and Accessible</h3>
              <p className="text-gray-600">Access the platform anytime, anywhere, and prepare for your interviews at your own pace.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div>
      <HowItWorks />
      <Benefits />
    </div>
  );
};

export default App;