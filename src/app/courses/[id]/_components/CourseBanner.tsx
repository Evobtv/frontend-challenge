import Image from 'next/image'

import { Course } from '@/types/course'

interface CourseBannerProps {
  course: Course
}

export function CourseBanner({ course }: CourseBannerProps) {
  const mobileBanner =
    course.banner_mobile ||
    course.banner ||
    course.thumbnail ||
    '/placeholder-course.jpg'

  const desktopBanner =
    course.banner || course.thumbnail || '/placeholder-course.jpg'

  return (
    <div className="relative h-[8.75rem] w-full md:h-[18rem] lg:h-[33.75rem]">
      <Image
        src={mobileBanner}
        alt={course.title}
        fill
        className="object-cover md:hidden"
        priority
        fetchPriority="high"
      />

      <Image
        src={desktopBanner}
        alt={course.title}
        fill
        className="hidden object-cover md:block"
        priority
        fetchPriority="high"
      />
    </div>
  )
}
