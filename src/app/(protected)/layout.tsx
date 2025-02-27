import { SidebarProvider } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AppSidebar from './app-sidebar/page'

type Props = {
    children: React.ReactNode
}

const SidebarLayout = ({children}: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <main className="w-full m-4">
        <div className="flex items-center gap-4 border-sidebar-border bg-sidebar border shadow rounded-md p-4 px-6">
          {/* <SearchBar/> */}
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
        <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-6 mt-4"> {/* Added margin-top (mt-4) for spacing */}
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
