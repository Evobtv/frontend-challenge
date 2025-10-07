'use client'

import { useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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

const signupSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('Email inválido'),
    confirmEmail: z.email('Email inválido'),
    password: z.string().min(8, 'Deve ter pelo menos 8 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'A senha deve ser igual a criada acima.',
    path: ['confirmEmail'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'A senha deve ser igual a criada acima.',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

interface SignupFormProps {
  onSuccess: () => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        toast.success('Conta criada com sucesso!', {
          description: `${data.name}, você será redirecionado em instantes...`,
        })
        form.reset()
        onSuccess()
      } catch (error) {
        toast.error('Erro ao criar conta. Tente novamente.', {
          description: error instanceof Error ? error.message : undefined,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [onSuccess]
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Criar conta</h1>
        <p className="text-gray-600 md:hidden">
          Start turning your ideas into reality.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
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
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme Email</FormLabel>
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
                <FormLabel>Crie uma senha</FormLabel>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a sua senha</FormLabel>
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

          <Button
            type="submit"
            className="bg-evob-primary hover:bg-evob-hover h-10.5 w-full text-xs font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Iniciar curso'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              href="/entrar"
              className="text-evob-primary font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}
