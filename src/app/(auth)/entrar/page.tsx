'use client'

import { useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useBrandData } from '@/hooks/useBrand'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: brandData } = useBrandData()
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log('Login data:', data)
        router.push('/')
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col lg:w-1/2">
        <header className="px-6 py-6 lg:px-16 lg:py-8">
          <Link href="/" className="flex items-center gap-2">
            {brandData?.logo ? (
              <Image
                src={brandData.logo}
                alt={brandData.name || 'EVOB'}
                width={24}
                height={24}
                className="size-6"
              />
            ) : (
              <div className="bg-evob-primary flex size-6 items-center justify-center rounded">
                <span className="text-xs font-bold text-white">E</span>
              </div>
            )}
            <span className="text-lg font-bold">
              {brandData?.name || 'EVOB'}
            </span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16 lg:px-16">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Entrar</h1>
              <p className="text-gray-600">
                Acesse sua conta para continuar aprendendo.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type="email"
                          placeholder="Digite aqui"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type="password"
                          placeholder="Digite aqui"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between text-sm">
                  <Link
                    href="/recuperar-senha"
                    className="text-evob-primary font-medium hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="bg-evob-primary hover:bg-evob-hover h-10.5 w-full text-xs font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link
                    href="/criar-conta"
                    className="text-evob-primary hover:underline"
                  >
                    Criar conta
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </main>

        <footer className="flex items-center justify-between px-6 py-6 text-sm text-gray-600 lg:px-16">
          <span>© EVOB 2025</span>
          <a
            href="mailto:help@evob.com"
            className="flex items-center gap-2 hover:text-gray-900"
          >
            <Mail size={16} />
            help@evob.com
          </a>
        </footer>
      </div>

      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/signup-banner.png"
          alt="Signup banner"
          fill
          priority
          className="object-cover"
          sizes="50vw"
          quality={100}
        />
        <div className="absolute right-0 bottom-0 left-0">
          <Image
            src="/images/signup-banner-footer.png"
            alt="Signup banner footer"
            width={800}
            height={200}
            className="h-auto w-full"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}
