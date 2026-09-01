import PropTypes from 'prop-types';

const students = [
  { id: '2024001', name: 'Aisha Rahman', avatar: 'AR', gpa: 3.92, major: 'Computer Science', credits: 96, courses: [['React', 'blue'], ['Algorithms', 'violet']] },
  { id: '2024002', name: 'Nafis Ahmed', avatar: 'NA', gpa: 3.74, major: 'Software Engineering', credits: 84, courses: [['Node.js', 'green'], ['Databases', 'amber']] },
  { id: '2024003', name: 'Sadia Karim', avatar: 'SK', gpa: 3.86, major: 'Information Systems', credits: 78, courses: [['UI/UX', 'pink'], ['Networks', 'blue']] },
  { id: '2024004', name: 'Tanvir Hasan', avatar: 'TH', gpa: 3.65, major: 'Data Science', credits: 90, courses: [['Python', 'green'], ['Machine Learning', 'violet']] },
];

function StatBadge({ label, value }) { return <div className="stat"><span>{label}</span><strong>{value}</strong></div>; }
StatBadge.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired };

function CourseTag({ courseName, color }) { return <span className={`course ${color}`}>{courseName}</span>; }
CourseTag.propTypes = { courseName: PropTypes.string.isRequired, color: PropTypes.string.isRequired };

function DashboardHeader({ title, tagline, studentCount }) {
  return <header className="header"><nav><a className="brand" href="#top">Campus<span>Hub</span></a><div><a href="#students">Students</a><a href="#overview">Overview</a></div></nav><div className="hero"><div><p className="eyebrow">STUDENT PORTAL</p><h1>{title}</h1><p>{tagline}</p></div><StatBadge label="Active students" value={studentCount} /></div></header>;
}
DashboardHeader.propTypes = { title: PropTypes.string.isRequired, tagline: PropTypes.string.isRequired, studentCount: PropTypes.number.isRequired };

function StudentCard({ name, id, avatar, gpa, major, credits, courses }) {
  return <article className="card"><div className="cardTop"><div className="avatar">{avatar}</div><div><h2>{name}</h2><p>{major}</p><small>ID {id}</small></div></div><div className="stats"><StatBadge label="GPA" value={gpa.toFixed(2)} /><StatBadge label="Credits" value={credits} /></div><div className="courses">{courses.map(([course, color]) => <CourseTag key={course} courseName={course} color={color} />)}</div></article>;
}
StudentCard.propTypes = { name: PropTypes.string.isRequired, id: PropTypes.string.isRequired, avatar: PropTypes.string.isRequired, gpa: PropTypes.number.isRequired, major: PropTypes.string.isRequired, credits: PropTypes.number.isRequired, courses: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired };

export default function App() {
  return <><DashboardHeader title="Student Dashboard" tagline="A clear view of student progress and enrollment." studentCount={students.length} /><main id="students"><div className="sectionTitle"><div><p className="eyebrow">DIRECTORY</p><h2>Meet our students</h2></div><StatBadge label="Average GPA" value={(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)} /></div><section className="grid">{students.map(student => <StudentCard key={student.id} {...student} />)}</section></main><footer>React Lab 01 · Components, Props & Styling</footer></>;
}
