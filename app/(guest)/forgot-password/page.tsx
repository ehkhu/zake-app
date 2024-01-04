'use client'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import AuthCard from '@/ui/Auth/AuthCard'
import ApplicationLogo from '@/ui/Auth/ApplicationLogo'
import AuthSessionStatus from '@/ui/Auth/AuthSessionStatus'
import { Button } from '@/components/ui/button'

interface FormValues {
  email: string
}

const ForgotPasswordPage = () => {
  const [status, setStatus] = useState<string>('')

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('The email field is required.'),
  })

  const submitForm = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      const response = await forgotPassword(values)

      setStatus(response.data.status)
    } catch (error: Error | AxiosError | any) {
      setStatus('')
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      <AuthSessionStatus className="mb-4" status={status} />

      <Formik
        onSubmit={submitForm}
        validationSchema={ForgotPasswordSchema}
        initialValues={{ email: '' }}>
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="undefined block font-medium text-sm text-gray-700">
              Email
            </label>

            <Field
              id="email"
              name="email"
              type="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              // className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
              Email Password Reset Link
            </Button>
          </div>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default ForgotPasswordPage
