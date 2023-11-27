import { ReactElement } from "react";

function Features(): ReactElement {
  return (
    <section className="bg-white pt-20 pb-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-orange-600">
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl font-bold">
            <h3 className="text-lg font-semibold mb-2">Task Organization</h3>
            <p className="text-sm text-gray-600">
              Easily organize your tasks into lists or categories for efficient
              management.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl font-bold">
            <h3 className="text-lg font-semibold mb-2">Due Date Reminders</h3>
            <p className="text-sm text-gray-600">
              Set due dates and receive timely reminders to stay on top of your tasks.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl font-bold">
            <h3 className="text-lg font-semibold mb-2">Collaborative Work</h3>
            <p className="text-sm text-gray-600">
              Collaborate with team members, assign tasks, and track progress together.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl font-bold">
            <h3 className="text-lg font-semibold mb-2">Priority Management</h3>
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
