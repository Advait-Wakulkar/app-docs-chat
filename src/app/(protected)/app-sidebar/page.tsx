'use client'

import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  useSidebar
} from '@/components/ui/sidebar'
import { 
  BotIcon, 
  CreditCard, 
  LayoutDashboard, 
  Plus, 
  Presentation 
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useProject from '@/hooks/use-project'

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: BotIcon
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard
  }
]

const AppSidebar = () => {

  const pathname = usePathname()
  const {open} = useSidebar()
  const {projects, projectId, setProjectId} = useProject()

  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <div className='flex items-center gap-2'>
          <Image src={'/logo.png'} alt='Logo' height={40} width={40}></Image>
          {open && (
            <h1 className='text-xl font-bold text-primary/80'></h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Application Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        className={clsx(
                          { '!bg-primary !text-white': pathname === item.url },
                          'list-none flex items-center gap-2 px-2 py-1 hover:text-black'
                        )}
                      >
                        <item.icon className="hover:text-black" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {/* Make sure projects exists before trying to map over it */}
            {Array.isArray(projects) ? (
                projects.map((project, index) => (
                    <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                        <div onClick={() => setProjectId(project.id)}>
                        <div className={clsx(
                            'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                            { 'bg-primary text-white': project.id === projectId }
                        )}>
                            {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                        </div>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
                ) : (
                <p className="text-gray-500 px-2">No projects found</p>
                )}

            <div className='h-2'></div>
            <SidebarMenuItem>
              {open && (<Link href={'/create'}>                            
                <Button size={'sm'} className='w-fit'><Plus></Plus>Create Project</Button>
              </Link>)}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar