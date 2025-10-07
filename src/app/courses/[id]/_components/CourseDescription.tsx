import { Course } from '@/types/course'

import { cn } from '@/lib/utils'

interface CourseDescriptionProps {
  course: Course
}

export function CourseDescription({ course }: CourseDescriptionProps) {
  const descriptionClasses =
    'text-base text-evob-dark lg:text-xl [&>p]:mb-2 [&>p]:leading-tight'

  if (course.long_description) {
    return (
      <div
        className={cn('prose', descriptionClasses)}
        dangerouslySetInnerHTML={{ __html: course.long_description }}
      />
    )
  }

  return (
    <p className={descriptionClasses}>
      {course.short_description || 'Sem descrição disponível.'}
    </p>
  )
}
