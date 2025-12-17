export const summaryData = {
  totalProjects: 15,
  activeProjects: 8,
  completedProjects: 5,
  delayedProjects: 2,
  totalManpower: 45,
  budgetUsed: 75, // percentage
  budgetRemaining: 25 // percentage
};

export const priorityProjects = [
  {
    id: 1,
    name: "Plant Expansion - Line A",
    dueDate: "2026-03-15",
    pic: "Syahugi",
    status: "On Track",
    progress: 75,
    actionPlan: "Finalize electrical installation"
  },
  {
    id: 2,
    name: "Equipment Upgrade - Press Machine",
    dueDate: "2026-02-28",
    pic: "Iqbal",
    status: "Delayed",
    progress: 45,
    actionPlan: "Waiting for parts delivery"
  },
  {
    id: 3,
    name: "Safety System Implementation",
    dueDate: "2024-04-10",
    pic: "Jonah",
    status: "At Risk",
    progress: 60,
    actionPlan: "Coordinate with safety team"
  },
  {
    id: 4,
    name: "Automation Project - Packaging",
    dueDate: "2024-03-30",
    pic: "Nurul",
    status: "On Track",
    progress: 85,
    actionPlan: "Test run scheduled"
  }
];

export const sCurveData = [
  { month: 'Jan', planned: 10, actual: 8 },
  { month: 'Feb', planned: 20, actual: 18 },
  { month: 'Mar', planned: 35, actual: 30 },
  { month: 'Apr', planned: 50, actual: 45 },
  { month: 'May', planned: 65, actual: 55 },
  { month: 'Jun', planned: 80, actual: 65 },
  { month: 'Jul', planned: 90, actual: 75 },
  { month: 'Aug', planned: 95, actual: 80 },
  { month: 'Sep', planned: 98, actual: 85 },
  { month: 'Oct', planned: 100, actual: 90 },
  { month: 'Nov', planned: 100, actual: 95 },
  { month: 'Dec', planned: 100, actual: 100 }
];

export const projects = [
  {
    id: 1,
    name: "Plant Expansion - Line A",
    description: "Expansion of production line A",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    budget: 500000,
    spent: 375000,
    progress: 75,
    status: "active",
    teamMembers: [
      { name: "Syahugi", role: "Project Manager" },
      { name: "Amuna", role: "Electrical Engineer" },
      { name: "Fandhika", role: "Mechanical Engineer" }
    ],
    milestones: [
      { name: "Design Complete", date: "2024-02-15", status: "completed" },
      { name: "Procurement", date: "2024-03-30", status: "in-progress" },
      { name: "Installation", date: "2024-05-15", status: "pending" }
    ]
  },
  {
    id: 2,
    name: "Equipment Upgrade - Press Machine",
    description: "Upgrade of hydraulic press machine",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    budget: 200000,
    spent: 90000,
    progress: 45,
    status: "delayed",
    teamMembers: [
      { name: "Dani", role: "Project Lead" },
      { name: "Mahmud", role: "Mechanical Specialist" }
    ],
    milestones: [
      { name: "Assessment", date: "2026-02-15", status: "completed" },
      { name: "Parts Order", date: "2026-03-10", status: "delayed" },
      { name: "Installation", date: "2026-04-20", status: "pending" }
    ]
  }
];

export const manPowerData = {
  departments: [
    { name: "Electrical", total: 12, allocated: 8, available: 4 },
    { name: "Mechanical", total: 15, allocated: 12, available: 3 },
    { name: "Civil", total: 8, allocated: 6, available: 2 },
    { name: "Instrumentation", total: 6, allocated: 4, available: 2 },
    { name: "Safety", total: 4, allocated: 2, available: 2 }
  ],
  allocation: [
    { project: "Plant Expansion", electrical: 3, mechanical: 4, civil: 2, instrumentation: 1, safety: 1 },
    { project: "Equipment Upgrade", electrical: 2, mechanical: 3, civil: 1, instrumentation: 1, safety: 0 },
    { project: "Maintenance", electrical: 1, mechanical: 2, civil: 0, instrumentation: 0, safety: 1 },
    { project: "New Installation", electrical: 2, mechanical: 3, civil: 3, instrumentation: 2, safety: 0 }
  ],
  overtime: [
    { month: "Jan", hours: 120 },
    { month: "Feb", hours: 180 },
    { month: "Mar", hours: 150 },
    { month: "Apr", hours: 200 },
    { month: "May", hours: 175 }
  ]
};