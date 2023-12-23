import { Card, CardContent } from "@/components/ui/card";
import { ReactElement } from "react";

interface Feature {
  title: string;
  description: string;
}

function Features(): ReactElement {
  const features: Feature[] = [
    {
      title: "Task Organization",
      description:
        "Easily organize your tasks into lists or categories for efficient management.",
    },
    {
      title: "Due Date Reminders",
      description:
        "Set due dates and receive timely reminders to stay on top of your tasks.",
    },
    {
      title: "Collaborative Work",
      description:
        "Collaborate with team members, assign tasks, and track progress together.",
    },
    {
      title: "Priority Management",
      description: "Mark tasks with priorities to focus on what is most important.",
    },
  ];

  return (
    <section className="bg-white pb-20 pt-20">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-orange-600">
          Our Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(
            (feature: Feature, index: number): ReactElement => (
              <Card
                key={index}
                className="rounded-lg bg-gray-200 p-6 font-bold"
              >
                <CardContent>
                  <div>
                    <p className="mb-2 text-lg font-semibold text-gray-700">
                      {feature.title}
                    </p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Features;
