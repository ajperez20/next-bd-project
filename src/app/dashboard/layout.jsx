import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen">
            <SideBar />
            <div className="ml-64">
                <NavBar />
                <main className="p-8 pt-24 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}