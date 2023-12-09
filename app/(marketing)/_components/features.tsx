import { ReactElement } from "react";

function Features(): ReactElement {
  return (
    <section className="bg-white pb-20 pt-20">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-orange-600">
          Our Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-200 p-6 font-bold shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Task Organization
            </h3>
            <p className="text-sm text-gray-600">
              Easily organize your tasks into lists or categories for efficient
              management.
            </p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 font-bold shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Due Date Reminders
            </h3>
            <p className="text-sm text-gray-600">
              Set due dates and receive timely reminders to stay on top of your tasks.
            </p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 font-bold shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Collaborative Work
            </h3>
            <p className="text-sm text-gray-600">
              Collaborate with team members, assign tasks, and track progress together.
            </p>
          </div>
          <div className="rounded-lg bg-gray-200 p-6 font-bold shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Priority Management
            </h3>
            <p className="text-sm text-gray-600">
              Mark tasks with priorities to focus on what is most important.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
