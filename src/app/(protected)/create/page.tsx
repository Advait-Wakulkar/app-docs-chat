'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/trpc/react' // Changed from @/trpc/server
import { toast } from 'sonner'

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken?: string
}

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>()

  const createProject = api.project.createProject.useMutation()

  const onSubmit = (data: FormInput) => {
    createProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success('Project created successfully')
          reset()
        },
        onError: () => {
          toast.error('Failed to create project')
        },
      }
    )
  }

  return (
    <div className="flex items-center gap-12 justify-center">
      <img src="/undraw.github.svg" className="h-56 w-auto" alt="GitHub illustration" />
      <div>
        <div>
          <h1 className="font-semibold text-2xl">Link your Github Repository</h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of the repository to link it to the app.
          </p>
        </div>
        <div className="h-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <Input
                {...register('repoUrl', { required: 'Repository URL is required' })}
                placeholder="Repository URL"
              />
              {errors.repoUrl && <p className="text-red-500 text-sm">{errors.repoUrl.message}</p>}
            </div>

            <div>
              <Input
                {...register('projectName', { required: 'Project Name is required' })}
                placeholder="Project Name"
              />
              {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
            </div>

            <div>
              <Input {...register('githubToken')} placeholder="Project Token" />
              {errors.githubToken && <p className="text-red-500 text-sm">{errors.githubToken.message}</p>}
            </div>

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage