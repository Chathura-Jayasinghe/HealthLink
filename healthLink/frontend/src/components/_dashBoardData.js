export const dashboardAdminData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true,to:'/admin' },
    { name: "Add Doctors", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/admin/add-doctors' },
    { name: "Message", icon:  <i className='bx bxs-message-dots' ></i>, active: false,to:'/admin/messsages' },
    { name: "Analytics", icon:  <i className='bx bxs-doughnut-chart' ></i>, active: false,to:"/admin/analytics"},
]


export const dashboardDoctorData = [
    { name: "Dashboard", icon: <i className='bx bxs-dashboard' ></i>, active: true,to:'/doctor' },
    { name: "My Apointments", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/doctor/my-appointments' },
    { name: "Add a Report", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/doctor/add-report' },
    { name: "Scan MRI", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/doctor/mri' },
    // { name: "Scan MRI", icon: <i className='bx bxs-user-plus'></i>, active: false,to:'/admin/mri' },
    { name: "Analytics", icon:  <i className='bx bxs-doughnut-chart' ></i>, active: false,to:"/doctor/analytics"},
]