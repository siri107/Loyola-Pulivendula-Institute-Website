import { lazy } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import admissionContent from "../../content/Admissions.json";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Admissions = () => {
  const { admissionCriteria } = admissionContent;

  // Sort courses by intake in descending order
  const coursesData = admissionCriteria.coursesAvailable
    .map((course) => ({
      name: course.shortName,
      intake: course.intake
    }))
    .sort((a, b) => b.intake - a.intake);

  // Seat Distribution Pie Chart Data
  const seatData = [
    { name: "Minority Quota", value: 30 },
    { name: "General Quota", value: 70 }
  ];

  const COLORS = ["#3B82F6", "#F59E0B"];

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admissions</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seat Distribution */}
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-black text-center">Seat Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={seatData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {seatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <p className="text-lg text-black font-semibold">➡️ Minority Quota: 30%</p>
            <p className="text-lg text-black font-semibold">➡️ General Quota: 70%</p>
          </div>
        </div>

        {/* Courses Available - Bar Chart */}
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-black text-center">Courses Available</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#4B5563" tick={{ fontWeight: "bold" }} />
              <YAxis label={{ value: "Seat Count", angle: -90, position: "insideLeft", fontWeight: "bold" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="intake"  radius={[5, 5, 0, 0]} barSize={40}>
                {coursesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3B82F6" className="hover:fill-orange-500" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Eligibility and Documents Required */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-6 rounded-lg bg-[#F5F5DC]">
          <h2 className="text-2xl font-semibold text-black text-center">Eligibility Criteria</h2>
          <p className="text-lg text-black font-semibold">{admissionCriteria.eligibilityCriteria.entranceExam}</p>
          <ul className="space-y-2">
            {admissionCriteria.eligibilityCriteria.requirements.map((requirement, index) => (
              <li key={index} className="text-lg text-black font-semibold">{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-green-300">
          <h2 className="text-2xl font-semibold text-black text-center">Documents Required</h2>
          <ul className="space-y-2">
            {admissionCriteria.documentsRequired.map((document, index) => (
              <li key={index} className="text-lg text-black font-semibold">{document}</li>
            ))}
          </ul>
        </div>
      </section>

      <ScrollToTop />
    </Container>
  );
};

export default Admissions;
